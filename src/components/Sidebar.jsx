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
import { usePathname } from "next/navigation";
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
  const [user, setUser] = useState(null);

  const pathname = usePathname();
  const { handleLogout } = useLogout();

  // Tutup sidebar mobile setelah klik link
  const closeMobileMenu = () => {
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
  };

  // Set isOpen = true ketika layar desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true); // Pastikan selalu terbuka di desktop
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (pathname === "/auth") {
    return null;
  }

  return (
    <>
      {/* Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-10 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-screen 
        bg-white shadow-sm z-40 flex flex-col justify-between
        transition-all duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0
        ${isMobileMenuOpen || !isOpen ? "w-20" : "w-64"}
      `}
      >
        {/* Logo Section */}
        <div className="flex flex-col">
          <div className="flex justify-center mt-3">
            {isMobileMenuOpen || !isOpen ? (
              <Image src={logoSmal} alt="Logo" width={40} height={40} />
            ) : (
              <Image src={logo} alt="Logo" width={150} height={150} />
            )}
          </div>

          <nav className="mt-6 flex flex-col items-center space-y-2 px-2">
            {[
              {
                href: "/",
                icon: <AiFillDashboard size={20} />,
                label: "Dashboard",
              },
              {
                href: "/clients",
                icon: <FaChartLine size={20} />,
                label: "Clients",
              },
              {
                href: "/selesai",
                icon: <FaCircleCheck size={20} />,
                label: "Selesai",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={`text-decoration-none text-black hover:bg-red-200 py-2 px-2 rounded-lg w-full flex items-center justify-center gap-3 ${
                  pathname === item.href ? "bg-red-500 text-white" : ""
                }`}
              >
                {/* Selalu tampilkan ikon */}
                <span
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={item.label}
                  data-tooltip-place="right"
                >
                  {item.icon}
                </span>

                {/* Label hanya muncul jika isOpen = true di desktop */}
                <span
                  className={`${
                    isOpen ? "md:inline-block" : "md:hidden"
                  } hidden font-medium`}
                >
                  {item.label}
                </span>

                <Tooltip id="my-tooltip" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="flex justify-center mb-4 px-4">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 flex items-center justify-center gap-3 w-full"
            onClick={handleLogout}
          >
            {/* Ikon Logout + Tooltip */}
            <span
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Logout"
              data-tooltip-place="right"
            >
              <TbLogout2 size={20} />
            </span>

            {/* Teks Logout hanya muncul saat sidebar besar */}
            <span
              className={`${
                isOpen ? "md:inline-block" : "md:hidden"
              } hidden ml-2 font-medium`}
            >
              Logout
            </span>

            <Tooltip id="my-tooltip" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`
        transition-all duration-300 min-h-screen
        ${isMobileMenuOpen || !isOpen ? "md:ml-20" : "md:ml-64"}
      `}
      >
        {/* Header */}
        <header className="sticky top-0 bg-white shadow-sm z-30">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Hamburger Button - Mobile */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <RxHamburgerMenu className="w-6 h-6 text-gray-800" />
            </button>

            {/* Desktop Toggle Button */}
            <button
              className="hidden md:block p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsOpen(!isOpen)}
            >
              <RxHamburgerMenu className="w-6 h-6 text-gray-800" />
            </button>

            {/* Akun Info */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-xs font-semibold">
                  {user && user.email
                    ? user.email.charAt(0).toUpperCase()
                    : "G"}
                </span>
              </div>
              <span className="text-sm hidden sm:inline">
                {user ? user.email : "Guest"}
              </span>
            </div>
          </div>
        </header>

        {/* Konten Utama */}
        <div className="px-2 pt-3">
          {pathname === "/" && <ContentDashboard />}
          {pathname === "/clients" && <Clients />}
          {pathname === "/selesai" && <Selesai />}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
