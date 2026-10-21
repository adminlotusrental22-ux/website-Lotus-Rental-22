import { BookingPolicyNotice } from './RentalPolicies';
import { getLanguage, dateLocale } from '../i18n/language';
import React, { useState } from 'react';
import { ArrowUpRight, Plus, Trash2, Check } from 'lucide-react';
import { Currency } from '../types';
import { SCOOTER_FLEET, formatPrice, BUSINESS_INFO } from '../data/businessData';
import { Dialog } from './Dialog';
import { resolveScooterId, getBookingSchedule, nextDay, isPickupTimeValid, calculateBookingTotals, buildBookingWhatsAppUrl } from '../lib/booking';
interface Props { isOpen: boolean; onClose: () => void; preselectedScooterId?: string | null; currentCurrency: Currency }
export const BookingModal = (props: Props) => props.isOpen ? <BookingForm key={props.preselectedScooterId || 'new'} {...props}/> : null;
function BookingForm({ onClose, preselectedScooterId, currentCurrency }: Props) {
  const now=getBookingSchedule();
  const earliestHour=now.earliestHour;
  const firstDate=now.minDate;
  const [units,setUnits]=useState([resolveScooterId(preselectedScooterId) || SCOOTER_FLEET[0].id]);
  const [date,setDate]=useState(firstDate);
  const [time,setTime]=useState(now.time);
  const [days,setDays]=useState(3);
  const [location,setLocation]=useState('airport');
  const [details,setDetails]=useState('');
  const [name,setName]=useState('');
  const [returnLocation,setReturnLocation]=useState('');
  const [returnMode,setReturnMode]=useState('same');
  const [error,setError]=useState('');
  const { subtotal, delivery } = calculateBookingTotals(units, days, location);
  const changeDate=(value:string)=>{setDate(value);if(value!==now.date)setTime('08:00');else setTime(String(earliestHour).padStart(2,'0')+':00');};
  const submit=(e:React.FormEvent)=>{e.preventDefault(); if(!isPickupTimeValid(date,time)){setError('Please choose a future handover time, with at least one hour to arrange your ride.');return;} if(returnMode==='different'&&(!returnLocation.trim()||/^(ya|yes|iya|no|tidak|ok|okay)$/i.test(returnLocation.trim()))){setError('Please enter the hotel name or full return address.');return;} if(!details.trim()&&location!=='pickup'){setError('Please add your flight details or hotel name.');return;} setError('');
    window.open(buildBookingWhatsAppUrl({units,date,time,days,location,details,name,returnLocation:returnMode==='same'?'':returnMode==='garage'?'garage':returnLocation}),'_blank','noopener,noreferrer');
  };
  return <Dialog title="Plan your ride" onClose={onClose} className="booking-dialog"><form id="booking-form" className="dialog-body booking-form" onSubmit={submit}>
    <p className="booking-intro">Choose your ride. Our local team will confirm availability on WhatsApp.</p>
    <fieldset><legend>01 / Your scooters</legend>{units.map((id,i)=><div className="unit-row" key={i}><label><span className="sr-only">Scooter {i+1}</span><select value={id} onChange={e=>setUnits(units.map((v,j)=>j===i?e.target.value:v))}>{SCOOTER_FLEET.map(s=><option key={s.id} value={s.id}>{s.name} · {formatPrice(s.dailyRateIdr,currentCurrency)}/day</option>)}</select></label>{units.length>1&&<button className="icon-button" type="button" onClick={()=>setUnits(units.filter((_,j)=>j!==i))} aria-label={`Remove scooter ${i+1}`}><Trash2 size={17}/></button>}</div>)}<button type="button" className="text-link add-unit" onClick={()=>setUnits([...units,SCOOTER_FLEET[0].id])}><Plus size={15}/> Add another scooter</button></fieldset>
    <fieldset><legend>02 / Your dates</legend><div className="form-grid"><label>Pickup date<input required aria-label="Pickup date" type="date" value={date} min={firstDate} onInput={e=>changeDate(e.currentTarget.value)} onChange={e=>changeDate(e.target.value)}/></label><label>Time · WITA<select value={time} onChange={e=>setTime(e.target.value)}>{Array.from({length:12},(_,i)=>i+8).map(h=><option key={h} value={String(h).padStart(2,'0')+':00'} disabled={date===now.date&&h<earliestHour}>{String(h).padStart(2,'0')}:00</option>)}</select></label><label>Duration<select value={days} onChange={e=>setDays(Number(e.target.value))}>{[1,2,3,4,5,6,7,14].map(d=><option key={d} value={d}>{String(d) + (d > 1 ? " days" : " day")}</option>)}</select></label><div className="return-date"><small>Return · same time</small><strong>{date?new Intl.DateTimeFormat(dateLocale(getLanguage()),{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(nextDay(date,days)+'T12:00:00Z')):'Choose a date'}</strong></div></div></fieldset>
    <fieldset><legend>03 / Meet us here</legend><div className="pickup-options" role="group" aria-label="Pickup location">{[{id:'airport',label:'Airport'},{id:'hotel',label:'Hotel / villa'},{id:'pickup',label:'Self pickup'}].map(l=><button type="button" key={l.id} aria-pressed={location===l.id} className={location===l.id?'selected':''} onClick={()=>{setLocation(l.id);setDetails('');}}>{l.label}</button>)}</div>{location!=='pickup'&&<label>{location==='airport'?'Flight number & arrival time':'Hotel / villa name & address'}<input required value={details} onChange={e=>setDetails(e.target.value)} placeholder={location==='airport'?'e.g. QZ 644 · arrival 10:30':'Where should we bring your scooter?'}/></label>}<label>Return location<select value={returnMode} onChange={e=>setReturnMode(e.target.value)}><option value="same">Same as pickup / delivery</option><option value="garage">Return to Lotus garage</option><option value="different">Another location in Labuan Bajo</option></select></label>{returnMode==='different'&&<label>Return address<input required value={returnLocation} onChange={e=>setReturnLocation(e.target.value)} placeholder="Hotel name or full return address"/></label>}<label>Your name <span className="muted">(optional)</span><input value={name} onChange={e=>setName(e.target.value)} autoComplete="name" placeholder="What should we call you?"/></label></fieldset>
    <BookingPolicyNotice onClose={onClose}/><p className="verification-note"><strong>Before handover</strong> {BUSINESS_INFO.verificationNote}</p>
    <div className="price-summary"><span>Rental · {units.length} scooter(s) × {days} day(s)<b>{formatPrice(subtotal,currentCurrency)}</b></span><span>Delivery{location==='pickup'?'':' · Rp 20k / scooter'}<b>{formatPrice(delivery,currentCurrency)}</b></span><span className="total-line">Estimated total<b>{formatPrice(subtotal+delivery,currentCurrency)}</b></span></div>
    <p className="section-note"><Check size={13}/> Zero security deposit · No passport held hostage · Pay with cash or QRIS at handover. {currentCurrency!=='IDR'?'Currency conversion is approximate; final pricing is in IDR.':''} Availability and delivery confirmed by our team.</p>
    {error&&<p role="alert" className="form-error">{error}</p>}
  </form><div className="dialog-footer booking-footer"><span className="booking-sticky-total"><span>Estimated total</span><strong>{formatPrice(subtotal+delivery,currentCurrency)}</strong></span><button form="booking-form" type="submit" className="button primary">Check on WhatsApp <ArrowUpRight size={17}/></button></div></Dialog>;
}












