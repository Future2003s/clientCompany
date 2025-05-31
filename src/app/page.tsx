"use client";
import HeadingHero from "@/components/pages/home/heading-hero";
import HomeHero from "@/components/pages/home/home-hero";
import HomeIntroduceProducts from "@/components/pages/home/home-introduce-products";

export default function Home() {
  return (
    <div className="container mx-auto">
      <HomeIntroduceProducts />
      <HeadingHero />
      <HomeHero />
    </div>
  );
}
