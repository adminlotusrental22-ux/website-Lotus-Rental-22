# Catatan domain dan website Lotus Rental 22

Diperbarui: 20 November 2026.

Website tetap memakai satu repositori GitHub dan satu proyek Cloudflare Pages. Pemasangan domain baru tidak membuat repositori atau website baru.

## Alamat dan akun

| Bagian | Data |
| --- | --- |
| Alamat utama untuk promosi | https://lotusrental22.com |
| Alamat dengan www | https://www.lotusrental22.com |
| Alamat bawaan Cloudflare | https://lotusrental22.pages.dev |
| Repositori GitHub | https://github.com/adminlotusrental22-ux/website-Lotus-Rental-22 |
| Cabang yang diterbitkan | main |
| Proyek Cloudflare Pages | lotusrental22 |
| Akun Cloudflare dan email pengelolaan domain | admin.lotusrental22@gmail.com |
| Penyedia pembelian dan perpanjangan domain | Hostinger |
| Nameserver pertama | alaric.ns.cloudflare.com |
| Nameserver kedua | jule.ns.cloudflare.com |

## Cara kerja pembaruan

Perubahan website disimpan ke repositori yang sama, lalu dikirim ke cabang main. Cloudflare membangun dan menerbitkan pembaruan otomatis. Hasil yang sama tersedia melalui domain baru dan alamat pages.dev. Tidak perlu mengunggah website ke Hostinger atau membeli hosting tambahan.

Hostinger mengurus kepemilikan, pembayaran, dan perpanjangan domain. Cloudflare mengurus DNS, penerbitan website, dan HTTPS.

## Status alamat lama

Pada 20 November 2026, domain utama, www, dan pages.dev sama-sama berhasil dibuka melalui HTTPS dan menyajikan versi website yang sama.

Alamat pages.dev tidak dihapus dan belum diberi pengalihan otomatis ke domain utama. www juga masih menyajikan website langsung, bukan pengalihan ke alamat tanpa www. Gunakan lotusrental22.com untuk promosi dan tautan baru. Proyek Pages jangan dihapus karena proyek tersebut juga melayani domain baru.

Pengalihan alamat lama dan www ke alamat utama dapat diatur kemudian bila diperlukan. Pengalihan belum dibuat saat pemasangan domain ini.

## Perpanjangan domain

- Domain dibeli pada 20 November 2026 untuk dua tahun.
- Tanggal berakhir yang ditampilkan Hostinger: 20 November 2028. Selalu periksa kembali tanggal di akun saat memperpanjang.
- Perpanjangan otomatis saat terakhir diperiksa: nonaktif. Tidak diubah saat pemasangan website.
- Tahun 2027: periksa akses akun, email pemberitahuan, dan tanggal berakhir. Berdasarkan masa berlaku saat ini, belum jatuh tempo perpanjangan pada tahun tersebut.
- Sebelum November 2028: perpanjang melalui akun Hostinger. Harga mengikuti tagihan Hostinger saat itu.
- Tidak ada pengingat otomatis yang dibuat melalui chat ini.

## Jika domain tidak bisa dibuka

1. Buka https://lotusrental22.pages.dev. Jika alamat ini normal tetapi domain baru bermasalah, periksa domain, DNS, atau HTTPS.
2. Di Hostinger, pastikan domain masih aktif dan nameserver tetap alaric.ns.cloudflare.com serta jule.ns.cloudflare.com. Jangan mengembalikan nameserver ke bawaan Hostinger tanpa rencana pemindahan DNS.
3. Di Cloudflare, buka domain lotusrental22.com lalu DNS. Alamat utama (@) dan www harus mengarah melalui CNAME ke lotusrental22.pages.dev. Jangan menggantinya dengan alamat parkir Hostinger yang lama, 2.57.91.91.
4. Di Cloudflare, buka Workers & Pages > lotusrental22 > Custom domains. Periksa status lotusrental22.com dan www.lotusrental22.com serta status sertifikatnya.
5. Jika pages.dev juga bermasalah, buka Deployments pada proyek yang sama. Periksa hasil penerbitan terbaru dan koneksi GitHub. Gunakan versi penerbitan sebelumnya bila pembaruan terakhir menyebabkan masalah.
6. Setelah perubahan DNS, periksa ulang setelah penyebaran pengaturan selesai. Jangan mematikan HTTPS atau perlindungan akun untuk mengatasi kesalahan domain.

## Catatan pemasangan

Nameserver Hostinger sebelumnya adalah horizon.dns-parking.com dan orbit.dns-parking.com. Catatan DNS sebelumnya hanya alamat parkir (@ ke 2.57.91.91) dan CNAME www ke lotusrental22.com; tidak ada catatan MX email domain saat diperiksa. Cloudflare mengganti catatan website dengan target proyek Pages saat aktivasi domain.

Email admin.lotusrental22@gmail.com tetap layanan Gmail. Pemasangan domain tidak otomatis membuat kotak email seperti admin@lotusrental22.com.

Jangan menyimpan kata sandi, kode pemulihan, atau token akses di repositori. Simpan informasi tersebut di tempat pribadi yang aman.
