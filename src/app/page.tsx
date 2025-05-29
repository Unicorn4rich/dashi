"use client"

import Navbar from "@/components/navbar"
import ProductsTable from "@/components/products-table"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ProductsTable />
    </div>
  )
}
