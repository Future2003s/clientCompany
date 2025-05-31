import React from "react";
import Image from "next/image";
import HomeImg3 from "../../../../public/images/AQ0P4307.jpg";
import HomeImg4 from "../../../../public/images/AQ0P4410.jpg";
import HomeImg2 from "../../../../public/images/AQ0P4348.jpg";
import HomeImg1 from "../../../../public/images/AQ0P4406.jpg";

const features = [
  { name: "Origin", description: "Designed by Good Goods, Inc." },
  {
    name: "Material",
    description:
      "Solid walnut base with rare earth magnets and powder coated steel card cover",
  },
  { name: "Dimensions", description: '6.25" x 3.55" x 1.15"' },
  { name: "Finish", description: "Hand sanded and finished with natural oil" },
  { name: "Includes", description: "Wood card tray and 3 refill packs" },
  {
    name: "Considerations",
    description:
      "Made from natural materials. Grain and color vary with each item.",
  },
];

export default function HomeIntroduceProducts() {
  return (
    <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 px-4 py-5 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
      <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
        <Image
          src={HomeImg2}
          className="h-[90%] w-[100%] rounded-lg bg-gray-200"
          alt="Img"
        />
        <Image
          src={HomeImg3}
          className="w-full h-full rounded-lg bg-gray-200"
          alt="Img"
        />
        <Image src={HomeImg1} className="rounded-lg bg-gray-200" alt="Img" />
        <Image src={HomeImg4} className="rounded-lg bg-gray-100" alt="Img" />
      </div>

      <div className="flex flex-col gap-5">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Mật Ong Nguyên Chất
        </h2>
        <p className="">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
          porro.
        </p>

        <dl className="mt-8 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 sm:gap-y-10 lg:gap-x-8">
          {features.map((feature) => (
            <div key={feature.name} className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">{feature.name}</dt>
              <dd className="mt-2 text-sm text-gray-500">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
