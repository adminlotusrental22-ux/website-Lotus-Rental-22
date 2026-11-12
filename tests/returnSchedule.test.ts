import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateScheduledBookingTotals, buildBookingWhatsAppUrl, calculateRentalPeriod, isPickupTimeValid } from '../src/lib/booking';

const quote = (returnTime:string, returnDate='2026-11-14') => calculateScheduledBookingTotals(['honda-beat'],'pickup','2026-11-12','15:00',returnDate,returnTime);

test('24-hour rentals: early returns keep a one-day minimum, whole days have no overtime',()=>{
  assert.equal(quote('18:00','2026-11-12').total,100000);
  assert.equal(quote('15:00','2026-11-13').total,100000);
  assert.equal(quote('15:00').total,200000);
  assert.equal(quote('14:00').total,200000);
});

test('four-hour boundary: hourly charges through exactly four hours, full day after four hours',()=>{
  assert.equal(quote('15:01').overtime,15000);
  assert.equal(quote('16:00').total,215000);
  assert.equal(quote('19:00').total,260000);
  const extraDay=quote('19:01');
  assert.equal(extraDay.total,300000);
  assert.equal(extraDay.billedDays,3);
  assert.equal(extraDay.overtime,0);
  assert.equal(extraDay.extraDay,true);
});

test('mixed fleet: every scooter pays overtime, or its own full-day price, never both',()=>{
  const hourly=calculateScheduledBookingTotals(['honda-beat','honda-pcx-155'],'hotel','2026-11-12','08:00','2026-11-13','12:00');
  assert.equal(hourly.subtotal,250000);
  assert.equal(hourly.overtime,120000);
  assert.equal(hourly.delivery,40000);
  assert.equal(hourly.total,410000);
  const daily=calculateScheduledBookingTotals(['honda-beat','honda-pcx-155'],'hotel','2026-11-12','08:00','2026-11-13','12:01');
  assert.equal(daily.total,540000);
  assert.equal(daily.overtime,0);
});

test('calendar boundaries and invalid dates cannot produce incorrect rental quotes',()=>{
  assert.equal(calculateRentalPeriod('2026-12-31','18:00','2027-01-01','20:00').overtimeHours,2);
  assert.equal(calculateRentalPeriod('2028-02-28','08:00','2028-03-01','08:00').billedDays,2);
  for(const [date,time,endDate,endTime] of [
    ['2026-11-12','15:00','2026-11-12','15:00'],
    ['2026-11-12','15:00','2026-11-12','14:59'],
    ['2026-02-30','08:00','2026-03-02','08:00'],
    ['2026-11-12','25:00','2026-11-14','08:00'],
    ['','08:00','2026-11-14','08:00'],
  ]) assert.throws(()=>calculateRentalPeriod(date,time,endDate,endTime));
  assert.equal(isPickupTimeValid('2026-11-13','19:01',0),false);
});

const order={units:['honda-beat'],date:'2026-11-12',time:'15:00',days:2,returnDate:'2026-11-14',returnTime:'19:00',location:'pickup',details:'',name:'Agus',returnLocation:'garage'};
test('WhatsApp carries the adjusted return time, hourly fee and matching estimate',()=>{
  const message=new URL(buildBookingWhatsAppUrl(order,'en')).searchParams.get('text')!;
  assert.match(message,/Return: Sat, 14 Nov 2026, 19:00 WITA/);
  assert.match(message,/Overtime \(1 × 4 hour\(s\)\): Rp 60.000/);
  assert.match(message,/ESTIMATED TOTAL: Rp 260.000/);
  const daily=new URL(buildBookingWhatsAppUrl({...order,returnTime:'19:01'},'en')).searchParams.get('text')!;
  assert.match(daily,/ESTIMATED TOTAL: Rp 300.000/);
  assert.match(daily,/one extra rental day included/);
  assert.doesNotMatch(daily,/• Overtime/);
});

test('after-hours collection is never silently accepted as a normal return',()=>{
  assert.throws(()=>buildBookingWhatsAppUrl({...order,returnTime:'20:00',returnLocation:''}));
  assert.throws(()=>buildBookingWhatsAppUrl({...order,returnTime:'21:01'}));
  assert.throws(()=>buildBookingWhatsAppUrl({...order,returnTime:'07:59'}));
  assert.throws(()=>buildBookingWhatsAppUrl({...order,returnTime:'20:00',hotelHandover:true,returnLocation:''}));
  const garage=new URL(buildBookingWhatsAppUrl({...order,returnTime:'21:00'},'en')).searchParams.get('text')!;
  assert.match(garage,/garage return by 21:00 requires prior confirmation/);
  const hotel=new URL(buildBookingWhatsAppUrl({...order,returnTime:'20:00',hotelHandover:true,returnLocation:'Hotel A'},'en')).searchParams.get('text')!;
  assert.match(hotel,/Hotel handover requested, not approved/);
  assert.match(hotel,/Hotel A/);
  assert.match(hotel,/key-handover photos/);
  assert.match(hotel,/one extra day per scooter/);
});
