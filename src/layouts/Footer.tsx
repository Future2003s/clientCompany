import Link from "next/link";
import React from "react";
import { PiYoutubeLogo } from "react-icons/pi";

function Footer() {
  return (
    <footer
      className={`pt-14 pb-32 bg-[url("/images/footer.png")] bg-left-bottom bg-repeat-x`}
    >
      <div className="relative z-10 container grid lg:grid-cols-4 gap-8">
        <div>
          <h4>Thông Tin Công Ty</h4>
          <Link href={"#youtube"}>
            <PiYoutubeLogo className="h-6 w-6" />
            <span>LALALY-CHEEE</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
