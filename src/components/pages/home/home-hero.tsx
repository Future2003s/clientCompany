// components/HomeHero.tsx
import React from "react";
import { type CarouselApi } from "@/components/ui/carousel";
import Image1 from "../../../../public/images/AQ0P0240.jpg";
import Image2 from "../../../../public/images/AQ0P0240.jpg";
import Image3 from "../../../../public/images/AQ0P0240.jpg";
import Image4 from "../../../../public/images/AQ0P0240.jpg";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const product = {
  name: "Vải Thiều Chính Vụ",
  images: [
    { src: Image1, alt: "Vải Thiều Chính Vụ - Cận cảnh quả" },
    { src: Image2, alt: "Vải Thiều Chính Vụ - Nông trại" },
    { src: Image3, alt: "Vải Thiều Chính Vụ - Thu hoạch" },
    { src: Image4, alt: "Vải Thiều Chính Vụ - Sản phẩm đã đóng gói" },
    // Thêm các ảnh khác nếu cần cho carousel
    { src: Image1, alt: "Vải Thiều Chính Vụ - Cận cảnh quả" }, // Duplicate for more items in carousel
    { src: Image2, alt: "Vải Thiều Chính Vụ - Nông trại" },
  ],
  description:
    "Khám phá hương vị ngọt ngào, thanh mát của Vải Thiều chính vụ. Những trái vải căng mọng, đỏ hồng, được thu hoạch tươi ngon từ vườn, mang đến trải nghiệm mùa hè đích thực. Cùi vải dày, trắng trong, mọng nước, vị ngọt đậm đà khó quên. Thích hợp làm quà biếu ý nghĩa hoặc là món tráng miệng tuyệt vời cho cả gia đình thưởng thức.",
  highlights: [
    "Thu hoạch tại vườn địa phương",
    "Tuyển chọn kỹ lưỡng từng trái",
    "Đảm bảo tươi ngon, mọng nước",
    "Không chất bảo quản",
  ],
  details:
    "Vải Thiều chính vụ được trồng và chăm sóc theo quy trình nghiêm ngặt, đảm bảo chất lượng cao nhất. Chúng tôi cam kết mang đến những trái vải tươi ngon nhất, giữ trọn hương vị tự nhiên của mùa hè.",
};

export default function HomeHero(): React.JSX.Element {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="bg-white rounded-xl shadow-lg p-0">
      {" "}
      {/* Remove padding here, add to inner div */}
      {/* Image gallery */}
      <div className="mx-auto max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8">
        {/* Main large image */}
        <div className="relative col-span-2 rounded-lg overflow-hidden mb-4 lg:mb-0 aspect-video lg:aspect-3/2 shadow-md">
          <Image
            alt={product.images[0].alt}
            src={product.images[0].src}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Smaller gallery images - Only visible on large screens */}
        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-4">
          {product.images.slice(1, 4).map((image, index) => (
            <div
              key={index}
              className="relative aspect-3/2 w-full rounded-lg overflow-hidden shadow-sm group"
            >
              <Image
                alt={image.alt}
                src={image.src}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-0 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
      {/* Product info (Description, Highlights, Carousel) */}
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 lg:py-12">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 capitalize mb-4">
            {product.name}
          </h1>
          <p className="text-gray-700 text-lg text-justify leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Điểm nổi bật:
            </h3>
            <ul
              role="list"
              className="list-disc list-inside space-y-3 text-gray-600 text-base"
            >
              {product.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Vertical Carousel for More Images */}
        <article className="col-span-1 mt-8 lg:mt-0 lg:pl-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center lg:text-left">
            Xem thêm hình ảnh
          </h3>
          <Carousel
            opts={{
              align: "start",
            }}
            orientation="vertical"
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent className="h-[20rem] sm:h-[25rem] lg:h-[30rem] xl:h-[35rem] rounded-lg overflow-hidden shadow-md">
              {product.images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/2 sm:basis-1/3 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="p-1">
                    <Card className="rounded-lg overflow-hidden border-none shadow-sm">
                      <CardContent className="flex items-center justify-center p-2">
                        <div className="relative w-full aspect-3/2">
                          <Image
                            alt={image.alt}
                            loading="lazy"
                            src={image.src}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-1/2 -translate-x-1/2 -top-10 bg-indigo-500 hover:bg-indigo-600 text-white shadow-md" />
            <CarouselNext className="absolute left-1/2 -translate-x-1/2 -bottom-10 bg-indigo-500 hover:bg-indigo-600 text-white shadow-md" />
          </Carousel>
          <div className="mt-8 text-center text-base text-gray-600">
            Hình ảnh {current} trên {count}
          </div>
        </article>
      </div>
    </section>
  );
}
