"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState<string>(" ");
  const [password, setPassword] = useState<string>(" ");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(1);
    console.log({ email, password });
  };

  useEffect(() => {
    
  },[])

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-gray-900">
      {/* Nền động */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-pink-500 to-purple-700">
        <div className="glow-blob w-96 h-96 bg-red-400 -top-20 -left-20"></div>
        <div className="glow-blob w-80 h-80 bg-pink-400 -bottom-20 -right-10"></div>
        <div className="glow-blob w-72 h-72 bg-purple-400 top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Thẻ đăng nhập hiệu ứng Glassmorphism */}
      <div className="relative z-10 bg-white/10 backdrop-blur-xl shadow-2xl rounded-2xl p-8 md:p-12 w-full max-w-md border border-white/20">
        {/* Phần Header với Logo và Tiêu đề */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-white/20 rounded-full mb-3">
            <img
              src={"https://d3enplyig2yenj.cloudfront.net/logo"}
              height={"100rem"}
              width={"100rem"}
              className="rounded-[999px]"
            />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-wider">
            LALA-LYCHEEE
          </h1>
          <p className="text-white/80 mt-2">Chào mừng bạn trở lại!</p>
        </div>

        {/* Form đăng nhập */}
        <div>
          {/* Ô nhập Email */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white/90"
            >
              Địa chỉ Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 text-sm focus:ring-pink-500 focus:border-pink-500 transition duration-300"
              placeholder="name@email.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Ô nhập Mật khẩu */}
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white/90"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 text-sm focus:ring-pink-500 focus:border-pink-500 transition duration-300"
              placeholder="••••••••"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Liên kết Quên mật khẩu */}
          <div className="text-right mb-6">
            <Link
              href={"/forget-password"}
              className="text-sm font-medium text-white/90 hover:text-white hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>

          {/* Nút Đăng nhập */}
          <button
            className="w-full text-white bg-pink-500/80 hover:bg-pink-500 focus:ring-4 focus:outline-none focus:ring-pink-300/50 font-bold rounded-lg text-base px-5 py-3.5 text-center transition-all transform hover:scale-105 duration-300 border border-white/20"
            onClick={handleSubmit}
          >
            Đăng Nhập
          </button>

          {/* Liên kết Đăng ký */}
          <p className="text-sm font-light text-white/80 text-center mt-8">
            Chưa có tài khoản?{" "}
            <Link
              href="/register"
              className="font-bold text-white hover:underline"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default LoginForm;
