"use client"

import Navbar from "@/components/navbar"
import ProductsTable from "@/components/products-table"
import { useState } from "react"

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <Navbar darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
      <ProductsTable darkMode={darkMode} />
    </div>
  )
}
