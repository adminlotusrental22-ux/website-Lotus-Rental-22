import React from 'react';
import { getLanguage } from '../i18n/language';
import { BUSINESS_INFO } from '../data/businessData';

// Each row contains the same policy in English, Indonesian, Chinese, Spanish and Italian.
const rows = [
  [
    "Duration: 1 day = 24 hours from handover. All times WITA (UTC+8).",
    "Durasi: 1 hari = 24 jam sejak serah terima. Semua waktu WITA (UTC+8).",
    "租期：1天=交车起24小时。时间均为WITA（UTC+8）。",
    "Duración: 1 día = 24 horas desde la entrega. Horario WITA (UTC+8).",
    "Durata: 1 giorno = 24 ore dalla consegna. Orario WITA (UTC+8)."
  ],
  [
    "Extension: request on WhatsApp at least 8 hours before return; subject to confirmation and availability. Otherwise, return on time.",
    "Perpanjangan: ajukan via WhatsApp minimal 8 jam sebelum kembali; wajib disetujui dan tergantung ketersediaan. Jika belum disetujui, kembali tepat waktu.",
    "延期：至少提前8小时通过WhatsApp申请，须确认且有车可用。未获批请准时还车。",
    "Prórroga: solicita por WhatsApp al menos 8 horas antes; requiere confirmación y disponibilidad. Sin aprobación, devuelve a tiempo.",
    "Proroga: richiedi su WhatsApp almeno 8 ore prima; soggetta a conferma e disponibilità. Senza approvazione, restituisci puntualmente."
  ],
  [
    "Overtime: Rp 15,000/hour/scooter, up to 4 hours (each started hour is charged). Over 4 hours: one full day at the scooter’s rate, replacing hourly charges for that period.",
    "Waktu tambahan: Rp 15.000/jam/motor, maksimal 4 jam (dibulatkan ke jam berikutnya). Lebih dari 4 jam: satu hari penuh sesuai tarif motor, menggantikan biaya per jam periode tersebut.",
    "超时：每辆每小时Rp 15,000，最多4小时，不足1小时按1小时计。超过4小时按车型收取一天租金，替代该时段小时费。",
    "Tiempo extra: Rp 15.000/hora/moto, hasta 4 horas (cada hora iniciada). Más de 4 horas: un día completo a la tarifa de la moto, en lugar del cargo por horas.",
    "Extra: Rp 15.000/ora/scooter, fino a 4 ore (ogni ora iniziata). Oltre 4 ore: un giorno intero alla tariffa dello scooter, al posto delle ore di quel periodo."
  ],
  [
    "Service & collection: daily 08:00–19:00. Garage returns until 21:00 by prior confirmation; overtime still applies. Hand the scooter and keys to our team.",
    "Layanan & penjemputan: setiap hari 08:00–19:00. Kembali ke garasi hingga 21:00 dengan konfirmasi; biaya kelebihan waktu tetap berlaku. Serahkan motor dan kunci ke petugas.",
    "服务与收车：每日08:00–19:00。经提前确认可到21:00在车库还车，超时仍收费。车辆和钥匙须交给工作人员。",
    "Servicio y recogida: 08:00–19:00. Garaje hasta las 21:00 con confirmación; se cobra el tiempo extra. Entrega moto y llaves al personal.",
    "Servizio e ritiro: 08:00–19:00. Garage fino alle 21:00 con conferma; il tempo extra resta a pagamento. Consegna scooter e chiavi al personale."
  ],
  [
    "Unless a hotel handover is expressly approved, collection requested after 19:00 is next morning, plus one full day per scooter. Avoid this overnight charge by arranging a garage return before 21:00.",
    "Jika serah terima hotel belum disetujui secara khusus, permintaan penjemputan setelah 19:00 dilakukan besok pagi, ditambah satu hari penuh per motor. Hindari biaya menginap ini dengan mengatur pengembalian sendiri ke garasi sebelum 21:00.",
    "酒店交接未获特别批准时，19:00后的收车请求安排次日上午，每辆加收一天。可预约21:00前自行到车库还车，避免过夜费用。",
    "Sin entrega en hotel expresamente aprobada, la recogida solicitada después de las 19:00 será a la mañana siguiente, con un día extra por moto. Evítalo acordando devolución en garaje antes de las 21:00.",
    "Senza consegna in hotel espressamente approvata, il ritiro richiesto dopo le 19:00 avviene la mattina seguente, con un giorno extra per scooter. Evitalo concordando il rientro in garage prima delle 21:00."
  ],
  [
    "Fuel & condition: return with the same fuel level. Inspect and photograph together at handover and return. Guests cover new physical damage, excluding recorded existing damage and normal wear; repair costs must be itemised.",
    "Bensin & kondisi: kembalikan dengan level bensin yang sama. Periksa dan foto bersama saat serah terima/kembali. Kerusakan fisik baru ditanggung tamu, kecuali kerusakan awal tercatat dan keausan wajar; biaya perbaikan wajib dirinci.",
    "油量与车况：同油量归还，交还时共同检查拍照。新增实体损坏由租客承担，已记录原损坏及正常磨损除外；维修费用须列明。",
    "Combustible y estado: devuelve con el mismo nivel; revisión y fotos conjuntas al entregar y devolver. El huésped cubre daños nuevos, salvo previos documentados y desgaste normal; reparación con desglose.",
    "Carburante e condizioni: stesso livello al rientro; controllo e foto insieme alla consegna e restituzione. Nuovi danni a carico dell’ospite, esclusi preesistenti documentati e usura normale; costi dettagliati."
  ],
  [
    "Area & riders: agreed Labuan Bajo area only; no out-of-town trips, intercity drop-offs, lending or sub-rental. Confirm routes/return location. Valid appropriate licence, helmets and sober riding required.",
    "Area & pengendara: hanya area Labuan Bajo yang disepakati; dilarang keluar kota, drop-off antarkota, meminjamkan, atau menyewakan ulang. Konfirmasi rute/lokasi kembali. Wajib SIM sesuai, helm, dan bebas alkohol/narkoba.",
    "区域与骑手：仅限约定拉布安巴焦区域；禁止出城、跨城还车、转借或转租。须确认路线及还车点，持有效适用驾照、戴头盔，禁止酒驾或毒驾。",
    "Zona y conductor: solo Labuan Bajo acordado; prohibido salir de la ciudad, devolver en otra ciudad, prestar o subalquilar. Confirma ruta y devolución. Permiso válido adecuado, casco y sin alcohol/drogas.",
    "Area e conducente: solo zona concordata di Labuan Bajo; vietati viaggi fuori città, rientri in altre città, prestito e subnoleggio. Conferma percorso e rientro. Patente idonea valida, casco e niente alcol/droghe."
  ],
  [
    "Problems & booking: report accidents/damage promptly; stop if unsafe, contact emergency services when needed and agree repairs with us first. Confirm availability, final price, collection and cancellation/refund terms before accepting or paying.",
    "Masalah & booking: segera laporkan kecelakaan/kerusakan; berhenti jika tidak aman, hubungi layanan darurat bila perlu, dan sepakati perbaikan dengan kami dahulu. Konfirmasi ketersediaan, total, pengembalian, dan pembatalan/refund sebelum setuju atau bayar.",
    "问题与预订：及时报告事故损坏；危险时停车，必要时联系急救，维修先协商。接受或付款前确认供应、总价、收车及取消退款条件。",
    "Incidencias y reserva: informa accidentes/daños; detente si no es seguro, llama a emergencias si procede y acuerda reparaciones primero. Confirma disponibilidad, total, recogida y cancelación/reembolso antes de aceptar o pagar.",
    "Problemi e prenotazione: segnala incidenti/danni; fermati se non sicuro, chiama i soccorsi se necessario e concorda prima riparazioni. Conferma disponibilità, totale, ritiro e cancellazione/rimborso prima di accettare o pagare."
  ]
];
rows.push([
  'Hotel handover: request approval before return. Confirm the hotel, receiving staff and time with Lotus. Send photos of the scooter, fuel, parking and key handover. The return is complete only when our team confirms it. Without approval, return to the garage by 21:00 or pay one extra day for next-morning collection. Do not leave the scooter or keys unattended.',
  'Serah terima di hotel: minta persetujuan sebelum kembali. Konfirmasi hotel, petugas penerima, dan waktu dengan Lotus. Kirim foto motor, bensin, parkir, dan serah terima kunci. Pengembalian selesai hanya setelah dikonfirmasi tim. Tanpa persetujuan, kembali ke garasi hingga 21:00 atau dikenakan tambahan satu hari untuk penjemputan besok pagi. Jangan tinggalkan motor atau kunci tanpa penerima.',
  '酒店交接须提前批准，并与Lotus确认酒店、接收人员及时间。发送车辆、油量、停车位置和钥匙交接照片。经团队确认才算归还完成。未获批准请21:00前到车库还车，或次晨收车并加收一天。请勿无人接收就留下车辆或钥匙。',
  'Entrega en hotel: solicita aprobación previa. Confirma hotel, receptor y hora con Lotus. Envía fotos de moto, combustible, aparcamiento y entrega de llaves. La devolución termina al confirmarla nuestro equipo. Sin aprobación: garaje hasta las 21:00 o un día extra para recogida al día siguiente. No dejes moto ni llaves sin receptor.',
  'Consegna in hotel: richiedi prima approvazione e conferma hotel, addetto e orario con Lotus. Invia foto di scooter, carburante, parcheggio e consegna chiavi. Il rientro termina solo dopo conferma del team. Senza approvazione: garage entro le 21:00 o un giorno extra per il ritiro domattina. Non lasciare scooter o chiavi incustoditi.'
]);
const privacy = [
  [
    "At handover, we photograph your passport or ID and record the scooter condition for rental verification. Flight or hotel details may be requested. Your original passport stays with you.",
    "Saat serah terima, kami memfoto paspor/KTP dan kondisi motor untuk verifikasi sewa. Detail penerbangan atau hotel mungkin diminta. Paspor asli tetap Anda pegang.",
    "交车时拍摄护照或身份证及车况，用于租赁核验。可能需要航班或酒店信息，护照原件由您保管。",
    "En la entrega fotografiamos tu pasaporte o identificación y el estado de la moto para verificar el alquiler. Podemos pedir datos del vuelo u hotel. Conservas tu pasaporte original.",
    "Alla consegna fotografiamo passaporto o documento e condizioni dello scooter per verificare il noleggio. Potremmo chiedere dati di volo o hotel. Il passaporto originale resta a te."
  ],
  [
    "Booking and verification details are used to arrange the rental, record handover and handle rental issues. Access is limited to those who need it for these purposes.",
    "Data booking dan verifikasi digunakan untuk mengatur sewa, mencatat serah terima, dan menangani masalah sewa. Akses dibatasi kepada pihak yang memerlukannya untuk tujuan tersebut.",
    "预订及核验资料用于安排租赁、记录交接和处理租赁问题，仅限为这些目的需要访问的人员使用。",
    "Los datos de reserva y verificación se usan para organizar el alquiler, registrar la entrega y resolver incidencias. El acceso se limita a quienes los necesitan para esos fines.",
    "I dati di prenotazione e verifica servono a organizzare il noleggio, registrare la consegna e gestire problemi. L’accesso è limitato a chi ne ha bisogno per questi scopi."
  ],
  [
    "Records are kept only as long as needed for rental administration, unresolved issues or applicable legal requirements, then deleted when no longer needed.",
    "Catatan disimpan selama diperlukan untuk administrasi sewa, masalah yang belum selesai, atau kewajiban hukum yang berlaku, lalu dihapus ketika tidak diperlukan lagi.",
    "资料仅在租赁管理、未解决问题或适用法律要求所需期间保留，不再需要时删除。",
    "Los registros se conservan mientras sean necesarios para gestionar el alquiler, resolver incidencias pendientes o cumplir requisitos legales, y se eliminan cuando dejan de ser necesarios.",
    "I dati si conservano per il tempo necessario a gestire il noleggio, problemi aperti o obblighi di legge, poi si eliminano quando non servono più."
  ],
  [
    "We ask for separate permission before publishing handover photos that identify you or show your personal details.",
    "Kami meminta izin terpisah sebelum mempublikasikan foto serah terima yang menampilkan identitas atau data pribadi Anda.",
    "发布可识别您或显示个人资料的交接照片前，我们会另行征求许可。",
    "Pedimos permiso por separado antes de publicar fotos de entrega que te identifiquen o muestren tus datos personales.",
    "Chiediamo un permesso separato prima di pubblicare foto di consegna che ti identifichino o mostrino dati personali."
  ],
  [
    "Contact us with privacy questions or requests to access, correct or delete your data. Requests are handled subject to applicable law and any records we must retain.",
    "Hubungi kami untuk pertanyaan privasi atau permintaan akses, koreksi, atau penghapusan data. Permintaan ditangani sesuai hukum yang berlaku dan catatan yang wajib disimpan.",
    "如有隐私问题或查阅、更正、删除资料的请求，请联系我们。处理须遵守适用法律及必要资料保留义务。",
    "Contáctanos para consultas de privacidad o solicitudes de acceso, corrección o eliminación. Se tramitan conforme a la ley y a los registros que debamos conservar.",
    "Contattaci per domande sulla privacy o richieste di accesso, correzione o cancellazione. Le gestiamo secondo la legge e gli obblighi di conservazione."
  ],
  [
    "This site saves your language choice. Booking opens a WhatsApp draft for you to send; maps, fonts and social links use third-party services with their own privacy policies.",
    "Situs menyimpan pilihan bahasa Anda. Booking membuka draft WhatsApp untuk Anda kirim; peta, font, dan tautan sosial menggunakan layanan pihak ketiga dengan kebijakan privasinya sendiri.",
    "网站保存您的语言选择。预订会生成由您发送的WhatsApp草稿；地图、字体及社交链接使用第三方服务，适用其各自隐私政策。",
    "La web guarda tu idioma. La reserva prepara un borrador de WhatsApp que tú decides enviar; mapas, fuentes y enlaces sociales usan servicios externos con sus propias políticas de privacidad.",
    "Il sito salva la lingua scelta. La prenotazione prepara una bozza WhatsApp che scegli tu di inviare; mappe, font e link social usano servizi esterni con proprie informative privacy."
  ]
];
export function RentalPolicies(){
  const language=getLanguage();
  const i=({en:0,id:1,zh:2,es:3,it:4})[language];
  const titles=[['Rental essentials','Ketentuan sewa','租赁须知','Condiciones de alquiler','Condizioni di noleggio'],['Rental terms','Ketentuan lengkap','租赁条款','Condiciones completas','Condizioni complete'],['Privacy & verification','Privasi & verifikasi','隐私与核验','Privacidad y verificación','Privacy e verifica']];
  return <section id="rental-policies" className="page-width content-section rental-policies"><h2>{titles[0][i]}</h2><p className="policy-summary">{rows[0][i]}</p><details id="rental-terms"><summary>{titles[1][i]} <span aria-hidden="true">＋</span></summary><ul className="policy-list">{rows.map((r,n)=><li key={n}>{r[i]}</li>)}</ul></details><details id="privacy-policy"><summary>{titles[2][i]} <span aria-hidden="true">＋</span></summary><ul className="policy-list">{privacy.map((r,n)=>r[i].match(/[^.!?。！？]+[.!?。！？]+|[^.!?。！？]+$/g)?.map((sentence,j)=><li key={`${n}-${j}`}>{sentence.trim()}</li>))}</ul><p>Lotus Rental 22 · <a href={`mailto:${BUSINESS_INFO.email}`}>{BUSINESS_INFO.email}</a> · <a href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}`}>{BUSINESS_INFO.phoneDisplay}</a></p></details></section>;
}
export function BookingPolicyNotice() {
  const i=({en:0,id:1,zh:2,es:3,it:4})[getLanguage()];
  const label=['Rental terms & privacy','Ketentuan sewa & privasi','租赁条款与隐私','Condiciones y privacidad','Condizioni e privacy'][i];
  const privacyLabel=['Privacy & verification','Privasi & verifikasi','隐私与核验','Privacidad y verificación','Privacy e verifica'][i];
  return <details className="booking-policy-details"><summary>{label}</summary><div><ul>{rows.map((row,n)=><li key={n}>{row[i]}</li>)}</ul><h3>{privacyLabel}</h3><ul>{privacy.map((row,n)=><li key={n}>{row[i]}</li>)}</ul></div></details>;
}
