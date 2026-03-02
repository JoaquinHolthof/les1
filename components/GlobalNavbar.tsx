"use client"

import { useState } from "react"
import SidebarSlider from "@/components/SidebarSlider"
import { GiHamburgerMenu } from "react-icons/gi"

export default function GlobalNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const linkBase = "group relative w-fit block py-1"
  const underlineStyle =
    "absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 ease-in-out group-hover:w-full"

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 p-2 text-gray-700"
        onClick={() => setIsSidebarOpen(true)}
      >
        <GiHamburgerMenu size={24} />
      </button>

      <SidebarSlider
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      >
        <nav className="flex flex-col space-y-6 p-6">
          
          {/* Main Links */}
          <a href="/home" className={linkBase}>
            <span>Home</span>
            <span className={underlineStyle}></span>
          </a>

          <a href="/about" className={linkBase}>
            <span>About</span>
            <span className={underlineStyle}></span>
          </a>

          <a href="/login" className={linkBase}>
            <span>Login</span>
            <span className={underlineStyle}></span>
          </a>

          {/* ADMIN SECTION */}
          <div className="bg-gray-100 rounded-lg p-4 space-y-3">
            <p className="text-xs uppercase text-gray-400 tracking-wider">
              Admin
            </p>

            <a href="/admin" className={`${linkBase} text-blue-600 font-semibold`}>
              <span>Admin</span>
              <span className={`${underlineStyle} bg-blue-600`}></span>
            </a>

            <a href="/admin-user" className={`${linkBase} text-gray-800 font-semibold`}>
              <span>Admin User</span>
              <span className={`${underlineStyle} bg-gray-800`}></span>
            </a>
          </div>

          <hr className="border-gray-200" />

          {/* Project Links */}
          <a href="/project1" className={`${linkBase} text-gray-500 text-sm`}>
            <span>Project 1</span>
            <span className={underlineStyle}></span>
          </a>

          <a href="/project2" className={`${linkBase} text-gray-500 text-sm`}>
            <span>Project 2</span>
            <span className={underlineStyle}></span>
          </a>

          <a href="/project3" className={`${linkBase} text-gray-500 text-sm`}>
            <span>Project 3</span>
            <span className={underlineStyle}></span>
          </a>

        </nav>
      </SidebarSlider>
    </>
  )
}