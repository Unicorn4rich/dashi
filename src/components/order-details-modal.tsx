"use client"

import type React from "react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ArrowLeftIcon, ChevronDownIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"

interface Order {
  id: string
  orderId: string
  date: string
  customer: string
  payment: "Paid" | "Pending" | "Failed"
  status: "Unfulfilled" | "Fulfilled" | "Cancelled"
  price: string
}

interface OrderDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  order: Order
}

export default function OrderDetailsModal({ isOpen, onClose }: OrderDetailsModalProps) {
  const [fulfillmentOption, setFulfillmentOption] = useState("Standard")
  const fulfillmentOptions = ["Standard", "Express", "Same-day"]
  const [listboxOpen, setListboxOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest("[data-dropdown]")) {
        setListboxOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      document.body.style.overflow = "hidden"
    } else {
      setIsVisible(false)
      setTimeout(() => {
        document.body.style.overflow = "unset"
      }, 300) // Match the transition duration
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="relative z-50">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleBackdropClick}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-0 sm:p-2">
          <div
            className={`w-full sm:w-[95%] max-w-4xl max-h-[100vh] sm:max-h-[90vh] transform overflow-auto sm:overflow-hidden sm:rounded-lg transition-all duration-300 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            } bg-white text-gray-900`}
          >
            {/* Header - Fixed at top */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-white">
              <div className="flex items-center">
                <button
                  onClick={onClose}
                  className="p-1 rounded-full mr-1 transition-colors duration-200 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                </button>
                <span className="text-sm font-medium">Orders</span>
              </div>
              <div className="flex items-center space-x-1">
                <button className="hidden xs:inline-block px-2 py-1 text-xs sm:text-sm font-medium rounded-md border transition-colors duration-200 border-gray-300 text-gray-700 hover:bg-gray-50">
                  Refund items
                </button>
                <button className="px-2 py-1 text-xs sm:text-sm font-medium rounded-md border transition-colors duration-200 border-gray-300 text-gray-700 hover:bg-gray-50">
                  {window.innerWidth < 400 ? "Actions" : "More actions"}
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col lg:flex-row">
              {/* Main Content */}
              <div className="flex-1 p-3 sm:p-4 overflow-y-auto">
                {/* Unfulfilled Section */}
                <div className="mb-4 rounded-lg border border-gray-200 bg-white">
                  <div className="p-3 flex items-center">
                    <div className="h-5 w-5 rounded-full flex items-center justify-center mr-1 bg-orange-100">
                      <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-900">Unfulfilled (4)</h3>
                  </div>

                  <div className="px-3 py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-gray-200">
                    <div className="flex items-center mb-2 sm:mb-0 w-full sm:w-auto">
                      <div className="h-10 w-10 bg-gray-200 rounded-md mr-2 flex-shrink-0 relative">
                        <Image
                          src="/t1.jfif"
                          alt="Product"
                          className="rounded-md object-cover"
                          fill
                          sizes="(max-width: 640px) 40px, 40px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate text-gray-900">
                          Men AlRiem Jersey Short-Sleeve Polo Shirt
                        </p>
                        <p className="text-xs text-gray-500">SKU: 12345678901</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full sm:w-auto mt-1 sm:mt-0">
                      <span className="text-sm mr-4 text-gray-700">$14.90 × 2</span>
                      <span className="text-sm font-medium text-gray-900">$29.8</span>
                    </div>
                  </div>

                  <div className="p-3 flex flex-col sm:flex-row sm:items-center sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2 border-t border-gray-200">
                    <div className="flex items-center flex-wrap gap-2">
                      <span className="text-sm text-gray-700">Fulfill with:</span>
                      <div className="relative" data-dropdown>
                        <button
                          onClick={() => setListboxOpen(!listboxOpen)}
                          className="relative w-32 cursor-pointer rounded-md py-1 pl-2 pr-8 text-left text-sm shadow-sm ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white text-gray-900 ring-gray-300"
                        >
                          <span className="block truncate">{fulfillmentOption}</span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1">
                            <ChevronDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                          </span>
                        </button>
                        {listboxOpen && (
                          <div className="absolute z-20 mt-1 max-h-48 w-full overflow-auto rounded-md py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-white">
                            {fulfillmentOptions.map((option) => (
                              <div
                                key={option}
                                onClick={() => {
                                  setFulfillmentOption(option)
                                  setListboxOpen(false)
                                }}
                                className={`relative cursor-pointer select-none py-1 pl-8 pr-4 transition-colors duration-200 ${
                                  option === fulfillmentOption
                                    ? "bg-blue-50 text-blue-900"
                                    : "text-gray-900 hover:bg-gray-100"
                                }`}
                              >
                                <span
                                  className={`block truncate ${option === fulfillmentOption ? "font-medium" : "font-normal"}`}
                                >
                                  {option}
                                </span>
                                {option === fulfillmentOption && (
                                  <span className="absolute inset-y-0 left-2 flex items-center text-blue-600">
                                    <CheckIcon className="h-4 w-4" aria-hidden="true" />
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <button className="w-full sm:w-auto px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 bg-blue-600 text-white hover:bg-blue-700">
                      Mark as fulfilled
                    </button>
                  </div>
                </div>

                {/* Paid Section */}
                <div className="mb-4 rounded-lg border border-gray-200 bg-white">
                  <div className="p-3 flex items-center">
                    <div className="h-5 w-5 rounded-full flex items-center justify-center mr-1 bg-green-100">
                      <CheckIcon className="h-3 w-3 text-green-600" />
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-900">Paid</h3>
                  </div>

                  <div className="px-3 py-2 grid grid-cols-2 gap-x-1 gap-y-2 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-xs sm:text-sm text-gray-700">Subtotal:</span>
                      <span className="text-xs sm:text-sm text-gray-700">4 items</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs sm:text-sm text-gray-700">$56.96</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-xs sm:text-sm text-gray-700">Shipping:</span>
                      <span className="text-xs sm:text-sm truncate text-gray-700">International</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs sm:text-sm text-gray-700">$6.99</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-xs sm:text-sm font-medium text-gray-900">Total:</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs sm:text-sm font-medium text-gray-900">$63.95</span>
                    </div>
                  </div>

                  <div className="px-3 py-2 flex justify-between border-t border-gray-200">
                    <span className="text-xs sm:text-sm text-gray-700">Paid by customer</span>
                    <span className="text-xs sm:text-sm text-gray-700">$63.95</span>
                  </div>
                </div>

                {/* Timeline Section */}
                <div className="rounded-lg border border-gray-200 bg-white">
                  <div className="p-3 flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900">Timeline</h3>
                  </div>

                  <div className="px-3 py-1 border-t border-gray-200 text-xs text-gray-500 uppercase font-medium">
                    TODAY
                  </div>

                  <div className="px-3 py-2 flex items-start border-t border-gray-200">
                    <div className="h-5 w-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0 bg-blue-100">
                      <span className="text-xs font-medium text-blue-600">N</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-700">
                        Nicolas placed this order on Online Store (checkout #100010)
                      </p>
                    </div>
                    <div className="ml-2 flex-shrink-0">
                      <span className="text-xs sm:text-sm whitespace-nowrap text-gray-500">11:32 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-full lg:w-64 p-3 lg:border-l border-gray-200 bg-gray-50">
                {/* Note Section */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900">Note</h3>
                    <button className="text-xs font-medium transition-colors duration-200 text-blue-600 hover:underline">
                      Edit
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500">No notes from customer</p>
                </div>

                {/* Customer Section */}
                <div className="mb-4">
                  <h3 className="text-xs sm:text-sm font-medium mb-1 text-gray-900">Customer</h3>
                  <div className="flex items-center">
                    <div className="h-6 w-6 rounded-full bg-blue-500 mr-1 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-white">SD</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium truncate text-gray-900">Seth Daniels</p>
                      <p className="text-xs text-gray-500">1 order</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900">CONTACT INFORMATION</h3>
                    <button className="text-xs font-medium transition-colors duration-200 text-blue-600 hover:underline">
                      Edit
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm break-all text-gray-700">hellonicolasdaniel@gmail.com</p>
                </div>

                {/* Shipping Address */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900">SHIPPING ADDRESS</h3>
                    <button className="text-xs font-medium transition-colors duration-200 text-blue-600 hover:underline">
                      Edit
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700">90 Degree Alley Suite 722</p>
                </div>

                {/* Billing Address */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900">BILLING ADDRESS</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700">Same as shipping address</p>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-xs sm:text-sm font-medium mb-1 text-gray-900">Tags</h3>
                  <div className="flex flex-wrap gap-1">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-200 text-gray-700">
                      Reviewed
                      <XMarkIcon className="h-3 w-3 ml-1" />
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-200 text-gray-700">
                      packed
                      <XMarkIcon className="h-3 w-3 ml-1" />
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-200 text-gray-700">
                      delivered
                      <XMarkIcon className="h-3 w-3 ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
