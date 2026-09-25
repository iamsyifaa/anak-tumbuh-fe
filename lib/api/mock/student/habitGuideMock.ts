import { HabitId } from "@/lib/types/studentDashboard";

// Konten dummy — meniru hasil isian wali kelas lewat Rich Text Editor di
// dashboard mereka (field backend: panduan_teks). Begitu backend siap,
// file ini tidak lagi dipakai; StudentHabitFormPage tinggal merender
// guideHtml yang datang dari response API asli.
//
// Isi panduan mengikuti indikator terbaru dari menu Guru Wali Kelas.
export const HABIT_GUIDE_HTML: Record<HabitId, string> = {
  "wake-up": `
    <p>Memulai hari lebih awal melatih kedisiplinan dan memberimu waktu ekstra untuk bersiap tanpa terburu-buru.</p>
    <p><strong>Kenapa dihitung dari adzan subuh?</strong> Waktu subuh tiap daerah berbeda. Adzan subuh di Aceh sekitar pukul 05.20 WIB, sedangkan di Surabaya bisa pukul 04.25 WIB. Karena itu, waktu bangunmu dinilai dari adzan subuh di kotamu, bukan dari jam yang sama untuk semua orang.</p>
    <h4>Cara Mengisi Waktu Bangun</h4>
    <ul>
      <li><strong>Sebelum adzan subuh:</strong> Kamu sudah bangun sebelum adzan subuh berkumandang.</li>
      <li><strong>0–30 menit setelah adzan:</strong> Kamu bangun dalam 30 menit pertama setelah adzan subuh.</li>
      <li><strong>31–60 menit setelah adzan:</strong> Kamu bangun antara 31 sampai 60 menit setelah adzan subuh.</li>
      <li><strong>Di atas 60 menit setelah adzan:</strong> Kamu bangun lebih dari satu jam setelah adzan subuh.</li>
    </ul>
    <h4>Cara Mengisi Inisiatif</h4>
    <ul>
      <li><strong>Bangun sendiri:</strong> Kamu bangun atas kemauan sendiri, misalnya dengan alarm sendiri atau terbiasa bangun otomatis.</li>
      <li><strong>Dibangunkan:</strong> Kamu perlu dibangunkan oleh orang tua atau anggota keluarga lain.</li>
    </ul>
  `,
  prayer: `
    <p>Menjaga ibadah tepat waktu adalah bentuk rasa syukur dan tanggung jawab diri.</p>
    <p>Pelaksanaan ibadahmu dibandingkan dengan <strong>target</strong> ibadah yang sudah ditetapkan oleh sekolah atau wali kelasmu.</p>
    <h4>Cara Mengisi Pelaksanaan Ibadah</h4>
    <ul>
      <li><strong>Di atas target:</strong> Ibadahmu hari ini melebihi target yang ditetapkan, misalnya ada ibadah sunnah tambahan.</li>
      <li><strong>Sesuai target:</strong> Ibadahmu hari ini tepat sesuai target yang ditetapkan.</li>
      <li><strong>Sebagian besar:</strong> Sebagian besar ibadah dari target berhasil kamu laksanakan, tetapi belum seluruhnya.</li>
      <li><strong>Sebagian kecil:</strong> Hanya sebagian kecil ibadah dari target yang kamu laksanakan.</li>
    </ul>
    <h4>Cara Mengisi Inisiatif</h4>
    <ul>
      <li><strong>Sadar sendiri:</strong> Kamu beribadah atas kesadaran sendiri tanpa perlu disuruh atau diingatkan.</li>
      <li><strong>Disuruh:</strong> Kamu baru beribadah setelah disuruh atau diingatkan orang lain.</li>
    </ul>
    <p><strong>Ingat:</strong> jika sebagian besar ibadahmu hari ini tidak perlu disuruh, pilih <strong>Sadar sendiri</strong>.</p>
  `,
  reading: `
    <p>Mengulang pelajaran atau membaca hal baru akan membuatmu semakin paham dan siap menghadapi tugas-tugas di kelas.</p>
    <p>Kegiatan belajarmu dibandingkan dengan <strong>target</strong> belajar yang sudah ditetapkan oleh sekolah atau wali kelasmu.</p>
    <h4>Cara Mengisi Pelaksanaan Belajar</h4>
    <ul>
      <li><strong>Di atas target:</strong> Belajarmu hari ini melebihi target, misalnya menambah bacaan atau latihan soal.</li>
      <li><strong>Sesuai target:</strong> Belajarmu hari ini tepat sesuai target yang ditetapkan.</li>
      <li><strong>Sebagian besar:</strong> Sebagian besar kegiatan belajar dari target berhasil kamu lakukan, tetapi belum seluruhnya.</li>
      <li><strong>Sebagian kecil:</strong> Hanya sebagian kecil kegiatan belajar dari target yang kamu lakukan.</li>
    </ul>
    <h4>Cara Mengisi Inisiatif</h4>
    <ul>
      <li><strong>Sadar sendiri:</strong> Kamu belajar atas kemauan sendiri tanpa perlu disuruh.</li>
      <li><strong>Disuruh:</strong> Kamu baru belajar setelah disuruh atau diingatkan orang tua atau orang lain.</li>
    </ul>
    <p><strong>Ingat:</strong> jika sebagian besar kegiatan belajarmu hari ini tidak perlu disuruh, pilih <strong>Sadar sendiri</strong>.</p>
  `,
  "healthy-food": `
    <p>Asupan nutrisi yang seimbang adalah bahan bakar utama bagi daya pikir otak dan pertumbuhan fisikmu.</p>
    <p>Kebiasaan ini juga bisa dipakai saat bulan puasa. Jika sedang berpuasa, nilai makan sahur dan berbukamu.</p>
    <h4>Cara Mengisi Menjaga Makan Sehat Bergizi</h4>
    <ul>
      <li><strong>Sangat dijaga:</strong> Makananmu lengkap dan seimbang (makanan pokok, lauk, sayur, dan buah) dan kamu benar-benar memperhatikannya.</li>
      <li><strong>Dijaga:</strong> Kamu memperhatikan makananmu, misalnya ada sayur atau lauk bergizi, walau belum selalu lengkap.</li>
      <li><strong>Kurang dijaga:</strong> Kamu kurang memperhatikan makananmu, misalnya banyak jajan atau jarang makan sayur.</li>
      <li><strong>Tidak dijaga:</strong> Kamu tidak memperhatikan makananmu sama sekali, misalnya hanya makan makanan instan atau camilan.</li>
    </ul>
    <h4>Cara Mengisi Inisiatif</h4>
    <ul>
      <li><strong>Sadar sendiri:</strong> Kamu memilih dan mau makan makanan sehat atas kesadaran sendiri.</li>
      <li><strong>Disuruh:</strong> Orang tua atau wali harus mengingatkan atau membujukmu agar mau makan makanan sehat.</li>
    </ul>
  `,
  sports: `
    <p>Bergerak aktif menjaga kebugaran fisik, memperkuat tubuh, dan membuatmu tidak mudah lelah atau mengantuk.</p>
    <h4>Cara Mengisi Waktu Olahraga</h4>
    <ul>
      <li><strong>Waktu maksimal:</strong> Waktu olahragamu melebihi waktu yang dianjurkan.</li>
      <li><strong>Waktu optimal:</strong> Waktu olahragamu sesuai dengan waktu yang dianjurkan.</li>
      <li><strong>Waktu cukup:</strong> Kamu berolahraga, tetapi waktunya belum sampai waktu yang dianjurkan.</li>
      <li><strong>Waktu kurang:</strong> Kamu berolahraga hanya sebentar sekali.</li>
    </ul>
    <h4>Cara Mengisi Inisiatif</h4>
    <ul>
      <li><strong>Mandiri:</strong> Kamu berolahraga atas kemauan sendiri.</li>
      <li><strong>Disuruh:</strong> Kamu baru berolahraga setelah diajak atau disuruh orang lain.</li>
    </ul>
    <p><strong>Ingat:</strong> jika hari ini kamu tidak berolahraga sama sekali, bagian Inisiatif tidak perlu diisi.</p>
  `,
  community: `
    <p>Bermasyarakat berarti peduli pada keluarga, teman, dan lingkungan sekitarmu, misalnya membantu orang tua, bermain dan bekerja sama dengan teman, atau ikut kegiatan di lingkungan rumah.</p>
    <h4>Cara Mengisi Keaktifan Bermasyarakat</h4>
    <ul>
      <li><strong>Sangat aktif:</strong> Kamu sangat sering terlibat dan berinteraksi positif dengan keluarga, teman, dan lingkungan.</li>
      <li><strong>Aktif:</strong> Kamu terlibat dan berinteraksi positif dengan keluarga, teman, atau lingkungan.</li>
      <li><strong>Cukup aktif:</strong> Kamu sesekali terlibat, tetapi belum rutin.</li>
      <li><strong>Kurang aktif:</strong> Kamu hampir tidak terlibat dalam kegiatan bersama.</li>
    </ul>
    <h4>Cara Mengisi Inisiatif</h4>
    <ul>
      <li><strong>Mandiri:</strong> Kamu melakukannya atas kemauan sendiri tanpa diminta.</li>
      <li><strong>Disuruh:</strong> Kamu baru melakukannya setelah diminta atau diperintahkan orang lain.</li>
    </ul>
    <p><strong>Ingat:</strong> jika hari ini kamu tidak bermasyarakat sama sekali, bagian Inisiatif tidak perlu diisi.</p>
  `,
  "early-sleep": `
    <p>Istirahat yang cukup adalah kunci agar keesokan paginya kamu bisa bangun dengan tubuh segar dan siap menyerap ilmu baru.</p>
    <p>Pilih jawaban sesuai waktu setempat di kotamu (WIB, WITA, atau WIT).</p>
    <h4>Cara Mengisi Waktu Tidur</h4>
    <ul>
      <li><strong>Di bawah pukul 20.00:</strong> Kamu sudah tidur sebelum pukul 20.00.</li>
      <li><strong>Pukul 20.00–21.00:</strong> Kamu mulai tidur antara pukul 20.00 sampai 21.00.</li>
      <li><strong>Pukul 21.00–22.00:</strong> Kamu mulai tidur antara pukul 21.00 sampai 22.00.</li>
      <li><strong>Di atas pukul 22.00:</strong> Kamu baru tidur setelah pukul 22.00.</li>
    </ul>
    <h4>Cara Mengisi Inisiatif</h4>
    <ul>
      <li><strong>Tidur sendiri:</strong> Kamu beranjak tidur atas kemauan sendiri saat waktunya tiba.</li>
      <li><strong>Disuruh:</strong> Kamu baru tidur setelah disuruh atau diingatkan orang tua.</li>
    </ul>
  `,
};
