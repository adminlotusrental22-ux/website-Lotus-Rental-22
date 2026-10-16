import test from 'node:test';
import assert from 'node:assert/strict';
import { SCOOTER_FLEET } from '../src/data/businessData';
import { resolveScooterId, getBookingSchedule, nextDay, isPickupTimeValid, calculateBookingTotals, buildBookingWhatsAppUrl } from '../src/lib/booking';

test('header click event cannot become a scooter selection', () => {
  assert.equal(resolveScooterId({ type: 'click', currentTarget: {} }), null);
  assert.equal(resolveScooterId(undefined), null);
  assert.equal(resolveScooterId('not-a-scooter'), null);
  assert.equal(resolveScooterId('yamaha-nmax-155'), 'yamaha-nmax-155');
});
const expected = {
  'honda-beat': 100000, 'honda-scoopy': 100000, 'honda-vario-125': 130000,
  'honda-vario-160': 140000, 'honda-stylo-160': 140000, 'yamaha-aerox': 140000,
  'yamaha-nmax-155': 150000, 'honda-pcx-155': 150000,
};
for (const [id, rate] of Object.entries(expected)) {
  test(id + ': current daily price and three-day delivery total', () => {
    assert.equal(SCOOTER_FLEET.find(s => s.id === id)?.dailyRateIdr, rate);
    assert.deepEqual(calculateBookingTotals([id], 3, 'airport'), {
      subtotal: rate * 3, delivery: 20000, total: rate * 3 + 20000,
    });
  });
}
test('multiple scooters, seven days, hotel vs self pickup', () => {
  assert.deepEqual(calculateBookingTotals(['honda-vario-125','yamaha-nmax-155'],7,'hotel'),{subtotal:1960000,delivery:40000,total:2000000});
  assert.equal(calculateBookingTotals(['honda-vario-125','yamaha-nmax-155'],7,'pickup').total,1960000);
});
test('invalid rental input cannot produce a misleading total', () => {
  assert.throws(()=>calculateBookingTotals(['bad'],3,'airport'));
  assert.throws(()=>calculateBookingTotals([],3,'airport'));
  assert.throws(()=>calculateBookingTotals(['honda-beat'],0,'airport'));
});
test('WITA schedule has one hour lead time and rolls after closing', () => {
  assert.deepEqual(getBookingSchedule(new Date('2026-10-16T06:00:00+08:00')),{date:'2026-10-16',earliestHour:8,minDate:'2026-10-16',time:'08:00'});
  assert.equal(getBookingSchedule(new Date('2026-10-16T18:45:00+08:00')).time,'20:00');
  assert.equal(getBookingSchedule(new Date('2026-10-16T19:45:00+08:00')).minDate,'2026-10-17');
  assert.equal(getBookingSchedule(new Date('2026-10-16T19:45:00+08:00')).time,'08:00');
  assert.equal(getBookingSchedule(new Date('2026-12-31T23:45:00+08:00')).minDate,'2027-01-01');
  assert.equal(getBookingSchedule(new Date('2026-10-16T11:00:30+08:00')).time,'13:00');
});
test('return dates cross months, years and leap day correctly', () => {
  assert.equal(nextDay('2026-12-31',3),'2027-01-03');
  assert.equal(nextDay('2028-02-28',2),'2028-03-01');
});
test('past, malformed, closed-hour and too-soon pickup times fail', () => {
  const now=new Date('2026-10-16T10:30:00+08:00').getTime();
  assert.equal(isPickupTimeValid('2026-10-16','11:00',now),false);
  assert.equal(isPickupTimeValid('2026-10-16','12:00',now),true);
  assert.equal(isPickupTimeValid('2026-10-15','12:00',now),false);
  assert.equal(isPickupTimeValid('2026-10-17','21:00',now),false);
  assert.equal(isPickupTimeValid('','',now),false);
});
test('WhatsApp draft contains the correct order, totals and return location', () => {
  const url = new URL(buildBookingWhatsAppUrl({
    units:['honda-vario-125','honda-pcx-155'], date:'2026-10-31', time:'09:00',
    days:3, location:'hotel', details:'Hotel & Villa + lobby', name:'Test guest', returnLocation:'Komodo Airport',
  }));
  assert.equal(url.hostname,'wa.me');
  assert.equal(url.pathname,'/6282226392207');
  const message=url.searchParams.get('text')!;
  for (const required of ['Honda Vario 125','Honda PCX','Return: 2026-11-03, 09:00 WITA',
    'Hotel & Villa + lobby','Return location: Komodo Airport','Rental: Rp 840.000',
    'Delivery: Rp 40.000','Estimate: Rp 880.000','Cash or QRIS']) assert.ok(message.includes(required),required);
  assert.ok(!message.includes('undefined'));
});
test('self-pickup draft has no delivery fee and defaults return location', () => {
  const message=new URL(buildBookingWhatsAppUrl({
    units:['honda-beat'],date:'2026-10-17',time:'08:00',days:1,location:'pickup',details:'',name:'',returnLocation:'',
  })).searchParams.get('text')!;
  assert.ok(message.includes('Delivery: Rp 0'));
  assert.ok(message.includes('Estimate: Rp 100.000'));
  assert.ok(message.includes('Return location: Same as pickup / delivery'));
});

