"use client";

import { useEffect, useSyncExternalStore } from "react";

const THEME_STORAGE_KEY = "theme";
const DARK_MODE_CLASS = "dark-mode";
const THEME_CHANGE_EVENT = "theme-change";

/**
 * Membaca preferensi theme yang tersimpan di localStorage.
 *
 * Fungsi ini digunakan oleh useSyncExternalStore sebagai pembaca snapshot
 * di sisi browser. Hasilnya menjadi sumber nilai utama untuk menentukan
 * apakah aplikasi sedang memakai dark mode atau light mode.
 * 
 * getSnapshot: Fungsi untuk membaca nilai data saat ini dari toko eksternal. 
 * Nilai yang dikembalikan harus bersifat imut (immutable).
 */
function getStoredDarkMode() {
  return localStorage.getItem(THEME_STORAGE_KEY) === DARK_MODE_CLASS;
}

/**
 * Memberikan nilai default saat komponen dirender di server.
 *
 * Server tidak memiliki akses ke window atau localStorage, sehingga fungsi
 * ini mengembalikan false agar proses SSR dan hydration Next.js tetap aman.
 * Fungsi ini tidak mengubah theme secara langsung, tetapi menjaga proses awal
 * render tetap stabil sebelum preferensi theme dibaca di browser.
 * 
 * getServerSnapshot (Opsional): Fungsi untuk mengambil data awal saat aplikasi 
 * dijalankan via Server-Side Rendering (SSR)
 */
function getServerSnapshot() {
  return false;
}

/**
 * Mendaftarkan listener untuk mengetahui kapan preferensi theme berubah.
 *
 * Event "storage" menangkap perubahan localStorage dari tab/window lain,
 * sedangkan THEME_CHANGE_EVENT menangkap perubahan theme dari tab yang sama.
 * Dengan begitu, ThemeSwitcher bisa re-render dan membaca ulang theme terbaru.
 * 
 * subscribe: Fungsi untuk mendaftarkan callback ke toko eksternal. 
 * Harus mengembalikan fungsi pembersih (cleanup) untuk membatalkan langganan.
 */
function subscribeToThemeChange(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_CHANGE_EVENT, callback);

  // Kembalikan cleanup function untuk menghapus event listener
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
  };
}

/**
 * Menyimpan atau menghapus preferensi dark mode di localStorage.
 *
 * Jika isDarkMode bernilai true, class dark-mode disimpan sebagai preferensi.
 * Jika false, preferensi dihapus sehingga aplikasi kembali ke theme default.
 * Setelah itu custom event dikirim agar useSyncExternalStore membaca ulang
 * nilai theme dan memperbarui tampilan aplikasi.
 */
function saveDarkModePreference(isDarkMode: boolean) {
  if (isDarkMode) {
    localStorage.setItem(THEME_STORAGE_KEY, DARK_MODE_CLASS);
  } else {
    localStorage.removeItem(THEME_STORAGE_KEY);
  }

  // Kirim custom event untuk memberi tahu semua listener bahwa theme telah berubah
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

/**
 * Komponen tombol untuk mengganti theme aplikasi.
 *
 * Komponen ini membaca status dark mode dari localStorage melalui
 * useSyncExternalStore. Saat user menekan tombol, preferensi theme diperbarui,
 * lalu useEffect menambahkan atau menghapus class dark-mode pada body.
 * Class body.dark-mode tersebut digunakan oleh globals.css untuk mengubah
 * warna aplikasi menjadi mode gelap atau kembali ke mode terang.
 */
/**
 * useSyncExternalStore adalah React Hook yang digunakan untuk membaca dan berlangganan 
 * (subscribe) pada sumber data di luar ekosistem React. Hook ini diperkenalkan sejak React 18 
 * untuk menggantikan pola penulisan useEffect + useState saat mengambil data eksternal
 */
function ThemeSwitcher() {
  const isDarkMode = useSyncExternalStore(
    subscribeToThemeChange,
    getStoredDarkMode,
    getServerSnapshot,
  );

  useEffect(() => {
    document.body.classList.toggle(DARK_MODE_CLASS, isDarkMode);
  }, [isDarkMode]);

  return (
    <button
      id="theme-switcher"
      type="button"
      className="theme-switcher"
      aria-pressed={isDarkMode}
      aria-label={isDarkMode ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      onClick={() => saveDarkModePreference(!isDarkMode)}
    >
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}

export default ThemeSwitcher;