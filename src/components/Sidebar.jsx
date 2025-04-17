'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import logo from '@/app/img/logo.png' 

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen 
        bg-white
        transition-all duration-300
        z-40
        shadow-sm
        ${isOpen ? 'w-64' : 'w-20'} 
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* konten sidebar */}
        {/* logo */}
        <div className="flex justify-center items-center">
            <Image src={logo} height={150} width={150} alt='logo'/>
        </div>

        {/* menu */}
        <nav className="mt-10">
          <ul className="space-y-4">
            <li className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 ${isOpen ? 'justify-start' : 'justify-center'}`}>
              <span className="text-gray-800">Dashboard</span>
            </li>
            <li className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 ${isOpen ? 'justify-start' : 'justify-center'}`}>
              <span className="text-gray-800">Registrasi</span>
            </li>
            <li className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 ${isOpen ? 'justify-start' : 'justify-center'}`}>
              <span className="text-gray-800">Laporan</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`
        transition-all duration-300
        min-h-screen
        ${isOpen ? 'md:ml-64' : 'md:ml-20'}
        ${isMobileMenuOpen ? 'ml-64' : 'ml-0'}
      `}>
        {/* Header Baru */}
        <header className="sticky top-0 bg-white shadow-sm z-30">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Bagian Kiri - Tombol Hamburger */}
            <div className="flex items-center space-x-4">
              {/* Mobile Hamburger */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <div className="w-6 space-y-1.5">
                  <div className="h-0.5 bg-gray-800"></div>
                  <div className="h-0.5 bg-gray-800"></div>
                  <div className="h-0.5 bg-gray-800"></div>
                </div>
              </button>

              {/* Desktop Toggle */}
              <button
                className="hidden md:block p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setIsOpen(!isOpen)}
              >
                <RxHamburgerMenu className="w-6 h-6 text-gray-800" />
              </button>
            </div>

            {/* Bagian Kanan - Akun */}
            <div className="flex justify-center items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-xs">MR</span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm text-gray-700">muhammadrafiy@gmail.com</p>
              </div>
            </div>
            
          </div>
        </header>

        {/* Konten Utama */}
        <div className="p-4 pt-20">
           {/* kontent utama di sini */}
        </div>
      </div>
    </>
  )
}

export default Sidebar