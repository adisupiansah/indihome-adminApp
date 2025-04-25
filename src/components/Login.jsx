"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/app/img/logo.png";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/libs/Firebase";
import { FaEyeSlash, FaRegEye } from "react-icons/fa6";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    // validasi form
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email dan Password tidak boleh kosong!",
      });
      return;
    }

    try {
      const signInUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // simpan user yang login ke session storage
      sessionStorage.setItem("user", JSON.stringify(signInUser.user));

      // sweetAlert berhasill login
      Swal.fire({
        icon: "success",
        title: "Berhasil Login",
        text: `Selamat Datang ${signInUser.user.email}`,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        router.push('/')
      });
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="flex justify-center items-center vh-100">
            <div className="col-md-6">
              <div className="card shadow-md">
                <div className="card-body px-3">
                  <div className="logo flex justify-center items-center">
                    <Image
                      src={logo}
                      width={200}
                      height={200}
                      alt="Logo indihome"
                    />
                  </div>
                  <div className="text-center">
                    <span className="text-[20px] font-bold">LOGIN</span>
                  </div>
                  {message && (
                    <div className="alert alert-danger mt-3" role="alert">
                      Username / Password salah !
                    </div>
                  )}

                  <form className="form-login mt-3" onSubmit={handleLogin}>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control p-2"
                        placeholder="johndoe@gmail.com"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group mt-4 position-relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control p-2"
                        placeholder="*****"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent px-3"
                        style={{ cursor: "pointer" }}
                      >
                        {showPassword ? (
                          <FaEyeSlash size={20} />
                        ) : (
                          <FaRegEye size={20} />
                        )}
                      </button>
                    </div>
                    <div className="flex justify-center items-center mt-3">
                      <button className="btn btn-login btn-danger col-md-12">
                        submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
