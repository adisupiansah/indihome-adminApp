"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "@/app/img/logo.png";
import logoSmal from "@/app/img/logo-kecil.png";
import { AiFillDashboard } from "react-icons/ai";
import { FaChartLine, FaCircleCheck } from "react-icons/fa6";
import { TbLogout2 } from "react-icons/tb";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import ContentDashboard from "./ContentDashboard";
import Clients from "./Clients";
import Selesai from "./Completed";
import { Tooltip } from "react-tooltip";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/libs/Firebase";
import { useLogout } from "@/libs/signOut";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null)

  const pathname = usePathname(); // Mendapatkan rute aktif
  const { handleLogout } = useLogout()

  if (pathname === "/auth") {
    return null; // Jika rute aktif adalah "/login", tidak menampilkan Sidebar
  }

  useEffect(() => {
    const namaUser = onAuthStateChanged(auth, (currentUser) => setUser(currentUser))
    return () => namaUser();
  }, [])

  return (
    <>
      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-screen 
        bg-white
        transition-normal duration-200
        z-40
        shadow-sm
        flex flex-col justify-between
        ${isOpen ? "w-64" : "w-20"} 
        ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }
      `}
      >
        {/* Bagian Konten (Logo dan Menu) */}
        <div className="flex flex-col">
          {/* Logo */}
          <div
            className={`flex ${isOpen ? "justify-center" : "justify-center"}`}
          >
            {isOpen ? (
              <Image src={logo} alt="Logo" width={150} height={150} />
            ) : (
              <Image
                src={logoSmal}
                alt="Logo"
                width={40}
                height={40}
                className="mt-3"
              />
            )}
          </div>

          {/* Menu */}
          <div
            className={`flex mt-6 ${
              isOpen ? "justify-center" : "justify-center"
            }`}
          >
            {isOpen ? (
              <nav className="flex flex-col items-center space-y-2">
                <Link
                  className={`text-decoration-none text-black hover:bg-red-200 py-2 px-7 rounded-lg ${
                    pathname === "/" ? "active-nav text-white" : ""
                  }`}
                  href={"/"}
                >
                  Dashboard
                </Link>
                <Link
                  className={`text-decoration-none text-black hover:bg-red-200 py-2 px-7 rounded-lg ${
                    pathname === "/clients"
                      ? "active-nav text-white text-center"
                      : ""
                  }`}
                  href={"/clients"}
                >
                  Clients
                </Link>
                <Link
                  className={`text-decoration-none text-black hover:bg-red-200 py-2 px-7 rounded-lg ${
                    pathname === "/selesai"
                      ? "active-nav text-white text-center"
                      : ""
                  }`}
                  href={"/selesai"}
                >
                  Selesai
                </Link>
              </nav>
            ) : (
              <nav className="flex flex-col items-center space-y-2">
                <Link
                  className={`text-decoration-none text-black hover:bg-red-200 p-2 rounded-lg ${
                    pathname === "/" ? "active-nav text-white" : ""
                  }`}
                  href={"/"}
                >
                  <AiFillDashboard
                    size={20}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Dashboard"
                    data-tooltip-place="right"
                  />
                  <Tooltip id="my-tooltip" />
                </Link>

                <Link
                  className={`text-decoration-none text-black hover:bg-red-200 p-2 rounded-lg ${
                    pathname === "/clients" ? "active-nav text-white" : ""
                  }`}
                  href={"/clients"}
                >
                  <FaChartLine
                    size={20}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Clients"
                    data-tooltip-place="right"
                  />
                  <Tooltip id="my-tooltip" />
                </Link>
                <Link
                  className={`text-decoration-none text-black hover:bg-red-200 p-2 rounded-lg ${
                    pathname === "/selesai" ? "active-nav text-white" : ""
                  }`}
                  href={"/selesai"}
                >
                  <FaCircleCheck
                    size={20}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Selesai"
                    data-tooltip-place="right"
                  />
                  <Tooltip id="my-tooltip" />
                </Link>
              </nav>
            )}
          </div>
        </div>

        {/* Bagian Footer (Tombol Logout) */}
        {isOpen ? (
          <div className="flex justify-center mb-4">
            <button className="bg-red-500 text-white col-md-10 p-2 rounded-md hover:bg-red-600 transition duration-300" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="flex justify-center mb-4">
            <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300" data-tooltip-id="my-tooltip" data-tooltip-content="Logout" data-tooltip-place="right" onClick={handleLogout}>
              <TbLogout2 size={20} />
              <Tooltip id="my-tooltip" />
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div
        className={`
        transition-all duration-300
        min-h-screen
        ${isOpen ? "md:ml-64" : "md:ml-20"}
        ${isMobileMenuOpen ? "ml-64" : "ml-0"} 
      `} // di sini pada sintak ${isMobileMenuOpen ? 'ml-64' : 'ml-0'} ketika ingin merubah state isOpen true
      >
        {/* Header Baru */}
        <header className="sticky top-0 bg-white shadow-sm z-30">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Bagian Kiri - Tombol Hamburger */}
            <div className="flex items-center space-x-4">
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <RxHamburgerMenu className="w-6 h-6 text-gray-800" />
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
                <span className="text-xs font-semibold">
                  {user && user.email ? user.email.charAt(0).toUpperCase() : 'G'}
                </span>
              </div>
                <span>
                  {user ? user.email : 'guest'}
                </span>
            </div>
          </div>
        </header>

        {/* Konten Utama */}
        <div className="px-2 pt-3">
          {/* Conditional Rendering Berdasarkan Rute Aktif */}
          {pathname === "/" && <ContentDashboard />}
          {pathname === "/clients" && <Clients />}
          {pathname === "/selesai" && <Selesai />}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
