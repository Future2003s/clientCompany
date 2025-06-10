import React from "react";
import { type CarouselApi } from "@/components/ui/carousel";
import Image1 from "../../../../public/images/hero/AQ0P0240.jpg";
import Image2 from "../../../../public/images/hero/AQ0P0541.jpg";
import Image3 from "../../../../public/images/hero/AQ0P0598.jpg";
import Image4 from "../../../../public/images/hero/AQ0P0617.jpg";
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
  name: "product",
  images: [
    {
      src: Image1,
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "../../../../public/images/AQ0P4351.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
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
    <section className="bg-white">
      {/* Image gallery */}
      <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <Image
          alt={product.images[0].alt}
          src={Image1}
          className="hidden size-full rounded-lg object-cover lg:block"
        />
        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <Image
            alt={product.images[1].alt}
            src={Image2}
            className="aspect-3/2 w-full rounded-lg object-cover"
          />
          <Image
            alt={product.images[2].alt}
            src={Image3}
            className="aspect-3/2 w-full rounded-lg object-cover"
          />
        </div>
        <Image
          alt={product.images[3].alt}
          src={Image4}
          className="aspect-4/5 size-full object-cover sm:rounded-lg lg:aspect-auto"
        />
      </div>

      {/* Product info */}
      <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl capitalize">
            Vải Thiều Chính Vụ
          </h1>
        </div>

        <section className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
          {/* Description and details */}
          <h3 className="sr-only">Mô tả</h3>
          <div className="space-y-6">
            <p className=" text-gray-900 text-lg text-justify tracking-tighter">
              Khám phá hương vị ngọt ngào, thanh mát của Vải Thiều chính vụ.
              Những trái vải căng mọng, đỏ hồng, được thu hoạch tươi ngon từ
              vườn, mang đến trải nghiệm mùa hè đích thực. Cùi vải dày, trắng
              trong, mọng nước, vị ngọt đậm đà khó quên. Thích hợp làm quà biếu
              ý nghĩa hoặc là món tráng miệng tuyệt vời cho cả gia đình thưởng
              thức.
            </p>
          </div>
        </section>

        <article className="col-span-1 mt-5">
          <Carousel
            opts={{
              align: "start",
            }}
            orientation="vertical"
            // className="w-full max-w-xs"
            setApi={setApi}
          >
            <CarouselContent className="h-[20.5rem]">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className=" md:basis-1/2">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex items-center justify-center p-2">
                        <Image
                          alt="img"
                          loading="eager"
                          src={Image2}
                          className="aspect-3/2 w-full rounded-lg object-cover"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="mt-17 text-center text-lg ">
            Hình ảnh {current} trên {count}
          </div>
        </article>
      </div>
    </section>
  );
}
