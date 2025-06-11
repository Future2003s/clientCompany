// app/payment/page.tsx (hoặc file PaymentPage của bạn)
"use client";
import { useState } from "react";
import ProductItem from "./product-item";
import ProductSmall from "../../../public/products/IMG_0404.png";
import ProductBig from "../../../public/products/IMG_0405.png";

function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const productInfo = {
    small: {
      name: "Mật Ong Hoa Vải 435g",
      nameJp: "ライチ蜂蜜 435g", // Thêm tên tiếng Nhật
      price: 342000,
      weight: 435,
      priceOrigin: 380000,
    },
    big: {
      name: "Mật Ong Hoa Vải 165g",
      nameJp: "ライチ蜂蜜 165g", // Thêm tên tiếng Nhật
      price: 144000,
      weight: 165,
      priceOrigin: 160000,
    },
  };

  const [smallProductQuantity, setSmallProductQuantity] = useState(0);
  const [bigProductQuantity, setBigProductQuantity] = useState(0);

  const smallProductTotal = smallProductQuantity * productInfo.small.price;
  const bigProductTotal = bigProductQuantity * productInfo.big.price;
  const totalQuantity = smallProductQuantity + bigProductQuantity;
  const totalPrice = smallProductTotal + bigProductTotal;

  const handleCreatePaymentLink = async () => {
    if (totalPrice === 0) {
      setError("Vui lòng chọn ít nhất một sản phẩm.");
      return;
    }
    setLoading(true);
    setError(null);

    const orderItems = [];
    if (smallProductQuantity > 0) {
      orderItems.push({
        name: productInfo.small.name,
        quantity: smallProductQuantity,
        price: productInfo.small.price,
      });
    }
    if (bigProductQuantity > 0) {
      orderItems.push({
        name: productInfo.big.name,
        quantity: bigProductQuantity,
        price: productInfo.big.price,
      });
    }

    const orderPayload = {
      amount: totalPrice,
      description: `${totalQuantity} sản phẩm`,
      items: orderItems,
    };

    try {
      const response = await fetch(
        "https://api.lalalycheee.vn/create-payment-link",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Tạo link thanh toán thất bại!");
      }

      const result = await response.json();
      console.log("Response từ server:", result);

      if (result && result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      } else {
        throw new Error("Không nhận được checkoutUrl từ phản hồi của server.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Đã có một lỗi không xác định xảy ra.");
      }
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center md:items-start gap-8">
        <ProductItem
          {...productInfo.small}
          imageSrc={ProductSmall}
          altText="Mật Ong KLT 136g"
          quantity={smallProductQuantity}
          onQuantityChange={setSmallProductQuantity}
        />
        <ProductItem
          {...productInfo.big}
          imageSrc={ProductBig}
          altText="Mật Ong KLT 435g"
          quantity={bigProductQuantity}
          onQuantityChange={setBigProductQuantity}
        />
      </div>

      <div className="container mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Tóm tắt đơn hàng
        </h2>
        <p className="text-sm text-gray-600 text-center mb-5 border-b pb-3">
          (注文概要)
        </p>

        <div className="space-y-3 text-gray-700">
          {/* Item 1: Mật Ong Hoa Vải 165g */}
          {bigProductQuantity > 0 && ( // Chỉ hiển thị nếu số lượng > 0
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <p className="mb-1 sm:mb-0">
                {productInfo.big.name} ({productInfo.big.nameJp})
                <span className="block sm:inline-block sm:ml-2 text-gray-500 text-sm">
                  ({bigProductQuantity} x{" "}
                  {productInfo.big.price.toLocaleString("vi-VN")}đ)
                </span>
              </p>
              <p className="font-semibold text-right sm:text-left">
                {bigProductTotal.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
          )}

          {/* Item 2: Mật Ong Hoa Vải 435g */}
          {smallProductQuantity > 0 && ( // Chỉ hiển thị nếu số lượng > 0
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <p className="mb-1 sm:mb-0">
                {productInfo.small.name} ({productInfo.small.nameJp})
                <span className="block sm:inline-block sm:ml-2 text-gray-500 text-sm">
                  ({smallProductQuantity} x{" "}
                  {productInfo.small.price.toLocaleString("vi-VN")}đ)
                </span>
              </p>
              <p className="font-semibold text-right sm:text-left">
                {smallProductTotal.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
          )}
        </div>
        <hr className="my-4" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xl font-bold">
          <p className="mb-1 sm:mb-0">
            Tổng cộng ({totalQuantity} sản phẩm)
            <span className="block sm:inline-block sm:ml-2 text-gray-600 text-base font-normal">
              (合計 {totalQuantity}点)
            </span>
          </p>
          <p className="text-indigo-600 text-right sm:text-left">
            {totalPrice.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <button
          onClick={handleCreatePaymentLink}
          disabled={loading || totalQuantity === 0}
          className="w-full mt-6 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading && (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {loading ? "Đang xử lý..." : "Tiến hành Thanh toán"}
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
