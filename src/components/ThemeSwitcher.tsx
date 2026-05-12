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