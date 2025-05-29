"use client"
import Image from "next/image"

import { useState } from "react"
import { MagnifyingGlassIcon, PlusIcon, EllipsisVerticalIcon, ChevronDownIcon } from "@heroicons/react/24/outline"
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react"
import NewProductModal from "./new-product-modal"
import OrderDetailsModal from "./order-details-modal"

interface Product {
  id: string
  name: string
  brand: string
  productId: string
  stock: number
  variants: number
  price: string
  image: string
  selected: boolean
}

interface Order {
  id: string
  orderId: string
  date: string
  customer: string
  payment: "Paid" | "Pending" | "Failed"
  status: "Unfulfilled" | "Fulfilled" | "Cancelled"
  price: string
  selected: boolean
}

export default function ProductsTable() {
  const [selectedFilter, setSelectedFilter] = useState("All Products")
  const [sortBy, setSortBy] = useState("Default")
  const [searchQuery, setSearchQuery] = useState("")
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false)
  const [currentView, setCurrentView] = useState<"products" | "orders">("products")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false)

  const filterOptions = ["All Products", "Active Products", "Draft Products", "Archived Products", "Orders"]
  const sortOptions = ["Default", "Name A-Z", "Name Z-A", "Price Low-High", "Price High-Low", "Stock Low-High"]

  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Men AlRiem Jersey Short-Sleeve Polo Shirt",
      brand: "Uniqlo",
      productId: "10000",
      stock: 50,
      variants: 10,
      price: "$14.90",
      image: "/t1.jfif",
      selected: false,
    },
    {
      id: "2",
      name: "© Novoneyra Text Patch T-Shirt",
      brand: "Zara",
      productId: "10001",
      stock: 120,
      variants: 2,
      price: "$35.90",
      image: "/t2.jfif",
      selected: true,
    },
    {
      id: "3",
      name: "T-shirt with Motif",
      brand: "H&M",
      productId: "10002",
      stock: 26,
      variants: 4,
      price: "$7.99",
      image: "/t3.jfif",
      selected: false,
    },
    {
      id: "4",
      name: "Men Dry Pique Short-Sleeve Polo Shirt",
      brand: "Uniqlo",
      productId: "10003",
      stock: 87,
      variants: 6,
      price: "$50.00",
      image: "/t4.jfif",
      selected: false,
    },
    {
      id: "5",
      name: "Apollinaire Text T-Shirt",
      brand: "Zara",
      productId: "10004",
      stock: 96,
      variants: 11,
      price: "$35.90",
      image: "/t5.jfif",
      selected: true,
    },
    {
      id: "6",
      name: "Organic cotton T-shirt",
      brand: "Mango",
      productId: "10005",
      stock: 32,
      variants: 1,
      price: "$15.99",
      image: "/t6.jfif",
      selected: false,
    },
    {
      id: "7",
      name: "T-shirt with Printed Design",
      brand: "H&M",
      productId: "10006",
      stock: 14,
      variants: 5,
      price: "$12.99",
      image: "/t1.jfif",
      selected: false,
    },
  ])

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      orderId: "#10010",
      date: "17 Nov 2020",
      customer: "Nicolas",
      payment: "Paid",
      status: "Unfulfilled",
      price: "$14.90",
      selected: false,
    },
    {
      id: "2",
      orderId: "#10011",
      date: "15 Oct 2020",
      customer: "Stanley Bryant",
      payment: "Paid",
      status: "Unfulfilled",
      price: "$14.90",
      selected: false,
    },
    {
      id: "3",
      orderId: "#10012",
      date: "04 Feb 2020",
      customer: "Ronald Bennett",
      payment: "Paid",
      status: "Unfulfilled",
      price: "$14.90",
      selected: false,
    },
    {
      id: "4",
      orderId: "#10013",
      date: "01 Sep 2020",
      customer: "Don Lynch",
      payment: "Paid",
      status: "Unfulfilled",
      price: "$14.90",
      selected: false,
    },
    {
      id: "5",
      orderId: "#10014",
      date: "18 Mar 2020",
      customer: "Rosa",
      payment: "Paid",
      status: "Unfulfilled",
      price: "$14.90",
      selected: false,
    },
    {
      id: "6",
      orderId: "#10015",
      date: "16 Nov 2020",
      customer: "Wesley Chambers",
      payment: "Paid",
      status: "Unfulfilled",
      price: "$14.90",
      selected: false,
    },
    {
      id: "7",
      orderId: "#10016",
      date: "04 Nov 2020",
      customer: "Jared Carlson",
      payment: "Paid",
      status: "Unfulfilled",
      price: "$14.90",
      selected: false,
    },
  ])

  const handleSaveProduct = (productData: {
    name: string
    brand: string
    stock?: number
    variants?: number
    price: string
    image?: string
  }) => {
    const newProduct: Product = {
      id: (products.length + 1).toString(),
      name: productData.name,
      brand: productData.brand,
      productId: (10000 + products.length + 1).toString(),
      stock: productData.stock || 0,
      variants: productData.variants || 1,
      price: `$${productData.price}`,
      image: productData.image || "/placeholder.svg",
      selected: false,
    }
    setProducts([...products, newProduct])
  }

  const handleEditProduct = (product: Product) => {
    // You can implement edit functionality here
    console.log("Edit product:", product)
  }

  const handleDuplicateProduct = (product: Product) => {
    const duplicatedProduct: Product = {
      ...product,
      id: (products.length + 1).toString(),
      productId: (10000 + products.length + 1).toString(),
      name: `${product.name} (Copy)`,
      selected: false,
    }
    setProducts([...products, duplicatedProduct])
  }

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((product) => product.id !== productId))
  }

  const toggleProductSelection = (productId: string) => {
    setProducts(
      products.map((product) => (product.id === productId ? { ...product, selected: !product.selected } : product)),
    )
  }

  const toggleOrderSelection = (orderId: string) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, selected: !order.selected } : order,
    )
    setOrders(updatedOrders)

    // Find the selected order and open the details modal
    const selectedOrder = updatedOrders.find((order) => order.id === orderId)
    if (selectedOrder && selectedOrder.selected) {
      setSelectedOrder(selectedOrder)
      setIsOrderDetailsModalOpen(true)
    }
  }

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order)
    setIsOrderDetailsModalOpen(true)
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productId.includes(searchQuery),
  )

  const filteredOrders = orders.filter(
    (order) =>
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.date.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getPaymentBadgeColor = (payment: string) => {
    switch (payment) {
      case "Paid":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Fulfilled":
        return "bg-green-100 text-green-800"
      case "Unfulfilled":
        return "bg-orange-100 text-orange-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value)
    if (value === "Orders") {
      setCurrentView("orders")
    } else {
      setCurrentView("products")
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            {/* Show Filter */}
            <div className="flex items-center space-x-2 border-none">
              <span className="text-sm font-medium text-gray-700">Show:</span>
              <Listbox value={selectedFilter} onChange={handleFilterChange}>
                <div className="relative">
                  <ListboxButton className="relative w-40 cursor-pointer rounded-md py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm transition-colors duration-200 bg-gray-50 text-gray-900 ring-gray-300">
                    <span className="block truncate">{selectedFilter}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </ListboxButton>
                  <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm bg-white">
                    {filterOptions.map((option) => (
                      <ListboxOption
                        key={option}
                        value={option}
                        className="relative cursor-pointer select-none py-2 pl-3 pr-9 transition-colors duration-200 text-gray-900 hover:bg-gray-100"
                      >
                        <span className="block truncate">{option}</span>
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* New Product Button */}
            <button
              onClick={() => setIsNewProductModalOpen(true)}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              New Product
            </button>

            <button className="bg-gray-100 p-2 sm:p-3 md:p-4 rounded-2xl w-fit hover:bg-gray-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                />
              </svg>
            </button>

            {/* Sort By */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>

              <Listbox value={sortBy} onChange={setSortBy}>
                <div className="relative">
                  <ListboxButton className="relative w-32 cursor-pointer rounded-md py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm transition-colors duration-200 bg-gray-50 text-gray-900 ring-gray-300">
                    <span className="block truncate">{sortBy}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </ListboxButton>
                  <ListboxOptions className="absolute right-0 z-10 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm bg-white">
                    {sortOptions.map((option) => (
                      <ListboxOption
                        key={option}
                        value={option}
                        className="relative cursor-pointer select-none py-2 pl-3 pr-9 transition-colors duration-200 text-gray-900 hover:bg-gray-100"
                      >
                        <span className="block truncate">{option}</span>
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>
          </div>
        </div>

        {/* Conditional Content Based on Current View */}
        {currentView === "products" ? (
          /* Products Table */
          <div className="shadow px-2 pt-4 ring-opacity-5 rounded-lg overflow-hidden bg-white">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by Name, Brand, Variant etc..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border rounded-full leading-5 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-100 focus:border-blue-100 sm:text-sm transition-colors duration-200 bg-gray-50 border-gray-100 text-gray-900"
                />
              </div>

              <button className="px-6 py-3 rounded-full text-sm font-medium transition-colors duration-200 border-gray-300 text-gray-700 hover:bg-gray-100 bg-gray-50">
                Action
              </button>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
                      <span className="sr-only">Select</span>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Payment Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Brand
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      #ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Stock
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Var
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Price
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                        <input
                          type="checkbox"
                          checked={product.selected}
                          onChange={() => toggleProductSelection(product.id)}
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <Image
                              className="h-10 w-10 rounded-md object-cover"
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={40}
                              height={40}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.brand}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.productId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.variants}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Menu as="div" className="relative inline-block text-left">
                          <MenuButton className="p-2 rounded-md transition-colors duration-200 text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                            <EllipsisVerticalIcon className="h-5 w-5" />
                          </MenuButton>
                          <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-white">
                            <MenuItem>
                              <button
                                onClick={() => handleEditProduct(product)}
                                className="block px-4 py-2 text-sm transition-colors duration-200 text-gray-700 hover:bg-gray-100"
                              >
                                Edit
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button
                                onClick={() => handleDuplicateProduct(product)}
                                className="block px-4 py-2 text-sm transition-colors duration-200 text-gray-700 hover:bg-gray-100"
                              >
                                Duplicate
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="block px-4 py-2 text-sm transition-colors duration-200 text-red-600 hover:bg-gray-100"
                              >
                                Delete
                              </button>
                            </MenuItem>
                          </MenuItems>
                        </Menu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards for Products */}
            <div className="lg:hidden">
              <div className="space-y-4 p-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="rounded-lg border p-4 transition-colors duration-200 border-gray-200 bg-white"
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={product.selected}
                        onChange={() => toggleProductSelection(product.id)}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <Image
                        className="h-12 w-12 rounded-md object-cover"
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={48}
                        height={48}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-500">
                              {product.brand} • ID: {product.productId}
                            </p>
                          </div>
                          <Menu as="div" className="relative">
                            <MenuButton className="p-1 rounded-md transition-colors duration-200 text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                              <EllipsisVerticalIcon className="h-5 w-5" />
                            </MenuButton>
                            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-white">
                              <MenuItem>
                                <button
                                  onClick={() => handleEditProduct(product)}
                                  className="block px-4 py-2 text-sm transition-colors duration-200 text-gray-700 hover:bg-gray-100"
                                >
                                  Edit
                                </button>
                              </MenuItem>
                              <MenuItem>
                                <button
                                  onClick={() => handleDuplicateProduct(product)}
                                  className="block px-4 py-2 text-sm transition-colors duration-200 text-gray-700 hover:bg-gray-100"
                                >
                                  Duplicate
                                </button>
                              </MenuItem>
                              <MenuItem>
                                <button
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="block px-4 py-2 text-sm transition-colors duration-200 text-red-600 hover:bg-gray-100"
                                >
                                  Delete
                                </button>
                              </MenuItem>
                            </MenuItems>
                          </Menu>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-sm">
                          <div className="flex space-x-4">
                            <span className="text-gray-500">Stock: {product.stock}</span>
                            <span className="text-gray-500">Variants: {product.variants}</span>
                          </div>
                          <span className="font-medium text-gray-900">{product.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Orders Table */
          <div className="shadow ring-1 ring-black ring-opacity-5 rounded-lg overflow-hidden bg-white">
            {/* Desktop Table */}
            <div className="hidden lg:block">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
                      <span className="sr-only">Select</span>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Order
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Payment
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Price
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                        <input
                          type="checkbox"
                          checked={order.selected}
                          onChange={() => toggleOrderSelection(order.id)}
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className="text-sm font-medium text-blue-600 cursor-pointer hover:underline"
                          onClick={() => handleOrderClick(order)}
                        >
                          {order.orderId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentBadgeColor(order.payment)}`}
                        >
                          {order.payment}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Menu as="div" className="relative inline-block text-left">
                          <MenuButton className="p-2 rounded-md transition-colors duration-200 text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                            <EllipsisVerticalIcon className="h-5 w-5" />
                          </MenuButton>
                          <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-white">
                            <MenuItem>
                              <button
                                onClick={() => handleOrderClick(order)}
                                className="block w-full text-left px-4 py-2 text-sm transition-colors duration-200 text-gray-700 hover:bg-gray-100"
                              >
                                View Details
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <a
                                href="#"
                                className="block px-4 py-2 text-sm transition-colors duration-200 text-gray-700 hover:bg-gray-100"
                              >
                                Edit Order
                              </a>
                            </MenuItem>
                            <MenuItem>
                              <a
                                href="#"
                                className="block px-4 py-2 text-sm transition-colors duration-200 text-red-600 hover:bg-gray-100"
                              >
                                Cancel Order
                              </a>
                            </MenuItem>
                          </MenuItems>
                        </Menu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards for Orders */}
            <div className="lg:hidden">
              <div className="space-y-4 p-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-lg border p-4 transition-colors duration-200 border-gray-200 bg-white"
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={order.selected}
                        onChange={() => toggleOrderSelection(order.id)}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <p
                              className="text-sm font-medium text-blue-600 cursor-pointer hover:underline"
                              onClick={() => handleOrderClick(order)}
                            >
                              {order.orderId}
                            </p>
                            <p className="text-sm text-gray-500">
                              {order.date} • {order.customer}
                            </p>
                          </div>
                          <Menu as="div" className="relative">
                            <MenuButton className="p-1 rounded-md transition-colors duration-200 text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                              <EllipsisVerticalIcon className="h-5 w-5" />
                            </MenuButton>
                            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-white">
                              <MenuItem>
                                <button
                                  onClick={() => handleOrderClick(order)}
                                  className="block w-full text-left px-4 py-2 text-sm transition-colors duration-200 text-gray-700 hover:bg-gray-100"
                                >
                                  View Details
                                </button>
                              </MenuItem>
                              <MenuItem>
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm transition-colors duration-200 text-gray-700 hover:bg-gray-100"
                                >
                                  Edit Order
                                </a>
                              </MenuItem>
                              <MenuItem>
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm transition-colors duration-200 text-red-600 hover:bg-gray-100"
                                >
                                  Cancel Order
                                </a>
                              </MenuItem>
                            </MenuItems>
                          </Menu>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex space-x-2">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentBadgeColor(order.payment)}`}
                            >
                              {order.payment}
                            </span>
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(order.status)}`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900">{order.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-700">
            {currentView === "products"
              ? `Showing ${filteredProducts.length} of ${products.length} products`
              : `Showing ${filteredOrders.length} of ${orders.length} orders`}
          </p>
        </div>

        {/* New Product Modal */}
        <NewProductModal
          isOpen={isNewProductModalOpen}
          onClose={() => setIsNewProductModalOpen(false)}
          onSave={handleSaveProduct}
        />

        {/* Order Details Modal */}
        {selectedOrder && (
          <OrderDetailsModal
            isOpen={isOrderDetailsModalOpen}
            onClose={() => setIsOrderDetailsModalOpen(false)}
            order={selectedOrder}
          />
        )}
      </div>
    </div>
  )
}
