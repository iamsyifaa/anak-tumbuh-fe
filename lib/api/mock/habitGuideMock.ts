import { HabitId } from "@/lib/types/studentDashboard";

// Konten dummy — meniru hasil isian wali kelas lewat Rich Text Editor di
// dashboard mereka (field backend: panduan_teks). Begitu backend siap,
// file ini tidak lagi dipakai; StudentHabitFormPage tinggal merender
// guideHtml yang datang dari response API asli.
export const HABIT_GUIDE_HTML: Record<HabitId, string> = {
  "wake-up": `
    <p>Memulai hari lebih awal melatih kedisiplinan dan memberimu waktu ekstra untuk bersiap tanpa terburu-buru.</p>
    <h4>Cara Mengisi Waktu Bangun</h4>
    <ul>
      <li><strong>Sebelum pukul 04.00:</strong> Pilih opsi ini jika kamu rutin bangun sangat awal, misalnya untuk keperluan ibadah malam atau belajar ekstra sebelum subuh.</li>
      <li><strong>Pukul 04.00–05.00:</strong> Pilih opsi ini jika kamu bangun tepat waktu pada rentang waktu subuh.</li>
      <li><strong>Pukul 05.00–06.00:</strong> Pilih opsi ini jika kamu bangun menjelang jam persiapan rutin untuk berangkat sekolah.</li>
      <li><strong>Di atas pukul 06.00:</strong> Pilih opsi ini jika kamu terlelap dan bangun melewati batas waktu ideal.</li>
    </ul>
    <h4>Cara Mengisi Tingkat Inisiatif</h4>
    <ul>
      <li><strong>Mandiri:</strong> Kamu bangun sendiri (menggunakan alarm sendiri atau terbiasa bangun otomatis).</li>
      <li><strong>Disuruh:</strong> Kamu harus dibangunkan berkali-kali oleh orang tua atau anggota keluarga lain.</li>
    </ul>
  `,
  prayer: `
    <p>Menjaga ibadah tepat waktu adalah bentuk rasa syukur dan tanggung jawab diri.</p>
    <h4>Cara Mengisi Pelaksanaan</h4>
    <ul>
      <li><strong>100 Persen Dilaksanakan:</strong> Jika seluruh rangkaian ibadah wajib hari ini dikerjakan secara lengkap tanpa ada yang terlewat.</li>
      <li><strong>75–100 Persen:</strong> Jika ibadah dominan terlaksana, namun ada sebagian kecil (satu waktu) yang tertinggal.</li>
      <li><strong>50–75 Persen:</strong> Jika hanya sekitar setengah dari kewajiban ibadah yang berhasil kamu laksanakan hari ini.</li>
      <li><strong>Di bawah 50 Persen:</strong> Jika sebagian besar rutinitas ibadah wajib pada hari ini ditinggalkan.</li>
    </ul>
    <h4>Cara Mengisi Tingkat Inisiatif</h4>
    <ul>
      <li><strong>Mandiri:</strong> Kamu beribadah tepat waktu atas kesadaran sendiri tanpa perlu diingatkan.</li>
      <li><strong>Disuruh:</strong> Kamu baru beribadah setelah disuruh atau diingatkan oleh orang tua.</li>
    </ul>
  `,
  reading: `
    <p>Mengulang pelajaran atau membaca hal baru di rumah akan membuatmu semakin paham dan siap menghadapi tugas-tugas di kelas.</p>
    <h4>Cara Mengisi Durasi</h4>
    <ul>
      <li><strong>Di atas 1 jam:</strong> Jika kamu fokus belajar, mengerjakan tugas mandiri, atau membaca literatur lebih dari 60 menit.</li>
      <li><strong>45 menit sampai 1 jam:</strong> Jika durasi aktivitas belajarmu di rumah lumayan panjang dan hampir mendekati satu jam penuh.</li>
      <li><strong>15 menit sampai 45 menit:</strong> Jika kamu menyempatkan waktu sebentar untuk mengulas materi pelajaran hari ini.</li>
      <li><strong>Di bawah 15 menit:</strong> Jika hari ini kamu hampir tidak membuka buku pelajaran sama sekali.</li>
    </ul>
    <h4>Cara Mengisi Tingkat Inisiatif</h4>
    <ul>
      <li><strong>Mandiri:</strong> Kamu membuka buku, mengerjakan PR, atau mengulang pelajaran atas kemauan sendiri.</li>
      <li><strong>Disuruh:</strong> Orang tua harus memintamu belajar terlebih dahulu barulah kamu mau membuka buku.</li>
    </ul>
  `,
  sports: `
    <p>Bergerak aktif menjaga kebugaran fisik, memperkuat tubuh, dan membuatmu tidak mudah lelah atau mengantuk.</p>
    <h4>Cara Mengisi Durasi</h4>
    <ul>
      <li><strong>Di atas 1 jam:</strong> Jika kamu melakukan aktivitas fisik yang intensif (seperti latihan bela diri, basket, sepak bola) lebih dari satu jam.</li>
      <li><strong>45 menit sampai 1 jam:</strong> Jika kamu berolahraga dengan durasi standar hingga mengeluarkan keringat.</li>
      <li><strong>15 menit sampai 45 menit:</strong> Jika kamu sekadar melakukan pemanasan ringan, peregangan otot, atau jalan santai.</li>
      <li><strong>Di bawah 15 menit:</strong> Jika hari ini kamu tidak melakukan aktivitas fisik atau gerakan tubuh yang berarti.</li>
    </ul>
    <h4>Cara Mengisi Tingkat Inisiatif</h4>
    <ul>
      <li><strong>Mandiri:</strong> Kamu berolahraga karena memang ingin sehat dan berinisiatif bergerak aktif.</li>
      <li><strong>Disuruh:</strong> Kamu baru mau berolahraga setelah diajak atau disuruh oleh orang lain (orang tua/guru/teman).</li>
    </ul>
  `,
  community: `
    <p>Mengukur tingkat inisiatif dan kepedulianmu terhadap kerapian pribadi, keluarga, dan lingkungan pertemanan.</p>
    <h4>Cara Mengisi Aktivitas (centang semua yang sesuai)</h4>
    <ul>
      <li><strong>Membereskan tempat tidur dan kebersihan rumah:</strong> Centang jika kamu berinisiatif merapikan kamar atau membersihkan area rumah.</li>
      <li><strong>Membantu pekerjaan orang tua:</strong> Centang jika kamu turun tangan membantu tugas rumah (mencuci piring, menyapu, dsb).</li>
      <li><strong>Bermain bersama teman sebaya:</strong> Centang jika kamu meluangkan waktu bersosialisasi dan berinteraksi secara positif dengan teman-temanmu.</li>
      <li><strong>Kurang bermasyarakat:</strong> Penting — hanya centang opsi ini jika hari ini kamu sama sekali tidak melakukan tiga aktivitas di atas.</li>
    </ul>
    <h4>Cara Mengisi Tingkat Inisiatif</h4>
    <ul>
      <li><strong>Mandiri:</strong> Kamu secara spontan merapikan tempat tidur, membantu orang tua, atau bersosialisasi tanpa diperintah.</li>
      <li><strong>Disuruh:</strong> Kamu melakukan aktivitas tersebut hanya jika diminta atau diperintahkan oleh orang tua.</li>
    </ul>
  `,
  "healthy-food": `
    <p>Asupan nutrisi yang seimbang adalah bahan bakar utama bagi daya pikir otak dan pertumbuhan fisikmu.</p>
    <h4>Cara Mengisi Kategori Makanan</h4>
    <ul>
      <li><strong>Sangat beragam:</strong> Jika piringmu berisi komposisi lengkap (makanan pokok, sayuran, lauk pauk/protein, dan buah).</li>
      <li><strong>Beragam:</strong> Jika makananmu mengandung variasi nutrisi yang cukup baik (misalnya ada sayur dan lauk pauk).</li>
      <li><strong>Kurang beragam:</strong> Jika kamu hanya mengonsumsi satu jenis lauk tanpa tambahan sayuran.</li>
      <li><strong>Tidak beragam:</strong> Jika seharian kamu hanya mengonsumsi makanan instan atau camilan kurang bernutrisi.</li>
    </ul>
    <h4>Cara Mengisi Tingkat Inisiatif</h4>
    <ul>
      <li><strong>Mandiri (mudah makan):</strong> Kamu bersedia makan tepat waktu atas kesadaran dan kemauan sendiri.</li>
      <li><strong>Disuruh (susah makan):</strong> Orang tua atau wali harus mengingatkan atau membujuk berkali-kali agar kamu mau makan.</li>
    </ul>
  `,
  "early-sleep": `
    <p>Istirahat yang cukup adalah kunci agar keesokan paginya kamu bisa bangun dengan tubuh segar dan siap menyerap ilmu baru.</p>
    <h4>Cara Mengisi Waktu Tidur</h4>
    <ul>
      <li><strong>Sebelum jam 20.00:</strong> Jika malam ini kamu beristirahat dan tidur sangat awal.</li>
      <li><strong>Jam 20.00–21.00:</strong> Jika kamu tidur pada rentang waktu istirahat yang sangat ideal untuk pelajar.</li>
      <li><strong>Jam 21.00–22.00:</strong> Jika kamu baru mulai tidur sedikit larut setelah menyelesaikan berbagai aktivitas malam hari.</li>
      <li><strong>Di atas jam 22.00:</strong> Jika kamu begadang dan waktu tidurmu melewati batas ideal istirahat.</li>
    </ul>
    <h4>Cara Mengisi Tingkat Inisiatif</h4>
    <ul>
      <li><strong>Mandiri:</strong> Kamu mematikan perangkat elektronik dan beranjak tidur dengan sendirinya saat malam tiba.</li>
      <li><strong>Disuruh:</strong> Kamu baru mau tidur setelah dimarahi atau disuruh berulang kali oleh orang tua.</li>
    </ul>
  `,
};
