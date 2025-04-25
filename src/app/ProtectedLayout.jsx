"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/libs/Firebase";

const ProtectedLayout = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/auth"); // Redirect ke /auth jika belum login
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="loader"></div>
      </div>
    );
  }

  return <>{children}</>; // Render halaman setelah cek auth
};

export default ProtectedLayout;
