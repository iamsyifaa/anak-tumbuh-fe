# PWA Dashboard Siswa - anaktumbuh.id

Implementasi tahap frontend mengikuti dokumen konsep PWA project. Tahap ini **belum** mengirim data offline ke Laravel.

## Yang sudah dikerjakan

- Web App Manifest di `app/manifest.ts`
- Icon PWA `public/icons/icon-192.png` dan `public/icons/icon-512.png`
- Service Worker di `public/sw.js`
- Precache route/resource utama dashboard siswa
- Runtime cache untuk JavaScript, CSS, font, image, dan navigasi yang sudah berhasil dimuat
- Offline detection + banner status koneksi
- IndexedDB `anaktumbuh-pwa` dengan object store `habitSubmissions`
- Penyimpanan submit habit saat offline dengan `status: pending`
- Dashboard menandai habit pending sebagai sudah tercatat di perangkat
- Pencegahan submit ulang habit yang sama pada tanggal yang sama dari IndexedDB
- Halaman fallback `app/offline/page.tsx`

## Yang sengaja belum dikerjakan

- IndexedDB -> API Laravel
- Retry/background sync
- `pending -> synced`
- Endpoint/method request Laravel
- Format payload final
- Authentication untuk request sync
- Response success/error final dari Backend
- Duplicate handling dan aturan update dari Backend

## Cara menjalankan

### 1. Masuk ke folder project

```bash
cd anak-tumbuh-fe
```

### 2. Install dependency

```bash
npm install
```

### 3. Jalankan development

```bash
npm run dev
```

Lalu buka `http://localhost:3000`.

### 4. Demo PWA yang disarankan

Untuk menguji cache/offline dengan lebih stabil, gunakan production mode:

```bash
npm run build
npm run start
```

Buka `http://localhost:3000` saat online terlebih dahulu, masuk ke dashboard siswa, lalu matikan Wi-Fi/data dan refresh halaman yang sudah pernah dibuka.

Di Chrome/Edge, install PWA dapat muncul sebagai opsi **Install anaktumbuh.id** atau melalui menu instal aplikasi browser.

## Catatan penting

Service Worker berjalan pada HTTPS atau `localhost`. Cache bersifat per-device. Data pending berada di IndexedDB browser/device siswa, bukan di server. Sinkronisasi belum berjalan sampai spesifikasi API Laravel dari Backend tersedia.
