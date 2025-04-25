'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";
import gambar from "@/app/img/gambar-admin.png";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/libs/Firebase";

const ContentDashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
        return () => unsubscribe();
    }, []);

    // Fungsi untuk mengekstrak nama dari email
    const extractNameFromEmail = (email) => {
        if (!email) return ""; 
        const name = email.split("@")[0]; 
        return name.toUpperCase(); 
    };

    return (
        <div className="content-dashboard">
            <div className="container-fluid">
                {/* <h5 className="card-title">Dashboard</h5> */}
                <div className="row">
                    <div className="col-md-12 mt-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="flex justify-center items-center">
                                    <Image
                                        src={gambar}
                                        alt="admin indihome"
                                        width={250}
                                        height={250}
                                    />
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <span className="card-text font-bold text-[20px] text-gray-600 mt-3">
                                        HALLO {user ? extractNameFromEmail(user.email) : "Guest"}, SELAMAT DATANG DI DASHBOARD ADMIN INDIHOME
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentDashboard;