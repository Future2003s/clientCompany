import Link from "next/link";
import React from "react";
import { IoCalendarNumber, IoMailOutline } from "react-icons/io5";
import { LuInstagram } from "react-icons/lu";
import { PiPhone, PiYoutubeLogo } from "react-icons/pi";

function Footer() {
  return (
    <footer
      className={`pt-14 pb-32 bg-[url("/images/footer.png")] bg-left-bottom bg-repeat-x`}
    >
      <div className="relative z-10 container grid lg:grid-cols-4 gap-8">
        {/* footer left */}
        <div className="flex flex-col gap-6 lg:col-span-6">
          <h4 className="font-bold text-2xl">Thông Tin Công Ty</h4>
          <Link
            href={"#youtube"}
            target="_self"
            className="flex items-center text-gray-700g gap-3"
          >
            <PiYoutubeLogo className="h-6 w-6" />
            <span>LALALY-CHEEE</span>
          </Link>

          <Link
            href={"0962215666"}
            target="_self"
            className="flex items-center text-gray-700g gap-3"
          >
            <PiPhone className="h-6 w-6" />
            <span>0962215666</span>
          </Link>

          <Link
            href={"#mail"}
            target="_self"
            className="flex items-center text-gray-700g gap-3"
          >
            <IoMailOutline className="h-6 w-6" />
            <span>lalalycheee1@gmail.com</span>
          </Link>

          <Link
            href={"#instagram"}
            target="_self"
            className="flex items-center text-gray-700g gap-3"
          >
            <LuInstagram className="h-6 w-6" />
            <span>lalalycheee1@gmail.com</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
