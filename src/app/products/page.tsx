import ProductsList from "@/components/pages/products/product-list";
import React from "react";

export default function ProductPage() {
  return (
    <div className={"container my-14"}>
      <h1 className={"text-2xl font-semibold mb-8"}>Tất cả sản phẩm</h1>
      <ProductsList />
    </div>
  );
}
