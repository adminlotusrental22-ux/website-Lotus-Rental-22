import { dateLocale, Language } from '../i18n/language';
import { SCOOTER_FLEET } from '../data/businessData';

const copy = {
  en: ['SCOOTER BOOKING REQUEST','Guest','SCOOTERS REQUESTED','unit(s)','day','Pickup / delivery','Return','Rental duration','day(s) · 24 hours/day','Pickup / delivery location','Location details','Return location','Same as pickup / delivery','ESTIMATED COST','Scooter rental','Delivery fee','ESTIMATED TOTAL','Cash or QRIS at handover · No security deposit.','Availability, exact model, return arrangements and final price require confirmation. This is a booking request, not a confirmed reservation.','Hi Lotus Rental 22! Please confirm availability for my trip. Thank you!','Komodo Airport (LBJ)','Hotel / villa','Lotus Rental 22 garage, Wae Mata'],
  id: ['PERMINTAAN BOOKING MOTOR','Nama','MOTOR YANG DIMINTA','unit','hari','Pengambilan / pengantaran','Pengembalian','Durasi sewa','hari · 24 jam/hari','Lokasi pengambilan / pengantaran','Detail lokasi','Lokasi pengembalian','Sama dengan pengambilan / pengantaran','ESTIMASI BIAYA','Sewa motor','Biaya pengantaran','TOTAL ESTIMASI','Tunai atau QRIS saat serah terima · Tanpa deposit.','Ketersediaan, model, pengembalian, dan harga akhir perlu dikonfirmasi. Ini permintaan booking, belum reservasi terkonfirmasi.','Halo Lotus Rental 22! Mohon konfirmasi ketersediaan untuk perjalanan saya. Terima kasih!','Bandara Komodo (LBJ)','Hotel / vila','Garasi Lotus Rental 22, Wae Mata'],
  zh: ['摩托车预订申请','姓名','申请车辆','辆','天','取车 / 配送','还车','租期','天 · 每天24小时','取车 / 配送地点','地点详情','还车地点','与取车 / 配送地点相同','费用预估','租金','配送费','预计总额','交车时现金或QRIS付款 · 无需押金。','车辆供应、具体车型、还车安排及最终价格须确认。这是预订申请，并非已确认的预订。','你好 Lotus Rental 22！请确认我的行程是否有车可租，谢谢！','科莫多机场（LBJ）','酒店 / 别墅','Lotus Rental 22 车库，Wae Mata'],
  es: ['SOLICITUD DE RESERVA DE SCOOTER','Nombre','SCOOTERS SOLICITADOS','unidad(es)','día','Recogida / entrega','Devolución','Duración','día(s) · 24 horas/día','Lugar de recogida / entrega','Detalles del lugar','Lugar de devolución','Igual que recogida / entrega','COSTE ESTIMADO','Alquiler','Entrega','TOTAL ESTIMADO','Efectivo o QRIS al recibir · Sin depósito de garantía.','Disponibilidad, modelo exacto, devolución y precio final sujetos a confirmación. Es una solicitud, no una reserva confirmada.','¡Hola Lotus Rental 22! Confirmen disponibilidad para mi viaje. ¡Gracias!','Aeropuerto de Komodo (LBJ)','Hotel / villa','Garaje Lotus Rental 22, Wae Mata'],
  it: ['RICHIESTA DI PRENOTAZIONE SCOOTER','Nome','SCOOTER RICHIESTI','unità','giorno','Ritiro / consegna','Restituzione','Durata','giorni · 24 ore/giorno','Luogo di ritiro / consegna','Dettagli del luogo','Luogo di restituzione','Come ritiro / consegna','COSTO STIMATO','Noleggio','Consegna','TOTALE STIMATO','Contanti o QRIS alla consegna · Nessuna cauzione.','Disponibilità, modello esatto, restituzione e prezzo finale da confermare. È una richiesta, non una prenotazione confermata.','Ciao Lotus Rental 22! Confermate la disponibilità per il mio viaggio. Grazie!','Aeroporto di Komodo (LBJ)','Hotel / villa','Garage Lotus Rental 22, Wae Mata'],
};

