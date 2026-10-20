import { getLanguage, translateMessage } from '../i18n/language';
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
  const hour = Number(time.slice(0, 2));
  const timestamp = new Date(date + 'T' + time + ':00+08:00').getTime();
  return hour >= 8 && hour <= 19 && Number.isFinite(timestamp) && timestamp >= now + 3600000;
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
export function buildBookingWhatsAppUrl(order: {
  units: string[]; date: string; time: string; days: number; location: string;
  details: string; name: string; returnLocation: string;
}) {
  const { units, date, time, days, location, details, name, returnLocation } = order;
  const { subtotal, delivery, total } = calculateBookingTotals(units, days, location);
  const money = (value: number) => 'Rp ' + value.toLocaleString('id-ID');
  const pickup = location === 'airport' ? 'Komodo Airport' : location === 'hotel' ? 'Hotel / villa' : 'Lotus Rental 22 garage, Wae Mata';
  const message = [
    "Hi Lotus Rental 22! I'd like to check availability.", '',
    ...(name.trim() ? ['Name: ' + name.trim()] : []),
    `Pickup: ${date}, ${time} WITA`,
    `Return: ${nextDay(date, days)}, ${time} WITA`,
    `Duration: ${days} day(s)`, '',
    ...units.map((id, i) => `${i + 1}. ${SCOOTER_FLEET.find(s => s.id === id)!.name}`), '',
    'Pickup / delivery: ' + pickup,
    ...(details.trim() ? ['Location details: ' + details.trim()] : []),
    'Return location: ' + (returnLocation.trim() || 'Same as pickup / delivery'), '',
    'Rental: ' + money(subtotal), 'Delivery: ' + money(delivery), 'Estimate: ' + money(total), '',
    'Payment at handover: Cash or QRIS. No security deposit. My passport stays with me.', '',
    'Please confirm availability, exact model and final total. Thank you!',
  ].join('\n');
  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(translateMessage(message,getLanguage()))}`;
}


