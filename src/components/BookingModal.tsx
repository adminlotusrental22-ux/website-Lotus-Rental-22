import { BookingPolicyNotice } from './RentalPolicies';
import React, { useState } from 'react';
import { ArrowUpRight, Plus, Trash2, Check } from 'lucide-react';
import { Currency } from '../types';
import { SCOOTER_FLEET, formatPrice, BUSINESS_INFO } from '../data/businessData';
import { Dialog } from './Dialog';
import { resolveScooterId, getBookingSchedule, nextDay, isPickupTimeValid, calculateScheduledBookingTotals, isReturnAfterHours, isReturnTimeValid, buildBookingWhatsAppUrl } from '../lib/booking';
interface Props { isOpen: boolean; onClose: () => void; preselectedScooterId?: string | null; currentCurrency: Currency }
export const BookingModal = (props: Props) => props.isOpen ? <BookingForm key={props.preselectedScooterId || 'new'} {...props}/> : null;
function BookingForm({ onClose, preselectedScooterId, currentCurrency }: Props) {
  const now=getBookingSchedule();
  const earliestHour=now.earliestHour;
  const firstDate=now.minDate;
  const [units,setUnits]=useState([resolveScooterId(preselectedScooterId) || SCOOTER_FLEET[0].id]);
  const [date,setDate]=useState(firstDate);
  const [time,setTime]=useState(now.time);
  const [returnDate,setReturnDate]=useState(nextDay(firstDate,3));
  const [returnTime,setReturnTime]=useState(now.time);
  const [customReturnTime,setCustomReturnTime]=useState(false);
  const [location,setLocation]=useState('airport');
  const [details,setDetails]=useState('');
  const [name,setName]=useState('');
  const [returnLocation,setReturnLocation]=useState('');
  const [returnMode,setReturnMode]=useState('same');
  const [error,setError]=useState('');
  let quote: ReturnType<typeof calculateScheduledBookingTotals> | null = null;
  try { quote=calculateScheduledBookingTotals(units,location,date,time,returnDate,returnTime); } catch {}
  const afterHours=isReturnAfterHours(returnTime);
  const money=(amount:number|undefined)=>amount===undefined?'—':formatPrice(amount,currentCurrency);
  const changeDate=(value:string)=>{
    const duration=Math.max(1,Math.round((Date.parse(returnDate)-Date.parse(date))/86400000)||3);
    setDate(value);
    if (/^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value))) setReturnDate(nextDay(value,duration));
    const newTime=value===now.date?String(earliestHour).padStart(2,'0')+':00':'08:00';
    setTime(newTime);if(!customReturnTime)setReturnTime(newTime);
  };
  const changeTime=(value:string)=>{setTime(value);if(!customReturnTime)setReturnTime(value);};
  const changeReturnTime=(value:string)=>{
    setReturnTime(value);setCustomReturnTime(true);
    if(isReturnAfterHours(value)&&returnMode!=='garage'&&returnMode!=='hotel-request')setReturnMode('garage');
  };
  const submit=(e:React.FormEvent)=>{
    e.preventDefault();
    if(!isPickupTimeValid(date,time)){setError('Please choose a future handover time, with at least one hour to arrange your ride.');return;}
    if(!quote){setError('Return must be after pickup.');return;}
    if(!isReturnTimeValid(returnTime)){setError('Returns are available from 08:00 to 21:00 WITA.');return;}
    if(afterHours&&returnMode!=='garage'&&returnMode!=='hotel-request'){setError('After 19:00, choose garage return or request a hotel handover.');return;}
    if((returnMode==='different'||returnMode==='hotel-request')&&(!returnLocation.trim()||/^(ya|yes|iya|no|tidak|ok|okay)$/i.test(returnLocation.trim()))){setError('Please enter the hotel name or full return address.');return;}
    if(!details.trim()&&location!=='pickup'){setError('Please add your flight details or hotel name.');return;}
    setError('');
    window.open(buildBookingWhatsAppUrl({units,date,time,days:quote.baseDays,returnDate,returnTime,location,details,name,hotelHandover:returnMode==='hotel-request',returnLocation:returnMode==='same'?'':returnMode==='garage'?'garage':returnLocation}),'_blank','noopener,noreferrer');
  };
  return <Dialog title="Plan your ride" onClose={onClose} className="booking-dialog"><form id="booking-form" className="dialog-body booking-form" onSubmit={submit}>
    <p className="booking-intro">Choose your ride. Our local team will confirm availability on WhatsApp.</p>
    <fieldset><legend>01 / Your scooters</legend>{units.map((id,i)=><div className="unit-row" key={i}><label><span className="sr-only">Scooter {i+1}</span><select value={id} onChange={e=>setUnits(units.map((v,j)=>j===i?e.target.value:v))}>{SCOOTER_FLEET.map(s=><option key={s.id} value={s.id}>{s.name} · {formatPrice(s.dailyRateIdr,currentCurrency)}/day</option>)}</select></label>{units.length>1&&<button className="icon-button" type="button" onClick={()=>setUnits(units.filter((_,j)=>j!==i))} aria-label={`Remove scooter ${i+1}`}><Trash2 size={17}/></button>}</div>)}<button type="button" className="text-link add-unit" onClick={()=>setUnits([...units,SCOOTER_FLEET[0].id])}><Plus size={15}/> Add another scooter</button></fieldset>
    <fieldset><legend>02 / Your dates</legend><div className="form-grid">
      <label>Pickup date<input required aria-label="Pickup date" type="date" value={date} min={firstDate} onInput={e=>changeDate(e.currentTarget.value)} onChange={e=>changeDate(e.target.value)}/></label>
      <label>Pickup time · WITA<select aria-label="Pickup time · WITA" value={time} onChange={e=>changeTime(e.target.value)}>{Array.from({length:12},(_,i)=>i+8).map(h=><option key={h} value={String(h).padStart(2,'0')+':00'} disabled={date===now.date&&h<earliestHour}>{String(h).padStart(2,'0')}:00</option>)}</select></label>
      <label>Return date<input required aria-label="Return date" type="date" value={returnDate} min={date} onInput={e=>setReturnDate(e.currentTarget.value)} onChange={e=>setReturnDate(e.target.value)}/></label>
      <label>Return time · WITA<input required aria-label="Return time · WITA" type="time" min="08:00" max="21:00" step="60" value={returnTime} onInput={e=>changeReturnTime(e.currentTarget.value)} onChange={e=>changeReturnTime(e.target.value)}/></label>
    </div><p className="rental-time-summary"><span>Charged rental days</span>: <strong>{quote?.billedDays ?? '—'}</strong>{!!quote?.overtimeHours&&<> · <span>Extra hours</span>: <strong>{quote.overtimeHours}</strong></>}</p>
    <p className="rental-time-help">Minimum 1 day. Up to 4 extra hours: Rp 15,000 per started hour per scooter. Over 4 extra hours: one full day instead of hourly charges.</p>
    {quote?.extraDay&&<p className="return-arrangement-note">Extra time exceeds 4 hours. One extra rental day is included in the estimate; no hourly charge.</p>}
    </fieldset>
    <fieldset><legend>03 / Meet us here</legend><div className="pickup-options" role="group" aria-label="Pickup location">{[{id:'airport',label:'Airport'},{id:'hotel',label:'Hotel / villa'},{id:'pickup',label:'Self pickup'}].map(l=><button type="button" key={l.id} aria-pressed={location===l.id} className={location===l.id?'selected':''} onClick={()=>{setLocation(l.id);setDetails('');}}>{l.label}</button>)}</div>{location!=='pickup'&&<label>{location==='airport'?'Flight number & arrival time':'Hotel / villa name & address'}<input required value={details} onChange={e=>setDetails(e.target.value)} placeholder={location==='airport'?'e.g. QZ 644 · arrival 10:30':'Where should we bring your scooter?'}/></label>}<label>Return location<select value={returnMode} onChange={e=>setReturnMode(e.target.value)}><option value="same" disabled={afterHours}>Same as pickup / delivery</option><option value="garage">Return to Lotus garage</option><option value="different" disabled={afterHours}>Another location in Labuan Bajo</option><option value="hotel-request">Request hotel handover</option></select></label>{(returnMode==='different'||returnMode==='hotel-request')&&<label>Return address<input required value={returnLocation} onChange={e=>setReturnLocation(e.target.value)} placeholder="Hotel name or full return address"/></label>}<label>Your name <span className="muted">(optional)</span><input value={name} onChange={e=>setName(e.target.value)} autoComplete="name" placeholder="What should we call you?"/></label></fieldset>
    {afterHours&&<aside className="return-arrangement-note" aria-live="polite"><strong>Return after 19:00 WITA</strong><ul><li>Return to our garage by 21:00 with prior WhatsApp confirmation. Overtime charges still apply.</li><li>Hotel handover is available only if our team approves the hotel, receiving staff and return time in advance. Send photos of the scooter, fuel level, parking location and key handover.</li><li>Without an approved handover, collection is next morning with one extra day per scooter. Do not leave the scooter or keys unattended.</li></ul></aside>}
    {returnMode==='hotel-request'&&<p className="return-arrangement-note">Hotel handover is a request, not confirmed. Any unapproved overnight collection charge is not included in this estimate.</p>}
    <BookingPolicyNotice/><p className="verification-note"><strong>Before handover</strong> {BUSINESS_INFO.verificationNote}</p>
    <div className="price-summary"><span><span><span>Rental ·</span> {units.length} <span>scooter(s) ×</span> {quote?.billedDays ?? '—'} <span>day(s)</span></span><b>{money(quote?.subtotal)}</b></span>
      {!!quote?.overtime&&<span><span><span>Overtime</span> · {quote.overtimeHours} <span>hour(s) per scooter</span></span><b>{money(quote.overtime)}</b></span>}
      <span>Delivery{location==='pickup'?'':' · Rp 20k / scooter'}<b>{money(quote?.delivery)}</b></span><span className="total-line">Estimated total<b>{money(quote?.total)}</b></span></div>
    <p className="section-note"><Check size={13}/> Zero security deposit · No passport held hostage · Pay with cash or QRIS at handover. {currentCurrency!=='IDR'?'Currency conversion is approximate; final pricing is in IDR.':''} Availability and delivery confirmed by our team.</p>
    {error&&<p role="alert" className="form-error">{error}</p>}
  </form><div className="dialog-footer booking-footer"><span className="booking-sticky-total"><span>Estimated total</span><strong>{money(quote?.total)}</strong></span><button form="booking-form" type="submit" className="button primary">Check on WhatsApp <ArrowUpRight size={17}/></button></div></Dialog>;
}












