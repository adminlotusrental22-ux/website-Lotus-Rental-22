import test from 'node:test';
import assert from 'node:assert/strict';
import {tourTranslations,tourTranslate,tourMessage} from '../src/i18n/tourTranslations';
test('all tour translations have four complete non-English variants',()=>{
 for(const [key,values] of Object.entries(tourTranslations)){
  assert.equal(values.length,4,key);
  for(const language of ['id','zh','es','it'])assert.notEqual(tourTranslate(key,language),key,key+' '+language);
 }
});
test('tour WhatsApp request keeps entered location, price and extra-car quote',()=>{
 const source='🚙 *PRIVATE TOUR REQUEST · LOTUS RENTAL 22*\nPickup: Hotel A & B\n*Car charter: Rp 1,200,000 / car / day*\nAdditional car requested: please quote separately.';
 for(const language of ['id','zh','es','it']){
  const message=tourMessage(source,language);
  assert.ok(message.includes('Hotel A & B'));
  assert.ok(message.includes('Rp 1,200,000'));
  assert.ok(!message.includes('Additional car requested:'));
  assert.ok(!message.includes('undefined'));
 }
});
