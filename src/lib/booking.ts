import { formatBookingMessage } from './bookingMessage';
import { getLanguage, Language } from '../i18n/language';
import { BUSINESS_INFO, SCOOTER_FLEET } from '../data/businessData';

export function resolveScooterId(value: unknown): string | null {
  return typeof value === 'string' && SCOOTER_FLEET.some(s => s.id === value) ? value : null;
}
export function nextDay(date: string, days: number): string {
  const d = new Date(date + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}
export function getBookingSchedule(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Makassar', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
  }).formatToParts(now);
  const part = (key: string) => parts.find(p => p.type === key)?.value || '';
  const date = `${part('year')}-${part('month')}-${part('day')}`;
  const hour = Number(part('hour'));
  const earliestHour = Math.max(8, hour + (Number(part('minute')) || Number(part('second')) ? 2 : 1));
  return {
    date, earliestHour,
    minDate: earliestHour > 19 ? nextDay(date, 1) : date,
    time: String(earliestHour > 19 ? 8 : earliestHour).padStart(2, '0') + ':00',
  };
}
export function isPickupTimeValid(date: string, time: string, now = Date.now()) {
  try { return time >= '08:00' && time <= '19:00' && witaTimestamp(date,time) >= now + 3600000; }
  catch { return false; }
}
export function calculateBookingTotals(ids: string[], days: number, location: string) {
  if (!ids.length || !Number.isInteger(days) || days < 1) throw new Error('Invalid rental selection');
  const subtotal = ids.reduce((sum, id) => {
    const scooter = SCOOTER_FLEET.find(s => s.id === id);
    if (!scooter) throw new Error('Unknown scooter');
    return sum + scooter.dailyRateIdr * days;
  }, 0);
  const delivery = location === 'pickup' ? 0 : ids.length * 20000;
  return { subtotal, delivery, total: subtotal + delivery };
}

function witaTimestamp(date: string, time: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) throw new Error('Choose valid pickup and return dates and times.');
  const day = new Date(date + 'T00:00:00Z');
  if (!Number.isFinite(day.getTime()) || day.toISOString().slice(0, 10) !== date) throw new Error('Choose valid pickup and return dates and times.');
  return new Date(`${date}T${time}:00+08:00`).getTime();
}

export function calculateRentalPeriod(date: string, time: string, returnDate: string, returnTime: string) {
  const minutes = (witaTimestamp(returnDate, returnTime) - witaTimestamp(date, time)) / 60000;
  if (minutes <= 0) throw new Error('Return must be after pickup.');
  const fullDays = Math.floor(minutes / 1440);
  const extraMinutes = fullDays > 0 ? minutes % 1440 : 0;
  const baseDays = Math.max(1, fullDays);
  const extraDay = extraMinutes > 240;
  return { minutes, baseDays, extraMinutes, extraDay, billedDays: baseDays + Number(extraDay), overtimeHours: extraDay ? 0 : Math.ceil(extraMinutes / 60) };
}

export function calculateScheduledBookingTotals(ids: string[], location: string, date: string, time: string, returnDate: string, returnTime: string) {
  const period = calculateRentalPeriod(date, time, returnDate, returnTime);
  const { subtotal, delivery } = calculateBookingTotals(ids, period.billedDays, location);
  const overtime = period.overtimeHours * 15000 * ids.length;
  return { ...period, subtotal, overtime, delivery, total: subtotal + overtime + delivery };
}

export function isReturnAfterHours(time: string) { return time > '19:00'; }
export function isReturnTimeValid(time: string) { return /^([01]\d|2[0-3]):[0-5]\d$/.test(time) && time >= '08:00' && time <= '21:00'; }

export function buildBookingWhatsAppUrl(order: {
  units: string[]; date: string; time: string; days: number; location: string;
  details: string; name: string; returnLocation: string; returnDate?: string; returnTime?: string; hotelHandover?: boolean;
}, language: Language = getLanguage()) {
  const { units, date, time, days, location, details, name, returnLocation } = order;
  const returnDate = order.returnDate || nextDay(date, days);
  const returnTime = order.returnTime || time;
  if (!isReturnTimeValid(returnTime)) throw new Error('Returns are available from 08:00 to 21:00 WITA.');
  if (isReturnAfterHours(returnTime) && returnLocation !== 'garage' && !order.hotelHandover) throw new Error('After 19:00, choose garage return or request a hotel handover.');
  const totals = calculateScheduledBookingTotals(units, location, date, time, returnDate, returnTime);
  if (returnLocation.trim() && /^(ya|yes|iya|no|tidak|ok|okay)$/i.test(returnLocation.trim())) {
    throw new Error('Please enter a return location, not a yes/no answer.');
  }
  if (order.hotelHandover && !returnLocation.trim()) throw new Error('Please enter the hotel name or full return address.');
  const message = formatBookingMessage({ ...order, returnDate, returnTime, days: totals.billedDays, ...totals }, language);
  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
