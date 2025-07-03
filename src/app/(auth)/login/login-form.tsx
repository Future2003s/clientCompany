"use client";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// 1. Import toast và Toaster
import toast, { Toaster } from "react-hot-toast";
// Giả sử bạn có hook này, nếu không có hãy comment dòng này lại
// import { useLoginMutation } from "@/queries/useAuth";

const FormSchema = z.object({
  email: z
    .string()
    .email("Email không đúng định dạng")
    .min(4, "Yêu cầu 4 ký tự"),
  password: z.string().min(8, "Yêu cầu 8 ký tự"),
});

type FormInput = z.infer<typeof FormSchema>;

// --- ICONS ---
const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const EyeSlashIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.575M5.121 5.121L18.879 18.879"
    />
  </svg>
);

function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // const loginMutation = useLoginMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormInput) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:4000/v1/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        // 3. Hiển thị toast lỗi với thông điệp từ server
        const errorMessage =
          responseData.message || `Đăng nhập thất bại. Mã lỗi: ${res.status}`;
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      // 4. Hiển thị toast thành công
      toast.success("Đăng nhập thành công!");
      console.log("Đăng nhập thành công:", responseData);
      // Thêm logic chuyển hướng hoặc lưu token ở đây
    } catch (error) {
      // Lỗi này sẽ bắt các lỗi mạng hoặc lỗi đã được throw ở trên
      console.error("Lỗi khi đăng nhập:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-gray-900">
      {/* 2. Thêm component Toaster để hiển thị thông báo */}
      <Toaster
        position="top-right"
        toastOptions={{
          className:
            "!bg-white/10 !text-white !backdrop-blur-xl !border !border-white/20",
          duration: 4000,
          success: {
            iconTheme: {
              primary: "#10B981", // green-500
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "#F43F5E", // rose-500
              secondary: "white",
            },
          },
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-pink-500 to-purple-700">
        <div className="glow-blob w-96 h-96 bg-red-400 -top-20 -left-20"></div>
        <div className="glow-blob w-80 h-80 bg-pink-400 -bottom-20 -right-10"></div>
        <div className="glow-blob w-72 h-72 bg-purple-400 top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 bg-white/10 backdrop-blur-xl shadow-2xl rounded-2xl p-8 md:p-12 w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-white/20 rounded-full mb-3">
            <img
              src={"https://d3enplyig2yenj.cloudfront.net/logo"}
              height={"100rem"}
              width={"100rem"}
              className="rounded-[999px]"
              alt="Logo"
            />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-wider">
            LALA-LYCHEEE
          </h1>
          <p className="text-white/80 mt-2">Chào mừng bạn trở lại!</p>
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
              type="email"
              id="email"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 text-sm focus:ring-pink-500 focus:border-pink-500 transition duration-300"
              placeholder="name@email.com"
              {...register("email")}
              disabled={isSubmitting}
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1">
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
              <span className="text-red-500 text-xs mt-1">
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
