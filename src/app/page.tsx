"use client";
import HeadingHero from "@/components/pages/home/heading-hero";
import HomeHero from "@/components/pages/home/home-hero";
import HomeIntroduceProducts from "@/components/pages/home/home-introduce-products";

export default function Home() {
  return (
    <div className="container mx-auto">
      <HomeIntroduceProducts />
      <section className="flex flex-col items-center justify-center">
        <div className="lg:-my-20 my-10 flex flex-col gap-5 lg:border-t-2 lg:pt-5">
          <HeadingHero className="text-2xl text-center font-bold" />
          <HomeHero />
        </div>
      </section>
    </div>
  );
}
