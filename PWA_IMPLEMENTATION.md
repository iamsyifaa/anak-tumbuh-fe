# PWA Dashboard Siswa - anaktumbuh.id

Implementasi PWA tahap frontend mengikuti dokumen konsep PWA project. Tahap ini **belum** mengirim data offline ke Laravel.

## Sudah dikerjakan

- Web App Manifest di `app/manifest.ts`
- Icon PWA di `public/icons/`
- Service Worker di `public/sw.js`
- Precache halaman dashboard siswa dan tujuh halaman habit
- Runtime cache untuk JavaScript, CSS, font, image, dan navigasi yang berhasil dimuat
- Offline fallback ke `/offline`
- Offline detection dengan banner `sticky` sehingga tidak menutupi navbar
- IndexedDB `anaktumbuh-pwa` dengan object store `habitSubmissions`
- IndexedDB cache untuk dashboard dan form habit yang pernah berhasil dimuat online
- Submit habit saat offline disimpan dengan `status: pending`
- Dashboard menandai habit pending sebagai sudah tercatat di perangkat
- Habit yang sudah tercatat dikunci per tanggal; tanggal berikutnya dapat diisi lagi
- Pencegahan submit ulang habit yang sama pada tanggal yang sama dari IndexedDB

## Yang sengaja belum dikerjakan

- IndexedDB pending -> API Laravel
- Retry/background sync
- `pending -> synced`
- Endpoint/method request Laravel
- Format payload final
- Authentication request sync
- Response success/error final dari Backend
- Duplicate handling dan aturan update dari Backend

## Cara menjalankan

```bash
cd anak-tumbuh-fe
npm install
npm run dev
```

Untuk pengujian offline yang lebih representatif, gunakan production mode:

```bash
npm run build
npm run start
```

Buka aplikasi saat online terlebih dahulu. Masuk ke dashboard siswa dan buka form habit yang ingin dipakai offline. Setelah asset dan form pernah dimuat, matikan Wi-Fi/data seluler lalu refresh atau buka ulang route tersebut.

## Kenapa submit offline tidak perlu menunggu Laravel?

Penyimpanan lokal dan status `pending` memang merupakan pekerjaan frontend tahap awal. Laravel baru dibutuhkan saat tahap sinkronisasi `IndexedDB -> API Laravel -> synced`, setelah kontrak API Backend tersedia.
