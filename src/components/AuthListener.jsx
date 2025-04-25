'use client'
import { useEffect } from "react";
import { auth } from "@/libs/Firebase";
import { setPersistence, browserSessionPersistence, onAuthStateChanged } from "firebase/auth";

const AuthListener = () => {


  useEffect(() => {
    // Set persistence ke 'session'
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // Mendengarkan perubahan status autentikasi
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            // Pengguna sudah login
            sessionStorage.setItem("user", JSON.stringify(user)); // Simpan informasi pengguna
          } else {
            // Pengguna belum login
            sessionStorage.removeItem("user"); // Hapus informasi pengguna
            // Arahkan ke halaman login hanya jika pengguna mencoba mengakses halaman yang membutuhkan login
            if (!window.location.pathname.startsWith("/auth")) {
                window.location.href = '/auth'
            }
          }
        });

        return () => unsubscribe();
      })
      .catch((error) => {
        console.error("Error setting persistence:", error);
      });
  }, []);

  return null; // Komponen ini tidak me-render UI apa pun
};

export default AuthListener;