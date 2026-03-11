"use client"

import { useState } from "react"
import SidebarSlider from "@/components/SidebarSlider"
import { GiHamburgerMenu } from "react-icons/gi"
import { IoChevronDown } from "react-icons/io5"

export default function GlobalNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Desktop Styles
  const linkBase = "group relative flex items-center gap-1 py-5 whitespace-nowrap text-sm font-medium transition-colors"
  const underlineStyle = "absolute bottom-4 left-0 w-0 h-0.5 bg-black transition-all duration-300 ease-in-out group-hover:w-full"

  // Mobile Styles (Blue Hover + Underline)
  const mobileLink = "group relative w-fit block py-2 text-lg font-medium transition-colors hover:text-blue-600"
  const mobileUnderline = "absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out group-hover:w-full"

  const dropdownPanel = "absolute top-full left-0 hidden group-hover:block w-48 bg-white border border-gray-100 shadow-xl rounded-b-lg py-2 z-50"
  const dropdownItem = "block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-200 z-40 flex items-center px-6">
        <div className="font-bold text-xl tracking-tight text-gray-900 shrink-0 mr-10">
          Joaquin H
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center justify-between w-full h-full">
          <div className="flex items-center space-x-8 h-full">
            <a href="/home" className={`${linkBase} text-gray-700 hover:text-black`}>
              Home <span className={underlineStyle}></span>
            </a>
            <a href="/about" className={`${linkBase} text-gray-700 hover:text-black`}>
              About <span className={underlineStyle}></span>
            </a>
            <div className="group h-full flex items-center relative">
              <button className={`${linkBase} text-gray-700 hover:text-black`}>
                Projects <IoChevronDown className="group-hover:rotate-180 transition-transform" />
                <span className={underlineStyle}></span>
              </button>
              <div className={dropdownPanel}>
                <a href="/project1" className={dropdownItem}>Project 1</a>
                <a href="/project2" className={dropdownItem}>Project 2</a>
                <a href="/project3" className={dropdownItem}>Project 3</a>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-8 h-full">
            <a href="/login" className={`${linkBase} text-gray-700 hover:text-black`}>
              Login <span className={underlineStyle}></span>
            </a>
            <div className="group h-full flex items-center relative">
              <button className="flex items-center gap-1 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-black transition text-sm">
                Admin <IoChevronDown className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className={`${dropdownPanel} right-0 left-auto`}>
                <a href="/admin" className={dropdownItem}>Admin Panel</a>
                <a href="/admin-user" className={dropdownItem}>User Settings</a>
              </div>
            </div>
          </div>
        </nav>

        {/* MOBILE HAMBURGER BUTTON */}
        <div className="md:hidden flex ml-auto">
          <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={() => setIsSidebarOpen(true)}>
            <GiHamburgerMenu size={24} />
          </button>
        </div>
      </header>

      <div className="h-16 w-full"></div>

      {/* MOBILE SIDEBAR */}
      <SidebarSlider isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
        <nav className="flex flex-col space-y-8 p-8">
          <p className="text-xs uppercase text-gray-400 font-bold tracking-widest">Menu</p>
          
          <div className="flex flex-col space-y-5">
            <a href="/home" className={mobileLink}>
              Home <span className={mobileUnderline}></span>
            </a>
            <a href="/about" className={mobileLink}>
              About <span className={mobileUnderline}></span>
            </a>
            <a href="/login" className={mobileLink}>
              Login <span className={mobileUnderline}></span>
            </a>
          </div>

          <div className="space-y-4">
            <p className="text-xs uppercase text-gray-400 tracking-wider">Admin</p>
            <a href="/admin" className={mobileLink}>
              Admin Panel <span className={mobileUnderline}></span>
            </a>
            <a href="/admin-user" className={mobileLink}>
              User Management <span className={mobileUnderline}></span>
            </a>
          </div>

          <div className="space-y-4">
            <p className="text-xs uppercase text-gray-400 tracking-wider">Projects</p>
            <a href="/project1" className={mobileLink}>
              Project 1 <span className={mobileUnderline}></span>
            </a>
            <a href="/project2" className={mobileLink}>
              Project 2 <span className={mobileUnderline}></span>
            </a>
            <a href="/project3" className={mobileLink}>
              Project 3 <span className={mobileUnderline}></span>
            </a>
          </div>
        </nav>
      </SidebarSlider>
    </>
  )
}