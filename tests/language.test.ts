import test from 'node:test';
import assert from 'node:assert/strict';
import { translate, translateMessage } from '../src/i18n/language';
import { FAQ_ITEMS, SCOOTER_FLEET, BUSINESS_INFO, WHATSAPP_BOOKING_MESSAGE } from '../src/data/businessData';
for (const lang of ['id','zh'] as const) {
 test(`${lang}: all FAQ and scooter descriptions have translations`,()=>{
  for(const text of [...FAQ_ITEMS.flatMap(f=>[f.question,f.answer]),...SCOOTER_FLEET.flatMap(s=>[s.shortDesc,s.idealFor]),BUSINESS_INFO.verificationNote])assert.notEqual(translate(text,lang),text,text);
 });
 test(`${lang}: direct WhatsApp message is localized and keeps WITA`,()=>{
  const message=translateMessage(WHATSAPP_BOOKING_MESSAGE,lang);
  assert.ok(!message.includes("I'd like"));assert.ok(message.includes('WITA'));assert.ok(message.includes('Lotus Rental 22'));
 });
 test(`${lang}: dynamic labels and duration are translated`,()=>{
  assert.notEqual(translate('3 days',lang),'3 days');assert.notEqual(translate('Book Honda PCX 160',lang),'Book Honda PCX 160');
 });
}
test('English and model names stay intact',()=>{assert.equal(translate('Honda PCX 160','zh'),'Honda PCX 160');assert.equal(translate('Plan your ride','en'),'Plan your ride');});
