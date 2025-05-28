"use client"
import Image from 'next/image';
import { useState } from "react"
import {
  MagnifyingGlassIcon,
  BellIcon,
  Cog6ToothIcon,
  RocketLaunchIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} 
from "@heroicons/react/24/outline"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"

interface NavbarProps {
  darkMode?: boolean
  onToggleDarkMode?: () => void
}

export default function Navbar({ darkMode = false, onToggleDarkMode }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: "Overview", href: "#", current: false },
  ]

  return (
    <nav
      className={`${darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-100"}  transition-colors duration-200`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-2">
              <RocketLaunchIcon className={`h-6 w-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
              <span className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>DashboardX</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">

                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-bold font-bold transition-colors duration-200 ${
                      item.current
                        ? darkMode
                          ? "bg-gray-800 text-white"
                          : "bg-gray-100 text-gray-900"
                        : darkMode
                          ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >

                    {item.name}

                  </a>
                ))}

              </div>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-3xs mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className={`h-5 w-5 ${darkMode ? "text-gray-400" : "text-gray-400"}`} />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200 ${
                  darkMode ? "bg-gray-800  text-white" : "bg-gray-50 border-none text-gray-900"
                }`}
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Dark/Light Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-md transition-colors duration-200 ${
                darkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-700"
                  : "text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              }`}
            >
              {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>

            {/* Notifications */}
            <button
              className={`p-2 rounded-md transition-colors duration-200 ${
                darkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-700"
                  : "text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              }`}
            >
              <BellIcon className="h-5 w-5" />
              <span className="sr-only">View notifications</span>
            </button>

            {/* Settings */}
            <button
              className={`p-2 rounded-md transition-colors duration-200 ${
                darkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-700"
                  : "text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              }`}
            >
              <Cog6ToothIcon className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative">
              <MenuButton className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">Open user menu</span>
                <Image
  className="h-8 w-8 rounded-full"
  src="/navhead.jfif"
  alt="User avatar"
  width={32}
  height={32}
/>
              </MenuButton>
              <MenuItems
                className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <MenuItem>
                  <a
                    href="#"
                    className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                      darkMode ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                      darkMode ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                      darkMode ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  darkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-700"
                    : "text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                }`}
              >
                {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* Mobile Search */}
              <div className="relative mb-3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className={`h-5 w-5 ${darkMode ? "text-gray-400" : "text-gray-400"}`} />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200 ${
                    darkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>

              {/* Mobile Navigation */}
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    item.current
                      ? darkMode
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 text-gray-900"
                      : darkMode
                        ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