export function formatBookingMessage(order: {
  units:string[];date:string;returnDate:string;time:string;days:number;location:string;
  details:string;name:string;returnLocation:string;subtotal:number;delivery:number;total:number;
  returnTime?:string; minutes?:number; overtime?:number; overtimeHours?:number; extraDay?:boolean; hotelHandover?:boolean;
}, language:Language) {
  const t=copy[language];
  // Keep user-entered names and addresses intact, but prevent WhatsApp markdown/newlines
  // from turning a form value into a new summary section.
  const clean=(value:string)=>value.replace(/[\r\n]+/g,' ').replace(/[*_~`]/g,'').trim();
  const money=(value:number)=>'Rp '+value.toLocaleString('id-ID');
  const date=(value:string)=>new Intl.DateTimeFormat(dateLocale(language),{
    weekday:'short',day:'numeric',month:'short',year:'numeric',timeZone:'UTC',
  }).format(new Date(value+'T12:00:00Z'));
  const location=order.location==='airport'?t[20]:order.location==='hotel'?t[21]:t[22];
  const returnLocation=order.returnLocation==='garage'?t[22]:clean(order.returnLocation)||t[12];
  const quantities=new Map<string,number>();
  const extra = {
    en:['Overtime','hour(s)','Extra time exceeds 4 hours: one extra rental day included; no hourly charge.','After 19:00: garage return by 21:00 requires prior confirmation.','Hotel handover requested, not approved. Confirm the hotel, staff receiving the keys and return time with Lotus; send scooter, fuel, parking and key-handover photos. Without approval: garage by 21:00 or next-morning collection with one extra day per scooter.','day(s)','minute(s)'],
    id:['Waktu tambahan','jam','Tambahan melebihi 4 jam: satu hari sewa tambahan sudah dihitung; tanpa biaya per jam.','Setelah 19:00: kembali ke garasi hingga 21:00 wajib konfirmasi sebelumnya.','Permintaan serah terima di hotel, belum disetujui. Konfirmasi hotel, petugas penerima kunci, dan jam kembali dengan Lotus; kirim foto motor, bensin, parkir, dan serah terima kunci. Tanpa persetujuan: garasi hingga 21:00 atau penjemputan besok pagi ditambah satu hari per motor.','hari','menit'],
    zh:['超时费','小时','超出4小时：已计入额外一天租金，不再收小时费。','19:00后须提前确认，21:00前到车库还车。','申请酒店交车，尚未批准。请与Lotus确认酒店、收钥匙人员及时间，并发送车辆、油量、停车位置和钥匙交接照片。未获批准：21:00前到车库，或次晨收车且每辆加收一天。','天','分钟'],
    es:['Tiempo extra','hora(s)','Más de 4 horas extra: se incluye un día adicional, sin cargo por horas.','Después de las 19:00: garaje hasta las 21:00 con confirmación previa.','Entrega en hotel solicitada, no aprobada. Confirma con Lotus hotel, persona que recibe llaves y hora; envía fotos de moto, combustible, aparcamiento y entrega de llaves. Sin aprobación: garaje hasta las 21:00 o recogida al día siguiente con un día extra por moto.','día(s)','minuto(s)'],
    it:['Tempo extra','ora/e','Oltre 4 ore extra: incluso un giorno aggiuntivo, senza tariffa oraria.','Dopo le 19:00: garage entro le 21:00 con conferma anticipata.','Consegna in hotel richiesta, non approvata. Conferma con Lotus hotel, addetto alle chiavi e orario; invia foto di scooter, carburante, parcheggio e consegna chiavi. Senza approvazione: garage entro le 21:00 o ritiro domattina con un giorno extra per scooter.','giorno/i','minuto/i'],
  }[language];
  const minutes=order.minutes ?? order.days*1440;
  const duration=minutes%1440===0?`${minutes/1440} ${t[8]}`:[Math.floor(minutes/1440)?`${Math.floor(minutes/1440)} ${extra[5]}`:'',Math.floor(minutes%1440/60)?`${Math.floor(minutes%1440/60)} ${extra[1]}`:'',minutes%60?`${minutes%60} ${extra[6]}`:''].filter(Boolean).join(' + ');
  order.units.forEach(id=>quantities.set(id,(quantities.get(id)||0)+1));
  return [
    `🛵 *${t[0]} · LOTUS RENTAL 22*`,'',
    ...(clean(order.name)?[`👤 ${t[1]}: ${clean(order.name)}`,'']:[]),
    `*${t[2]} (${order.units.length} ${t[3]})*`,
    ...[...quantities].map(([id,quantity])=>{
      const scooter=SCOOTER_FLEET.find(s=>s.id===id)!;
      return `• ${quantity} × ${scooter.name} @ ${money(scooter.dailyRateIdr)}/${t[4]}`;
    }), '',
    `📅 ${t[5]}: ${date(order.date)}, ${order.time} WITA`,
    `🔄 ${t[6]}: ${date(order.returnDate)}, ${order.returnTime || order.time} WITA`,
    `⏳ ${t[7]}: ${duration}`, '',
    `📍 ${t[9]}: ${location}`,
    ...(clean(order.details)?[`${t[10]}: ${clean(order.details)}`]:[]),
    `📍 ${t[11]}: ${returnLocation}`, '',
    `💰 *${t[13]}*`,
    `• ${t[14]} (${order.units.length} × ${order.days} ${t[4]}): ${money(order.subtotal)}`,
    ...(order.overtime?[`• ${extra[0]} (${order.units.length} × ${order.overtimeHours} ${extra[1]}): ${money(order.overtime)}`]:[]),
    `• ${t[15]}: ${money(order.delivery)}`,
    `*${t[16]}: ${money(order.total)}*`, '',
    ...(order.extraDay?[extra[2]]:[]),
    ...(order.hotelHandover?[extra[4]]:(order.returnTime || order.time)>'19:00'?[extra[3]]:[]),
    t[17], '', `ℹ️ ${t[18]}`, '', t[19],
  ].join('\n');
}
