"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeSlashIcon } from "@/icons/icons.global";
import { EyeIcon } from "lucide-react";
import { authSchema, LoginBodyType } from "@/app/shemaValidation/auth.schema";
import { useLoginMutation } from "@/queries/useAuth";
import { envConfig } from "@/config";

function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginBodyType>({ resolver: zodResolver(authSchema) });

  const loginMutation = useLoginMutation();

  const onSubmit = async (data: LoginBodyType) => {
    setIsSubmitting(true);
    if (loginMutation.isPending) {
      return;
    }

    const result = loginMutation.mutate(data);
    console.log(result);
    try {
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-pink-500 to-purple-700">
        <div className="glow-blob w-96 h-96 bg-red-400 -top-20 -left-20"></div>
        <div className="glow-blob w-80 h-80 bg-pink-400 -bottom-20 -right-10"></div>
        <div className="glow-blob w-72 h-72 bg-purple-400 top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 bg-white/10 backdrop-blur-xl shadow-2xl rounded-2xl p-8 md:p-12 w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-white/20 rounded-full mb-3">
            <img
              src={envConfig.NEXT_PUBLIC_URL_LOGO}
              height={"100rem"}
              width={"100rem"}
              className="rounded-[999px]"
              alt="Logo"
            />
          </div>
          <h1 className="text-3xl font-extrabold tracking-wider italic text-white">
            LALA-LYCHEEE
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white/90"
            >
              Địa chỉ Email
            </label>
            <input
              id="email"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 text-sm focus:ring-pink-500 focus:border-pink-500 transition duration-300"
              placeholder="name@email.com"
              {...register("email")}
              disabled={isSubmitting}
            />
            {errors.email && (
              <span className="text-red-700 text-xs mt-2 flex justify-baseline items-center font-bold">
                {errors.email?.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white/90"
            >
              Mật khẩu
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full pl-4 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 text-sm focus:ring-pink-500 focus:border-pink-500 transition duration-300"
                placeholder="••••••••"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/70 hover:text-white disabled:opacity-50"
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                disabled={isSubmitting}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-700 font-bold text-xs mt-1">
                {errors.password?.message}
              </span>
            )}
          </div>

          <div className="text-right">
            <Link
              href={"/forget-password"}
              className="text-sm font-medium text-white/90 hover:text-white hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-pink-500/80 hover:bg-pink-500 focus:ring-4 focus:outline-none focus:ring-pink-300/50 font-bold rounded-lg text-base px-5 py-3.5 text-center transition-all transform hover:scale-105 duration-300 border border-white/20 !mt-6 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang xử lý..." : "Đăng Nhập"}
          </button>

          <p className="text-sm font-light text-white/80 text-center !mt-8">
            Chưa có tài khoản?{" "}
            <Link
              href="/register"
              className="font-bold text-white hover:underline"
            >
              Đăng ký ngay
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default LoginForm;
