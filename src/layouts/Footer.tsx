import Link from "next/link";
import React from "react";
import { IoCalendarNumber, IoMailOutline } from "react-icons/io5";
import { LuInstagram } from "react-icons/lu";
import { PiPhone, PiYoutubeLogo } from "react-icons/pi";
import { SiGooglestreetview, SiOpenstreetmap } from "react-icons/si";

function Footer() {
  return (
    <footer
      className={`bg-[#f9f9f9] pt-14 pb-32 bg-[url("/images/footer.png")] bg-left-bottom bg-repeat-x`}
    >
      <div className="relative z-10 container grid lg:grid-cols-4 gap-8 justify-between">
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* footer left */}
          <h4 className="font-bold text-2xl">Thông Tin Công Ty</h4>
          <Link
            href={"tel:0962215666"}
            className="flex items-center text-gray-700g gap-3"
          >
            <PiPhone className="h-8 w-8" />
            <span className="text-lg">0962215666</span>
          </Link>

          <Link
            href={"#mail"}
            target="_self"
            className="flex items-center text-gray-700g gap-3"
          >
            <IoMailOutline className="h-8 w-8" />
            <span className="text-xl">lalalycheee1@gmail.com</span>
          </Link>

          <Link
            className="flex items-center text-gray-700g gap-3 w-[50%]"
            target="_blank"
            href={"https://maps.app.goo.gl/3kftHYNZhJgLV9UE8"}
          >
            <SiOpenstreetmap className="w-15 h-15" />
            <span className="text-lg">
              LALA-LYCHEEE,Vĩnh Lập, Vĩnh Cường, Thanh Hà, Hải Dương 03227, Việt
              Nam
            </span>
          </Link>
        </div>

        <div>
          {/* footer right */}
          <h4 className="font-bold text-2xl">Mạng xã hội</h4>
          <div className="container flex flex-wrap gap-3">
            <Link
              href={"#youtube"}
              target="_self"
              className="flex items-center text-gray-700g gap-3"
            >
              <PiYoutubeLogo className="h-10 w-10" />
              <span>LALALY-CHEEE</span>
            </Link>

            <Link
              href={"#instagram"}
              target="_self"
              className="flex items-center text-gray-700g gap-3"
            >
              <LuInstagram className="h-10 w-10" />
              <span>lalalycheee1@gmail.com</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
