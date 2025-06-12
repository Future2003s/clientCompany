// components/HeroSection.tsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"; // Assuming shadcn/ui carousel

// Import your actual images
import HeroImage1 from "../../../../public/images/AQ0P4307.jpg";
import HeroImage2 from "../../../../public/images/AQ0P4307.jpg";
import HeroImage3 from "../../../../public/images/AQ0P4307.jpg";
import HeroImage4 from "../../../../public/images/AQ0P4307.jpg";

const heroProduct = {
  name: "Vải Thiều Chính Vụ",
  nameJp: "タンハーライチ",
  description:
    "Khám phá hương vị ngọt ngào, thanh mát của Vải Thiều chính vụ. Những trái vải căng mọng, đỏ hồng, được thu hoạch tươi ngon từ vườn, mang đến trải nghiệm mùa hè đích thực. Cùi vải dày, trắng trong, mọng nước, vị ngọt đậm đà khó quên.",
  highlights: [
    "Thu hoạch tại vườn địa phương Thanh Hà, Hải Dương.",
    "Tuyển chọn kỹ lưỡng từng trái, đảm bảo chất lượng cao nhất.",
    "Tươi ngon, mọng nước, hương vị đặc trưng khó quên.",
    "Không chất bảo quản, an toàn tuyệt đối cho sức khỏe.",
  ],
  images: [
    HeroImage1,
    HeroImage2,
    HeroImage3,
    HeroImage4,
    HeroImage1,
    HeroImage2,
  ], // Duplicate some for carousel demo
};

export default function HeroSection(): React.JSX.Element {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(heroProduct.images.length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
      {/* Product Info & Highlights */}
      <div className="lg:col-span-2 text-center lg:text-left order-2 lg:order-1">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          {heroProduct.name}
          <span className="block text-2xl sm:text-3xl font-normal text-gray-600 mt-2">
            ({heroProduct.nameJp})
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6 text-justify">
          {heroProduct.description}
        </p>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Điểm nổi bật:
          </h3>
          <ul role="list" className="space-y-3 text-gray-700 text-lg">
            {heroProduct.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-500 mr-3 flex-shrink-0 mt-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Image Gallery / Carousel */}
      <div className="lg:col-span-1 order-1 lg:order-2">
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full"
          setApi={setApi}
        >
          <CarouselContent className="h-[24rem] sm:h-[30rem] lg:h-[40rem] rounded-2xl overflow-hidden shadow-xl">
            {heroProduct.images.map((imgSrc, index) => (
              <CarouselItem key={index} className="basis-full">
                <div className="relative w-full h-full">
                  <Image
                    src={imgSrc}
                    alt={`${heroProduct.name} ${index + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover rounded-2xl"
                    priority={index === 0} // Priority for the first image
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full p-2 shadow-md" />
          <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full p-2 shadow-md" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-medium text-sm z-10">
            {current} / {count}
          </div>
        </Carousel>
      </div>
    </div>
  );
}
