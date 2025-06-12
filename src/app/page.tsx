"use client";
import HeroSection from "@/components/pages/home/hero-section";
import ProductIntroSection from "@/components/pages/home/product-intro-section";
import React from "react";
import { FeaturesSection } from "./test/home/FeaturesSection";
import { CallToActionSection } from "./test/home/CallToActionSection";

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen font-sans antialiased text-gray-800">
      <main className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 space-y-16 sm:space-y-24 lg:space-y-32">
        {/* 1. Hero Section - Vải Thiều Chính Vụ */}
        <section className="container mx-auto  bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-12 transform transition-transform duration-300 hover:scale-[1.005]">
          <HeroSection />
        </section>

        {/* 2. Product Introduction Section - Mật Ong Hoa Vải Nguyên Chất */}
        <section className="container mx-auto  bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-12 transition-all duration-300 hover:shadow-2xl">
          <ProductIntroSection />
        </section>

        <FeaturesSection />
        <CallToActionSection />

        {/* 3. Video Section - Giới thiệu */}
        <section className="flex justify-center items-center">
          <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-gray-100 transition-all duration-300 hover:scale-[1.01]">
            <div
              className="relative"
              style={{ paddingBottom: "56.25%" /* 16:9 Aspect Ratio */ }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID" // THAY THẾ BẰNG ID VIDEO THỰC CỦA BẠN
                title="Giới thiệu về Vải Thiều Thanh Hà"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
