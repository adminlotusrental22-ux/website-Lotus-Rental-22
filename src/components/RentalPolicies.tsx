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
    "Overtime: Rp 15,000/hour/scooter, up to 4 hours. Over 4 hours: one full day at the scooter’s rate, replacing hourly charges for that period.",
    "Waktu tambahan: Rp 15.000/jam/motor, maksimal 4 jam. Lebih dari 4 jam: satu hari penuh sesuai tarif motor, menggantikan biaya per jam periode tersebut.",
    "超时：每辆每小时Rp 15,000，最多4小时。超过4小时按车型收取一天租金，替代该时段小时费。",
    "Tiempo extra: Rp 15.000/hora/moto, hasta 4 horas. Más de 4 horas: un día completo a la tarifa de la moto, en lugar del cargo por horas.",
    "Extra: Rp 15.000/ora/scooter, fino a 4 ore. Oltre 4 ore: un giorno intero alla tariffa dello scooter, al posto delle ore di quel periodo."
  ],
  [
    "Service & collection: daily 08:00–19:00. Garage returns until 21:00 by prior confirmation; overtime still applies. Hand the scooter and keys to our team.",
    "Layanan & penjemputan: setiap hari 08:00–19:00. Kembali ke garasi hingga 21:00 dengan konfirmasi; biaya kelebihan waktu tetap berlaku. Serahkan motor dan kunci ke petugas.",
    "服务与收车：每日08:00–19:00。经提前确认可到21:00在车库还车，超时仍收费。车辆和钥匙须交给工作人员。",
    "Servicio y recogida: 08:00–19:00. Garaje hasta las 21:00 con confirmación; se cobra el tiempo extra. Entrega moto y llaves al personal.",
    "Servizio e ritiro: 08:00–19:00. Garage fino alle 21:00 con conferma; il tempo extra resta a pagamento. Consegna scooter e chiavi al personale."
  ],
  [
    "Collection after 19:00: next morning, plus one full day per scooter. Avoid this overnight charge by arranging a garage return before 21:00.",
    "Penjemputan setelah 19:00: besok pagi, ditambah satu hari penuh per motor. Hindari biaya menginap ini dengan mengatur pengembalian sendiri ke garasi sebelum 21:00.",
    "19:00后收车：次日上午收取，每辆加收一天。可预约21:00前自行到车库还车，避免过夜费用。",
    "Recogida después de las 19:00: a la mañana siguiente, con un día extra por moto. Evítalo acordando devolución en garaje antes de las 21:00.",
    "Ritiro dopo le 19:00: la mattina seguente, con un giorno extra per scooter. Evitalo concordando il rientro in garage prima delle 21:00."
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
const privacy = [
  ['At our in-person meeting, we photograph your passport or national ID and document the scooter handover to verify the renter and record the rental. Flight tickets and hotel booking confirmation may also be requested when needed to confirm travel and handover arrangements. Your original passport stays with you. This website does not provide a passport upload form.', 'Saat bertemu langsung, kami memfoto paspor atau KTP dan mendokumentasikan serah terima motor untuk verifikasi penyewa dan pencatatan sewa. Tiket penerbangan dan konfirmasi hotel mungkin diminta bila diperlukan untuk memastikan perjalanan dan serah terima. Paspor asli tetap Anda pegang. Website ini tidak menyediakan form unggah paspor.', '当面交车时，我们会拍摄护照或身份证及车辆交接记录，用于核实租客和记录租赁。必要时可能要求机票及酒店预订确认以安排交接。护照原件由您保管。网站不提供护照上传表单。', 'Al reunirnos fotografiamos tu pasaporte o documento de identidad y documentamos la entrega para verificar al arrendatario y registrar el alquiler. Podemos solicitar billetes de avión y reserva de hotel cuando sea necesario para coordinar la entrega. Conservas tu pasaporte original. La web no permite subir pasaportes.', 'All’incontro fotografiamo passaporto o documento d’identità e documentiamo la consegna per verificare il cliente e registrare il noleggio. Se necessario possiamo richiedere biglietti aerei e prenotazione dell’hotel per organizzare la consegna. Il passaporto originale resta a te. Il sito non consente di caricare passaporti.'],
  ['The booking form prepares a WhatsApp message containing the details you enter; you choose whether to send it. Verification records are for rental administration, handover and resolving rental issues, not public marketing. Handover photos containing personal information must not be published without separate permission. Avoid sending unrelated sensitive information.', 'Form booking menyiapkan pesan WhatsApp berisi data yang Anda isi; Anda memilih apakah akan mengirimkannya. Catatan verifikasi digunakan untuk administrasi, serah terima, dan penyelesaian masalah sewa, bukan publikasi pemasaran. Foto serah terima yang memuat data pribadi tidak boleh dipublikasikan tanpa izin terpisah. Hindari mengirim informasi sensitif yang tidak relevan.', '预订表单会生成包含您输入信息的WhatsApp消息，由您决定是否发送。核验记录仅用于租赁管理、交接和处理租赁问题，不用于公开营销。含个人信息的交接照片未经另行许可不得发布。请勿发送无关敏感信息。', 'El formulario prepara un mensaje de WhatsApp con tus datos; tú decides enviarlo. Los registros de verificación se usan para gestionar el alquiler, la entrega y posibles incidencias, no para marketing público. Las fotos con datos personales requieren permiso separado para publicarse. No envíes información sensible innecesaria.', 'Il modulo prepara un messaggio WhatsApp con i dati inseriti; scegli tu se inviarlo. I documenti servono a gestire noleggio, consegna e problemi, non a marketing pubblico. Foto con dati personali richiedono un permesso separato per la pubblicazione. Non inviare informazioni sensibili non pertinenti.'],
  ["Verification photos are stored on the owner’s phone/private database, with access restricted to the owner. They are deleted 7 days after the scooter is returned, unless needed for an unresolved rental issue or an applicable retention obligation; in that case, we explain the reason and retain only the necessary records. Contact us to request access, correction or deletion. This deletion policy covers copies under our control.", "Foto verifikasi disimpan di HP/database pribadi owner, dengan akses terbatas hanya untuk owner. Foto dihapus 7 hari setelah motor dikembalikan, kecuali diperlukan untuk masalah sewa yang belum selesai atau kewajiban penyimpanan yang berlaku; dalam hal ini, kami menjelaskan alasannya dan menyimpan hanya catatan yang diperlukan. Hubungi kami untuk permintaan akses, koreksi, atau penghapusan. Kebijakan penghapusan mencakup salinan yang kami kelola.", "核验照片存于店主手机或私人数据库，仅限店主访问。车辆归还7天后删除，未解决租赁问题或适用保留义务所需记录除外；此时我们说明原因并仅保留必要记录。可联系我们申请查阅、更正或删除。删除范围包括我们控制的副本。", "Las fotos de verificación se guardan en el teléfono/base de datos privada del propietario, con acceso exclusivo del propietario. Se eliminan 7 días después de devolver la moto, salvo registros necesarios para una incidencia pendiente u obligación aplicable; explicaremos el motivo y conservaremos solo lo necesario. Puedes solicitar acceso, corrección o eliminación. La eliminación incluye copias bajo nuestro control.", "Le foto di verifica sono conservate nel telefono/database privato del proprietario, accessibili solo al proprietario. Sono eliminate 7 giorni dopo la restituzione, salvo registrazioni necessarie per problemi aperti o obblighi applicabili; spieghiamo il motivo e conserviamo solo il necessario. Puoi richiedere accesso, correzione o cancellazione. La cancellazione include le copie sotto il nostro controllo."],
  ['This site remembers your language preference on your device. Google Maps and Google Fonts load external resources. Social preview links open Instagram or TikTok; booking links open WhatsApp. Those services process information under their own privacy policies.', 'Situs mengingat pilihan bahasa di perangkat Anda. Google Maps dan Google Fonts memuat sumber eksternal. Tautan sosial membuka Instagram atau TikTok; tautan booking membuka WhatsApp. Layanan tersebut memproses informasi sesuai kebijakan privasinya masing-masing.', '网站在设备上记住语言偏好。Google地图和字体加载外部资源。社交链接打开Instagram或TikTok；预订链接打开WhatsApp。这些服务按各自隐私政策处理信息。', 'La web recuerda el idioma en tu dispositivo. Google Maps y Google Fonts cargan recursos externos. Los enlaces sociales abren Instagram o TikTok; las reservas abren WhatsApp. Estos servicios aplican sus propias políticas de privacidad.', 'Il sito ricorda la lingua sul dispositivo. Google Maps e Google Fonts caricano risorse esterne. I link social aprono Instagram o TikTok; le prenotazioni aprono WhatsApp. Questi servizi applicano le proprie informative privacy.'],
];
export function RentalPolicies(){
  const language=getLanguage();
  const i=({en:0,id:1,zh:2,es:3,it:4})[language];
  const titles=[['Rental essentials','Ketentuan sewa','租赁须知','Condiciones de alquiler','Condizioni di noleggio'],['Rental terms','Ketentuan lengkap','租赁条款','Condiciones completas','Condizioni complete'],['Privacy & verification','Privasi & verifikasi','隐私与核验','Privacidad y verificación','Privacy e verifica']];
  return <section id="rental-policies" className="page-width content-section rental-policies"><h2>{titles[0][i]}</h2><p className="policy-summary">{rows[0][i]}</p><details id="rental-terms"><summary>{titles[1][i]} <span aria-hidden="true">＋</span></summary><ul className="policy-list">{rows.map((r,n)=><li key={n}>{r[i]}</li>)}</ul></details><details id="privacy-policy"><summary>{titles[2][i]} <span aria-hidden="true">＋</span></summary><ul className="policy-list">{privacy.map((r,n)=>r[i].match(/[^.!?。！？]+[.!?。！？]+|[^.!?。！？]+$/g)?.map((sentence,j)=><li key={`${n}-${j}`}>{sentence.trim()}</li>))}</ul><p>Lotus Rental 22 · <a href={`mailto:${BUSINESS_INFO.email}`}>{BUSINESS_INFO.email}</a> · <a href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}`}>{BUSINESS_INFO.phoneDisplay}</a></p></details></section>;
}
export function BookingPolicyNotice({onClose}:{onClose:()=>void}) {
  const i=({en:0,id:1,zh:2,es:3,it:4})[getLanguage()];
  const label=['Rental terms & privacy','Ketentuan sewa & privasi','租赁条款与隐私','Condiciones y privacidad','Condizioni e privacy'][i];
  const timing=['Request extensions at least 8 hours ahead. Collection ends at 19:00; later collection is next morning with one extra day charged. Garage return until 21:00 by confirmation.','Ajukan perpanjangan minimal 8 jam sebelumnya. Penjemputan sampai 19:00; setelah itu dijemput besok pagi dengan biaya tambahan satu hari. Kembali ke garasi hingga 21:00 dengan konfirmasi.','延期请至少提前8小时申请。19:00后收车安排次日上午并加收一天。提前确认可在21:00前到车库还车。','Solicita extensiones con 8 horas de antelación. Recogida hasta las 19:00; después, a la mañana siguiente con un día extra. Garaje hasta las 21:00 con confirmación.','Proroghe con almeno 8 ore di preavviso. Ritiro fino alle 19:00; dopo, la mattina seguente con un giorno extra. Garage fino alle 21:00 con conferma.'][i];
  return <p className="booking-policy-note">{rows[0][i]} {rows[2][i]} {timing} <a href="#rental-policies" onClick={()=>{onClose();setTimeout(()=>document.getElementById('rental-policies')?.scrollIntoView({block:'start'}),0);}}>{label}</a></p>;
}
