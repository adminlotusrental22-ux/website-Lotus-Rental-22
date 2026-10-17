import test from 'node:test';
import assert from 'node:assert/strict';
import { translate, translateMessage } from '../src/i18n/language';
import { FAQ_ITEMS, SCOOTER_FLEET, BUSINESS_INFO, WHATSAPP_BOOKING_MESSAGE } from '../src/data/businessData';
for (const lang of ['id','zh','es','it'] as const) {
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


test('Spanish and Italian cover every existing editorial translation key',async()=>{
 const { translations }=await import('../src/i18n/translations');
 const { europeanTranslations }=await import('../src/i18n/europeanTranslations');
 for(const key of Object.keys(translations)){
  assert.ok(europeanTranslations[key]?.[0]?.trim(),`Spanish missing: ${key}`);
  assert.ok(europeanTranslations[key]?.[1]?.trim(),`Italian missing: ${key}`);
 }
});
test('European date locales and full booking message preserve order values',async()=>{
 const { dateLocale }=await import('../src/i18n/language');
 assert.equal(dateLocale('es'),'es-ES');assert.equal(dateLocale('it'),'it-IT');
 for(const lang of ['es','it'] as const){
  const message=translateMessage("Hi Lotus Rental 22! I'd like to check availability.\nPickup: 2026-11-01, 10:00 WITA\n1. Honda PCX 160\nEstimate: Rp 320.000\nPayment at handover: Cash or QRIS. No security deposit. My passport stays with me.",lang);
  for(const unchanged of ['2026-11-01','10:00 WITA','Honda PCX 160','Rp 320.000','QRIS'])assert.ok(message.includes(unchanged));
  assert.ok(!message.includes('Estimate:'));assert.ok(!message.includes('Payment at handover:'));
 }
});
