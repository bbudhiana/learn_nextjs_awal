"use client"
import { use, useEffect, useState } from "react"

function ThemeSwitcher() {
  const [theme, setTheme] = useState(false);


  useEffect(() => {    
    const storedTheme = localStorage.getItem("theme")
    
    if (storedTheme==="dark-mode") {
      setTheme(true);
      document.body.classList.add('dark-mode');
    }
  }, []) //[] agar hanya dijalankan sekali saat komponen pertama kali dirender


  //useEffect tanpa dependency array akan dijalankan setiap kali komponen dirender, 
  //sehingga setiap kali state theme berubah, efek ini akan dijalankan dan 
  //memperbarui kelas pada body serta menyimpan preferensi tema ke localStorage.
  useEffect(() => {
    
    if (theme) {
      document.body.classList.add('dark-mode');
      localStorage.setItem("theme", "dark-mode");
    } else {
        localStorage.setItem("theme", '');
        document.body.classList.remove('dark-mode');
    }
  })
  return (
    <button id="theme-switcher" className="theme-switcher" onClick={() => setTheme(!theme)}>
      Theme
    </button>
  )
}

export default ThemeSwitcher