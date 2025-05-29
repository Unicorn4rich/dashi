"use client"

import { useState, Fragment } from "react"
import { Dialog, Transition, Tab, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react"
import {
  XMarkIcon,
  ChevronDownIcon,
  Bars3BottomLeftIcon,
  Bars3Icon,
  Bars3BottomRightIcon,
  CloudArrowUpIcon,
  TrashIcon,
  Bars3Icon as DragIcon,
  ChevronUpIcon,
  ChevronDownIcon as ChevronDownArrowIcon,
} from "@heroicons/react/24/outline"
import Image from "next/image"

interface NewProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSave?: (productData: {
    id?: string
    name: string
    brand: string
    productId: string
    stock: number
    variants: number
    price: string
    image: string
    selected: boolean
  }) => void
  editProduct?: {
    id?: string
    name: string
    brand: string
    productId: string
    stock: number
    variants: number
    price: string
    image: string
    selected: boolean
  }
}

export default function NewProductModal({ isOpen, onClose, onSave }: NewProductModalProps) {
  const [selectedTab, setSelectedTab] = useState(0)
  const [productName, setProductName] = useState("© Novoneyra Text Patch T-Shirt")
  const [description, setDescription] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("Zara")
  const [selectedCategory, setSelectedCategory] = useState("T-Shirt")
  const [tags, setTags] = useState(["Zara", "T-Shirt"])

  // Pricing state
  const [taxExcludedPrice, setTaxExcludedPrice] = useState("35.90")
  const [taxIncludedPrice, setTaxIncludedPrice] = useState("0.00")
  const [selectedTaxRule, setSelectedTaxRule] = useState("US-Tax (4%)")
  const [unitPrice, setUnitPrice] = useState("0.00")
  const [selectedPer, setSelectedPer] = useState("0")

  // Inventory state
  const [sku, setSku] = useState("0")
  const [quantity, setQuantity] = useState(0)

  // Shipping state
  const [width, setWidth] = useState("8.2")
  const [height, setHeight] = useState("4.5")
  const [depth, setDepth] = useState("2.5")
  const [weight, setWeight] = useState("11")

  // Images state
  const [images, setImages] = useState([
    { id: 1, src: "/t2.jfif", position: 1, isCover: true },
    { id: 2, src: "/t3.jfif", position: 2, isCover: false },
    { id: 3, src: "/t4.jfif", position: 3, isCover: false },
  ])

  const tabs = ["Information", "Images", "Pricing", "Inventory", "Shipping"]
  const brands = ["Zara", "H&M", "Uniqlo", "Mango", "Nike", "Adidas"]
  const categories = ["T-Shirt", "Polo Shirt", "Hoodie", "Jacket", "Pants", "Shorts"]
  const taxRules = ["US-Tax (4%)", "EU-Tax (20%)", "UK-Tax (15%)", "No Tax"]
  const perOptions = ["0", "1", "2", "3", "4", "5"]

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const setCoverImage = (imageId: number) => {
    setImages(images.map((img) => ({ ...img, isCover: img.id === imageId })))
  }

  const removeImage = (imageId: number) => {
    setImages(images.filter((img) => img.id !== imageId))
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(0, prev - 1))

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/10 bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-2">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-[85%] max-w-sm transform rounded-xl p-0 text-left align-middle shadow-xl transition-all bg-white">
              <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
                {({ selectedIndex }) => (
                  <>
                    {/* Modal Header with Tabs */}
                    <div className="border-b border-gray-200">
                      <Tab.List className="flex space-x-1">
                        {tabs.map((tab) => (
                          <Tab
                            key={tab}
                            className={({ selected }) =>
                              `w-full py-2 px-3 text-xs font-medium leading-4 transition-colors duration-200 focus:outline-none ${
                                selected
                                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                              }`
                            }
                          >
                            {tab}
                          </Tab>
                        ))}
                      </Tab.List>
                    </div>

                    {/* Modal Content */}
                    <div className="p-3">
                      <Tab.Panels>
                        {/* Information Tab */}
                        <Tab.Panel className="space-y-3">
                          <div>
                            <h3 className="text-base font-medium mb-3 text-gray-900">Information</h3>

                            {/* Product Name */}
                            <div className="mb-3">
                              <label className="block text-xs font-medium mb-1 text-gray-700">Product Name</label>
                              <input
                                type="text"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                className="w-full px-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                              />
                            </div>

                            {/* Description */}
                            <div className="mb-3">
                              <label className="block text-xs font-medium mb-1 text-gray-700">DESCRIPTION</label>
                              <div className="border rounded-md border-gray-300 bg-white">
                                <div className="flex items-center space-x-1 p-1 border-b border-gray-200">
                                  <button type="button" className="p-1 rounded hover:bg-gray-100 text-gray-600">
                                    <span className="font-bold text-xs">H</span>
                                  </button>
                                  <button type="button" className="p-1 rounded hover:bg-gray-100 text-gray-600">
                                    <span className="font-bold text-xs">B</span>
                                  </button>
                                  <button type="button" className="p-1 rounded hover:bg-gray-100 text-gray-600">
                                    <span className="italic text-xs">I</span>
                                  </button>
                                  <button type="button" className="p-1 rounded hover:bg-gray-100 text-gray-600">
                                    <span className="underline text-xs">U</span>
                                  </button>
                                  <div className="w-px h-4 bg-gray-300" />
                                  <button type="button" className="p-1 rounded hover:bg-gray-100 text-gray-600">
                                    <Bars3BottomLeftIcon className="h-3 w-3" />
                                  </button>
                                  <button type="button" className="p-1 rounded hover:bg-gray-100 text-gray-600">
                                    <Bars3Icon className="h-3 w-3" />
                                  </button>
                                  <button type="button" className="p-1 rounded hover:bg-gray-100 text-gray-600">
                                    <Bars3BottomRightIcon className="h-3 w-3" />
                                  </button>
                                </div>
                                <textarea
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}
                                  placeholder="Type something"
                                  rows={3}
                                  className="w-full px-2 py-1 text-sm border-0 focus:outline-none resize-none rounded-b-md bg-white text-gray-900 placeholder-gray-500"
                                />
                              </div>
                            </div>

                            {/* Brand */}
                            <div className="mb-3">
                              <label className="block text-xs font-medium mb-1 text-gray-700">Brand</label>
                              <Listbox value={selectedBrand} onChange={setSelectedBrand}>
                                <div className="relative">
                                  <ListboxButton className="relative w-full cursor-pointer rounded-md py-1 pl-2 pr-8 text-sm text-left shadow-sm ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white text-gray-900 ring-gray-300">
                                    <span className="block truncate">{selectedBrand}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                      <ChevronDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                                    </span>
                                  </ListboxButton>
                                  <ListboxOptions className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-white">
                                    {brands.map((brand) => (
                                      <ListboxOption
                                        key={brand}
                                        value={brand}
                                        className="relative cursor-pointer select-none py-1 pl-2 pr-8 text-sm transition-colors duration-200 text-gray-900 hover:bg-gray-100"
                                      >
                                        <span className="block truncate">{brand}</span>
                                      </ListboxOption>
                                    ))}
                                  </ListboxOptions>
                                </div>
                              </Listbox>
                            </div>

                            {/* Category */}
                            <div className="mb-3">
                              <label className="block text-xs font-medium mb-1 text-gray-700">Category</label>
                              <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                                <div className="relative">
                                  <ListboxButton className="relative w-full cursor-pointer rounded-md py-1 pl-2 pr-8 text-sm text-left shadow-sm ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white text-gray-900 ring-gray-300">
                                    <span className="block truncate">{selectedCategory}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                      <ChevronDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                                    </span>
                                  </ListboxButton>
                                  <ListboxOptions className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-white">
                                    {categories.map((category) => (
                                      <ListboxOption
                                        key={category}
                                        value={category}
                                        className="relative cursor-pointer select-none py-1 pl-2 pr-8 text-sm transition-colors duration-200 text-gray-900 hover:bg-gray-100"
                                      >
                                        <span className="block truncate">{category}</span>
                                      </ListboxOption>
                                    ))}
                                  </ListboxOptions>
                                </div>
                              </Listbox>
                            </div>

                            {/* Tags */}
                            <div className="mb-3">
                              <label className="block text-xs font-medium mb-1 text-gray-700">TAGS</label>
                              <div className="flex flex-wrap gap-1">
                                {tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700 border border-gray-200"
                                  >
                                    {tag}
                                    <button
                                      type="button"
                                      onClick={() => removeTag(tag)}
                                      className="ml-1 hover:text-red-500 transition-colors duration-200 text-gray-500"
                                    >
                                      <XMarkIcon className="h-2 w-2" />
                                    </button>
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Tab.Panel>

                        {/* Images Tab */}
                        <Tab.Panel className="space-y-3">
                          <div>
                            <h3 className="text-base font-medium mb-3 text-gray-900">Images</h3>

                            {/* Upload Area */}
                            <div className="border-2 border-dashed rounded-lg p-6 text-center mb-4 border-gray-300 bg-gray-50">
                              <CloudArrowUpIcon className="mx-auto h-8 w-8 mb-2 text-gray-400" />
                              <p className="text-xs text-gray-500">
                                Drag and Drop or <span className="text-blue-600 cursor-pointer">Browse</span> to upload
                              </p>
                            </div>

                            {/* Images Table */}
                            <div className="space-y-2">
                              <div className="grid grid-cols-4 gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div>IMAGE</div>
                                <div>POSITION</div>
                                <div>COVER</div>
                                <div></div>
                              </div>

                              {images.map((image) => (
                                <div
                                  key={image.id}
                                  className="grid grid-cols-4 gap-2 items-center py-2 border-b border-gray-200"
                                >
                                  <div>
                                    <Image
                                      src={image.src || "/placeholder.svg"}
                                      alt=""
                                      className="w-8 h-8 rounded object-cover"
                                      width={32}
                                      height={32}
                                    />
                                  </div>
                                  <div className="text-sm text-gray-900">{image.position}</div>
                                  <div>
                                    <button
                                      type="button"
                                      onClick={() => setCoverImage(image.id)}
                                      className={`w-4 h-4 rounded-full border-2 ${
                                        image.isCover ? "border-blue-600 bg-blue-600" : "border-gray-300"
                                      }`}
                                    >
                                      {image.isCover && (
                                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                                      )}
                                    </button>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <button
                                      type="button"
                                      onClick={() => removeImage(image.id)}
                                      className="p-1 rounded hover:bg-red-100 transition-colors duration-200 text-gray-500 hover:text-red-600"
                                    >
                                      <TrashIcon className="h-3 w-3" />
                                    </button>
                                    <button
                                      type="button"
                                      className="p-1 rounded hover:bg-gray-100 transition-colors duration-200 text-gray-500"
                                    >
                                      <DragIcon className="h-3 w-3" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Tab.Panel>

                        {/* Pricing Tab */}
                        <Tab.Panel className="space-y-3">
                          <div>
                            <h3 className="text-base font-medium mb-3 text-gray-900">Pricing</h3>

                            {/* Tax Excluded Price */}
                            <div className="mb-3">
                              <label className="block text-xs font-medium mb-1 text-gray-700">Tax Excluded Price</label>
                              <div className="relative">
                                <span className="absolute left-2 top-1 text-sm text-gray-500">$</span>
                                <input
                                  type="text"
                                  value={taxExcludedPrice}
                                  onChange={(e) => setTaxExcludedPrice(e.target.value)}
                                  className="w-full pl-6 pr-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white border-gray-300 text-gray-900"
                                />
                              </div>
                            </div>

                            {/* Tax Included Price */}
                            <div className="mb-3">
                              <label className="block text-xs font-medium mb-1 text-gray-700">Tax Included Price</label>
                              <div className="relative">
                                <span className="absolute left-2 top-1 text-sm text-gray-500">$</span>
                                <input
                                  type="text"
                                  value={taxIncludedPrice}
                                  onChange={(e) => setTaxIncludedPrice(e.target.value)}
                                  className="w-full pl-6 pr-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white border-gray-300 text-gray-900"
                                />
                              </div>
                            </div>

                            {/* Tax Rule */}
                            <div className="mb-3">
                              <label className="block text-xs font-medium mb-1 text-gray-700">Tax Rule</label>
                              <Listbox value={selectedTaxRule} onChange={setSelectedTaxRule}>
                                <div className="relative">
                                  <ListboxButton className="relative w-full cursor-pointer rounded-md py-1 pl-2 pr-8 text-sm text-left shadow-sm ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white text-gray-900 ring-gray-300">
                                    <span className="block truncate">{selectedTaxRule}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                      <ChevronDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                                    </span>
                                  </ListboxButton>
                                  <ListboxOptions className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-white">
                                    {taxRules.map((rule) => (
                                      <ListboxOption
                                        key={rule}
                                        value={rule}
                                        className="relative cursor-pointer select-none py-1 pl-2 pr-8 text-sm transition-colors duration-200 text-gray-900 hover:bg-gray-100"
                                      >
                                        <span className="block truncate">{rule}</span>
                                      </ListboxOption>
                                    ))}
                                  </ListboxOptions>
                                </div>
                              </Listbox>
                            </div>

                            {/* Unit Price and Per */}
                            <div className="grid grid-cols-2 gap-2 mb-3">
                              <div>
                                <label className="block text-xs font-medium mb-1 text-gray-700">Unit Price</label>
                                <div className="relative">
                                  <span className="absolute left-2 top-1 text-sm text-gray-500">$</span>
                                  <input
                                    type="text"
                                    value={unitPrice}
                                    onChange={(e) => setUnitPrice(e.target.value)}
                                    className="w-full pl-6 pr-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white border-gray-300 text-gray-900"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1 text-gray-700">Per</label>
                                <Listbox value={selectedPer} onChange={setSelectedPer}>
                                  <div className="relative">
                                    <ListboxButton className="relative w-full cursor-pointer rounded-md py-1 pl-2 pr-8 text-sm text-left shadow-sm ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white text-gray-900 ring-gray-300">
                                      <span className="block truncate">{selectedPer}</span>
                                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                                      </span>
                                    </ListboxButton>
                                    <ListboxOptions className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-white">
                                      {perOptions.map((option) => (
                                        <ListboxOption
                                          key={option}
                                          value={option}
                                          className="relative cursor-pointer select-none py-1 pl-2 pr-8 text-sm transition-colors duration-200 text-gray-900 hover:bg-gray-100"
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
                        </Tab.Panel>

                        {/* Inventory Tab */}
                        <Tab.Panel className="space-y-3">
                          <div>
                            <h3 className="text-base font-medium mb-3 text-gray-900">Inventory</h3>

                            {/* SKU and Quantity */}
                            <div className="grid grid-cols-2 gap-4 mb-3">
                              <div>
                                <label className="block text-xs font-medium mb-1 text-gray-700">SKU</label>
                                <input
                                  type="text"
                                  value={sku}
                                  onChange={(e) => setSku(e.target.value)}
                                  className="w-full px-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white border-gray-300 text-gray-900"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1 text-gray-700">Quantity</label>
                                <div className="relative">
                                  <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 0)}
                                    className="w-full px-2 py-1 pr-8 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white border-gray-300 text-gray-900"
                                  />
                                  <div className="absolute right-1 top-0 flex flex-col">
                                    <button
                                      type="button"
                                      onClick={incrementQuantity}
                                      className="p-0.5 hover:bg-gray-100 transition-colors duration-200 text-gray-500"
                                    >
                                      <ChevronUpIcon className="h-2 w-2" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={decrementQuantity}
                                      className="p-0.5 hover:bg-gray-100 transition-colors duration-200 text-gray-500"
                                    >
                                      <ChevronDownArrowIcon className="h-2 w-2" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab.Panel>

                        {/* Shipping Tab */}
                        <Tab.Panel className="space-y-3">
                          <div>
                            <h3 className="text-base font-medium mb-3 text-gray-900">Shipping</h3>

                            {/* Dimensions */}
                            <div className="grid grid-cols-2 gap-2 mb-3">
                              <div>
                                <label className="block text-xs font-medium mb-1 text-gray-700">Width</label>
                                <div className="relative">
                                  <input
                                    type="text"
                                    value={width}
                                    onChange={(e) => setWidth(e.target.value)}
                                    className="w-full px-2 py-1 pr-8 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white border-gray-300 text-gray-900"
                                  />
                                  <span className="absolute right-2 top-1 text-xs text-gray-500">cm</span>
                                </div>
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1 text-gray-700">Height</label>
                                <div className="relative">
                                  <input
                                    type="text"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    className="w-full px-2 py-1 pr-8 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white border-gray-300 text-gray-900"
                                  />
                                  <span className="absolute right-2 top-1 text-xs text-gray-500">cm</span>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mb-3">
                              <div>
                                <label className="block text-xs font-medium mb-1 text-gray-700">Depth</label>
                                <div className="relative">
                                  <input
                                    type="text"
                                    value={depth}
                                    onChange={(e) => setDepth(e.target.value)}
                                    className="w-full px-2 py-1 pr-8 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white border-gray-300 text-gray-900"
                                  />
                                  <span className="absolute right-2 top-1 text-xs text-gray-500">cm</span>
                                </div>
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1 text-gray-700">Weight</label>
                                <div className="relative">
                                  <input
                                    type="text"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="w-full px-2 py-1 pr-8 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white border-gray-300 text-gray-900"
                                  />
                                  <span className="absolute right-2 top-1 text-xs text-gray-500">kg</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab.Panel>
                      </Tab.Panels>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex items-center justify-end space-x-2 px-3 py-2 border-t border-gray-200 bg-gray-50">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-3 py-1 text-xs font-medium rounded-md transition-colors duration-200 text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (selectedIndex < tabs.length - 1) {
                            setSelectedTab(selectedIndex + 1)
                          } else {
                            // Save the product
                            if (onSave) {
                              const newProduct = {
                                name: productName,
                                brand: selectedBrand,
                                productId: sku,
                                stock: quantity,
                                variants: 1, // Default to 1
                                price: taxExcludedPrice,
                                image: images.length > 0 ? images[0].src : "/placeholder.svg",
                                selected: false,
                              }
                              onSave(newProduct)
                            }
                            onClose()
                          }
                        }}
                        className="px-3 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
                      >
                        {selectedIndex < tabs.length - 1 ? "Next" : "Save Product"}
                      </button>
                    </div>
                  </>
                )}
              </Tab.Group>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
