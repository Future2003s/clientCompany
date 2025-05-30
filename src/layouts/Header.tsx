import Link from "next/link";
import React, { Fragment } from "react";
import HeaderDropDownMenu from "./header-dropdown-menu";
import HeaderShopingCart from "./header-shoping-cart";

function Header(): React.JSX.Element {
  return (
    <Fragment>
      <header className="fixed w-full top-0 z-50 bg-white shadow">
        <div className="container flex items-center justify-between gap-5 h-20">
          <Link href={"/"} className="text-red-800 text-4xl font-bold italic">
            LALALY-CHEEE
          </Link>
          <div className="hidden lg:flex justify-center gap-12">
            <Link href={"/"}>Trang Chủ</Link>
            <Link href={"/products"}>Sản Phẩm</Link>
            <Link href={"/about"}>Thông Tin Về</Link>
          </div>
          <div className="flex justify-center items-center gap-4">
            <HeaderDropDownMenu />
            <HeaderShopingCart />
          </div>
        </div>
      </header>
    </Fragment>
  );
}

export default Header;
