import test from 'node:test';
import assert from 'node:assert/strict';
import {tourTranslations,tourTranslate,tourMessage} from '../src/i18n/tourTranslations';
import {isCityTourRoute} from '../src/lib/tourRouting';
test('all tour translations have four complete non-English variants',()=>{
 for(const [key,values] of Object.entries(tourTranslations)){
  assert.equal(values.length,4,key);
  for(const language of ['id','zh','es','it'])assert.notEqual(tourTranslate(key,language),key,key+' '+language);
 }
});
test('tour WhatsApp request keeps entered location, price and extra-car quote',()=>{
 const source='🚙 *CITY TOUR REQUEST · LOTUS RENTAL 22*\nPickup: Hotel A & B\n*City tour: Rp 1,200,000 / car / day*\nAdditional car requested: please quote separately.';
 for(const language of ['id','zh','es','it']){
  const message=tourMessage(source,language);
  assert.ok(message.includes('Hotel A & B'));
  assert.ok(message.includes('Rp 1,200,000'));
  assert.ok(!message.includes('Additional car requested:'));
  assert.ok(!message.includes('undefined'));
 }
});

test('City tour naming is localized in navigation and WhatsApp requests',()=>{
  const names={en:'City tour',id:'Tur kota',zh:'城市游',es:'Tour por la ciudad',it:'Tour della città'};
  const requestTitles={en:'CITY TOUR REQUEST',id:'PERMINTAAN CITY TOUR',zh:'城市游申请',es:'SOLICITUD DE TOUR POR LA CIUDAD',it:'RICHIESTA TOUR DELLA CITTÀ'};
  for(const [language,name] of Object.entries(names)) {
    assert.equal(tourTranslate('City tour',language),name);
    const message=tourMessage('🚙 *CITY TOUR REQUEST · LOTUS RENTAL 22*\nPickup: Private Hotel\n*City tour: Rp 1,200,000 / car / day*',language);
    assert.ok(message.includes(requestTitles[language as keyof typeof requestTitles]));
    assert.ok(message.includes('Private Hotel'));
    assert.ok(message.includes('Rp 1,200,000'));
    assert.doesNotMatch(message,/PRIVATE TOUR|TUR PRIVAT|私人游|TOUR PRIVADO|TOUR PRIVATO/);
    assert.ok(!message.includes('undefined'));
  }
});

test('City tour routes support new navigation and previously shared links',()=>{
  for(const hash of ['#city-tour','#private-tour','#tour-booking','#tour-itinerary'])assert.equal(isCityTourRoute(hash),true,hash);
  for(const hash of ['','#home','#scooters','#rental-policies'])assert.equal(isCityTourRoute(hash),false,hash);
});
