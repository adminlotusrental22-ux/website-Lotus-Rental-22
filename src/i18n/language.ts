import { translateEuropean, europeanMessage } from './europeanTranslations';
import { translations } from './translations';
export type Language = 'en' | 'id' | 'zh' | 'es' | 'it';
export function getLanguage(): Language {
  try { const value=localStorage.getItem('lotus-language'); return value==='id'||value==='zh'||value==='es'||value==='it'?value:'en'; } catch { return 'en'; }
}
export function translate(text:string, language:Language):string {
  if(language==='en')return text;
  const bookingLabels:Record<string,string[]>={
    'Return to Lotus garage':['Kembali ke garasi Lotus','归还至Lotus车库','Devolver en el garaje Lotus','Restituire al garage Lotus'],
    'Another location in Labuan Bajo':['Lokasi lain di Labuan Bajo','拉布安巴焦其他地点','Otro lugar en Labuan Bajo','Altro luogo a Labuan Bajo'],
    'Return address':['Alamat pengembalian','还车地址','Dirección de devolución','Indirizzo di restituzione'],
    'Hotel name or full return address':['Nama hotel atau alamat lengkap pengembalian','酒店名称或完整还车地址','Nombre del hotel o dirección completa','Nome hotel o indirizzo completo'],
    'Please enter the hotel name or full return address.':['Isi nama hotel atau alamat lengkap pengembalian.','请输入酒店名称或完整还车地址。','Introduce el hotel o la dirección completa de devolución.','Inserisci hotel o indirizzo completo di restituzione.'],
  };
  if(bookingLabels[text.trim()])return bookingLabels[text.trim()][{id:0,zh:1,es:2,it:3}[language]];
  const verification='At our in-person meeting, we photograph your passport or national ID and document the scooter handover for verification. Flight tickets and hotel booking confirmation may also be required. Your original passport stays with you.';
  const verificationTranslations={id:'Saat bertemu langsung, kami memfoto paspor atau KTP dan mendokumentasikan serah terima motor untuk verifikasi. Tiket penerbangan dan konfirmasi hotel mungkin diperlukan. Paspor asli tetap Anda pegang.',zh:'当面交车时，我们拍摄护照或身份证及车辆交接记录用于核验。必要时可能要求机票和酒店预订确认。护照原件由您保管。',es:'Al reunirnos fotografiamos tu pasaporte o documento de identidad y documentamos la entrega para la verificación. Podemos solicitar billetes de avión y reserva de hotel. Conservas tu pasaporte original.',it:'All’incontro fotografiamo passaporto o documento d’identità e documentiamo la consegna per la verifica. Potrebbero servire biglietti aerei e prenotazione dell’hotel. Il passaporto originale resta a te.'};
  if(text.trim()===verification)return text.replace(verification,verificationTranslations[language]);
  if(text.trim()===verification+' No security deposit is required.')return verificationTranslations[language]+({id:' Tidak ada deposit.',zh:' 无需押金。',es:' No se requiere depósito.',it:' Non è richiesto un deposito.'})[language];
  if(language==='es'||language==='it')return translateEuropean(text,language);
  const trimmed=text.trim();
  if(!trimmed)return text;
  const index=language==='id'?0:1;
  const found=translations[trimmed];
  if(found)return text.replace(trimmed,found[index]);
  const rules: [RegExp,(match:RegExpMatchArray)=>string][] = [
    [/^(\d+) days?$/,m=>language==='id'?`${m[1]} hari`:`${m[1]} 天`],
    [/^View (.+) details$/,m=>language==='id'?`Detail ${m[1]}`:`查看 ${m[1]} 详情`],
    [/^Book (.+)$/,m=>language==='id'?`Sewa ${m[1]}`:`预订 ${m[1]}`],
    [/^Remove scooter (\d+)$/,m=>language==='id'?`Hapus motor ${m[1]}`:`移除摩托车 ${m[1]}`],
    [/^Scooter (\d+)$/,m=>language==='id'?`Motor ${m[1]}`:`摩托车 ${m[1]}`],
  ];
  for(const [regex,replace] of rules){const match=trimmed.match(regex);if(match)return text.replace(trimmed,replace(match));}
  const small:Record<string,[string,string]>={'Scooter':['Motor','摩托车'],'scooters':['motor','辆摩托车'],'day':['hari','天'],'days':['hari','天'],'/day':['/hari','/天'],'Rental ·':['Sewa ·','租金 ·'],'scooter(s) ×':['motor ×','辆 ×'],'day(s)':['hari','天'],'· Rp 20k / scooter':[' · Rp 20rb / motor',' · 每辆 Rp 20,000']};
  if(small[trimmed])return text.replace(trimmed,small[trimmed][index]);
  return text.replace(/\/day/g,language==='id'?'/hari':'/天');
}
export function translateMessage(message:string,language:Language):string {
  if(language==='en')return message;
  if(language==='es'||language==='it')return europeanMessage(message,language);
  const zh=language==='zh';
  const pairs:[string,string,string][]=[
    ["Hi Lotus Rental 22! I'd like to check scooter availability.",'Halo Lotus Rental 22! Saya ingin cek ketersediaan motor.','你好 Lotus Rental 22！我想查询摩托车是否可租。'],
    ["Hi Lotus Rental 22! I'd like to check availability.",'Halo Lotus Rental 22! Saya ingin cek ketersediaan motor.','你好 Lotus Rental 22！我想查询可租车辆。'],
    ['Pickup date & time (WITA):','Tanggal & jam pengambilan (WITA):','取车日期及时间（WITA）：'],
    ['Return date & time (WITA):','Tanggal & jam pengembalian (WITA):','还车日期及时间（WITA）：'],
    ['Scooter model & quantity:','Model & jumlah motor:','车型及数量：'],
    ['Pickup / delivery location:','Lokasi pengambilan / pengantaran:','取车 / 配送地点：'],
    ['Return location:','Lokasi pengembalian:','还车地点：'],
    ['Please confirm availability and the total price. Thank you!','Mohon konfirmasi ketersediaan dan total biayanya. Terima kasih!','请确认车辆及总价，谢谢！'],
    ['Name: ','Nama: ','姓名：'],['Pickup: ','Pengambilan: ','取车：'],['Return: ','Pengembalian: ','还车：'],['Duration: ','Durasi: ','租期：'],
    ['Pickup / delivery: ','Pengambilan / pengantaran: ','取车 / 配送：'],['Location details: ','Detail lokasi: ','地点详情：'],
    ['Same as pickup / delivery','Sama dengan pengambilan / pengantaran','与取车 / 配送地点相同'],
    ['Rental: ','Sewa: ','租金：'],['Delivery: ','Pengantaran: ','配送费：'],['Estimate: ','Estimasi: ','预计总额：'],
    ['Payment at handover: Cash or QRIS. No security deposit. My passport stays with me.','Bayar saat serah terima: tunai atau QRIS. Tanpa deposit. Paspor asli tetap saya pegang.','交车时付款：现金或 QRIS。无需押金，护照原件由我保管。'],
    ['Please confirm availability, exact model and final total. Thank you!','Mohon konfirmasi ketersediaan, model, dan total akhir. Terima kasih!','请确认可租车辆、具体车型及最终总额，谢谢！'],
    ['Komodo Airport','Bandara Komodo','科莫多机场'],['Hotel / villa','Hotel / vila','酒店 / 别墅'],['Lotus Rental 22 garage, Wae Mata','Garasi Lotus Rental 22, Wae Mata','Lotus Rental 22 车库，Wae Mata'],['day(s)','hari','天'],
  ];
  return pairs.reduce((value,[from,id,ch])=>value.split(from).join(zh?ch:id),message);
}


export const dateLocale = (language:Language) => ({en:'en-GB',id:'id-ID',zh:'zh-CN',es:'es-ES',it:'it-IT'}[language]);

