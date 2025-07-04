"use client";
import React, { useState, useEffect } from "react";

// Định nghĩa các loại sản phẩm và giá của chúng
const productOptions = {
  "165g": { name: "Loại 165g", price: 50000 }, // Giá ví dụ
  "435g": { name: "Loại 435g", price: 120000 }, // Giá ví dụ
};
type ProductKey = keyof typeof productOptions;
type EmailType = "thankyou" | "shipped" | "delivering" | "";

// Định nghĩa kiểu dữ liệu cho trạng thái của biểu mẫu đơn hàng
interface OrderFormData {
  customerName: string;
  customerEmail: string;
  products: {
    [key in ProductKey]: { quantity: number | "" };
  };
  totalValue: number | "";
}

// Thành phần biểu tượng (SVG)
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />
  </svg>
);
const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);
const ProductIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m0 0v10l8 4m0-14L4 7"
    />
  </svg>
);
const QuantityIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
    />
  </svg>
);
const TotalValueIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 4a1 1 0 000 2h6a1 1 0 100-2H7zm0 4a1 1 0 100 2h6a1 1 0 100-2H7zm-1 4a1 1 0 011-1h2a1 1 0 110 2H7a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
);
const TemplateIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
    <path
      fillRule="evenodd"
      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
      clipRule="evenodd"
    />
  </svg>
);

interface LoaderProps {
  isLoading: boolean;
}

const customAnimationStyle = `
  /* Keyframes cho hiệu ứng nứt vỡ ở trung tâm */
  @keyframes crack-effect {
    0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
    40% { transform: scale(1.1) rotate(0deg); opacity: 1; }
    60% { transform: scale(1.2) rotate(15deg); opacity: 0; }
  }

  /* Keyframes cho hiệu ứng quay/lắc lư của container */
  @keyframes container-wobble {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-8deg); }
    75% { transform: rotate(8deg); }
  }

  /* Keyframes cho các mảnh vỡ (thêm rung lắc) */
  @keyframes split-top-left {
    0%, 100% { transform: translate(0, 0) scale(1); }
    48% { transform: translate(-14px, -16px) scale(0.9) rotate(-3deg); }
    50% { transform: translate(-15px, -15px) scale(0.9) rotate(-4deg); opacity: 0.85; }
    52% { transform: translate(-16px, -14px) scale(0.9) rotate(-5deg); }
  }

  @keyframes split-top-right {
    0%, 100% { transform: translate(0, 0) scale(1); }
    48% { transform: translate(14px, -16px) scale(0.9) rotate(3deg); }
    50% { transform: translate(15px, -15px) scale(0.9) rotate(4deg); opacity: 0.85; }
    52% { transform: translate(16px, -14px) scale(0.9) rotate(5deg); }
  }

  @keyframes split-bottom-left {
    0%, 100% { transform: translate(0, 0) scale(1); }
    48% { transform: translate(-16px, 14px) scale(0.9) rotate(5deg); }
    50% { transform: translate(-15px, 15px) scale(0.9) rotate(4deg); opacity: 0.85; }
    52% { transform: translate(-14px, 16px) scale(0.9) rotate(3deg); }
  }

  @keyframes split-bottom-right {
    0%, 100% { transform: translate(0, 0) scale(1); }
    48% { transform: translate(16px, 14px) scale(0.9) rotate(-5deg); }
    50% { transform: translate(15px, 15px) scale(0.9) rotate(-4deg); opacity: 0.85; }
    52% { transform: translate(14px, 16px) scale(0.9) rotate(-3deg); }
  }

  /* Keyframes cho hiệu ứng 3 chấm đang tải */
  @keyframes loading-dots-bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  /* Áp dụng animation */
  .animate-split-top-left { animation: split-top-left 2.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite; }
  .animate-split-top-right { animation: split-top-right 2.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite; }
  .animate-split-bottom-left { animation: split-bottom-left 2.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite; }
  .animate-split-bottom-right { animation: split-bottom-right 2.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite; }
  
  .crack-effect { animation: crack-effect 2.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite; }

  .animate-container-wobble { animation: container-wobble 2.5s ease-in-out infinite; }
  
  .animate-dot-1 { animation: loading-dots-bounce 1.5s ease-in-out infinite; }
  .animate-dot-2 { animation: loading-dots-bounce 1.5s ease-in-out 0.2s infinite; }
  .animate-dot-3 { animation: loading-dots-bounce 1.5s ease-in-out 0.4s infinite; }
`;

export const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  return (
    <>
      <style>{customAnimationStyle}</style>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-[#f0f2f5] transition-opacity duration-700 ease-in-out ${
          isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isLoading}
        role="status"
      >
        {/* Container cho toàn bộ animation (logo + chấm) */}
        <div className="flex flex-col items-center">
          {/* Container chính giờ đây có thêm hiệu ứng quay */}
          <div className="relative w-[150px] h-[150px] animate-container-wobble">
            {/* Lớp hiệu ứng nứt vỡ */}
            <div className="absolute inset-0 flex items-center justify-center crack-effect z-10">
              <div className="absolute w-[110%] h-[2px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.7)]"></div>
              <div className="absolute w-[2px] h-[110%] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.7)]"></div>
            </div>

            {/* Các mảnh logo */}
            <div
              className="absolute top-0 left-0 w-full h-full animate-split-top-left"
              style={{ clipPath: "polygon(0 0, 50% 0, 50% 50%, 0 50%)" }}
            >
              <img
                src="https://d3enplyig2yenj.cloudfront.net/logo"
                alt="Góc trên trái logo"
                className="w-full h-full object-contain rounded-full shadow-lg"
              />
            </div>
            <div
              className="absolute top-0 left-0 w-full h-full animate-split-top-right"
              style={{ clipPath: "polygon(50% 0, 100% 0, 100% 50%, 50% 50%)" }}
            >
              <img
                src="https://d3enplyig2yenj.cloudfront.net/logo"
                alt="Góc trên phải logo"
                className="w-full h-full object-contain rounded-full shadow-lg"
              />
            </div>
            <div
              className="absolute top-0 left-0 w-full h-full animate-split-bottom-left"
              style={{ clipPath: "polygon(0 50%, 50% 50%, 50% 100%, 0 100%)" }}
            >
              <img
                src="https://d3enplyig2yenj.cloudfront.net/logo"
                alt="Góc dưới trái logo"
                className="w-full h-full object-contain rounded-full shadow-lg"
              />
            </div>
            <div
              className="absolute top-0 left-0 w-full h-full animate-split-bottom-right"
              style={{
                clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)",
              }}
            >
              <img
                src="https://d3enplyig2yenj.cloudfront.net/logo"
                alt="Góc dưới phải logo"
                className="w-full h-full object-contain rounded-full shadow-lg"
              />
            </div>
          </div>
          {/* Hiệu ứng 3 chấm đang tải */}
          <div className="flex space-x-2 mt-12">
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-dot-1"></div>
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-dot-2"></div>
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-dot-3"></div>
          </div>
        </div>
      </div>
    </>
  );
};

// Thành phần chính của biểu mẫu đơn hàng
const OrderForm: React.FC = () => {
  const initialFormData: OrderFormData = {
    customerName: "",
    customerEmail: "",
    products: { "165g": { quantity: "" }, "435g": { quantity: "" } },
    totalValue: "",
  };

  const [formData, setFormData] = useState<OrderFormData>(initialFormData);
  const [emailType, setEmailType] = useState<EmailType>("");
  const [emailBody, setEmailBody] = useState("");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  // Tự động tính tổng giá trị đơn hàng
  useEffect(() => {
    const total = Object.keys(formData.products).reduce((acc, key) => {
      const productKey = key as ProductKey;
      const product = productOptions[productKey];
      const quantity = formData.products[productKey].quantity || 0;
      return acc + Number(quantity) * product.price;
    }, 0);
    setFormData((prevData) => ({
      ...prevData,
      totalValue: total > 0 ? total : "",
    }));
  }, [formData.products]);

  // Tự động tạo nội dung email khi chọn loại email hoặc thông tin đơn hàng thay đổi
  useEffect(() => {
    if (!emailType) {
      setEmailBody("");
      return;
    }
    const customerName = formData.customerName || "[Tên khách hàng]";
    const totalValue = formData.totalValue
      ? new Intl.NumberFormat("vi-VN").format(Number(formData.totalValue)) +
        " VNĐ"
      : "[Tổng giá trị]";
    const productDetails = Object.keys(formData.products)
      .filter((key) => (formData.products[key as ProductKey].quantity || 0) > 0)
      .map((key) => {
        const productKey = key as ProductKey;
        const product = productOptions[productKey];
        const quantity = formData.products[productKey].quantity;
        return `- ${product.name}: ${quantity} sp`;
      })
      .join("\n");

    if (
      !productDetails &&
      (emailType === "thankyou" ||
        emailType === "shipped" ||
        emailType === "delivering")
    ) {
      setEmailBody("Vui lòng nhập số lượng sản phẩm để tạo nội dung email.");
      return;
    }

    let body = "";
    switch (emailType) {
      case "thankyou":
        body = `Chào ${customerName},\n\nCảm ơn bạn đã đặt hàng tại cửa hàng của chúng tôi.\n\nChi tiết đơn hàng của bạn:\n${productDetails}\n\nTổng cộng: ${totalValue}\n\nChúng tôi sẽ thông báo cho bạn khi đơn hàng được vận chuyển.\n\nTrân trọng,`;
        break;
      case "shipped":
        body = `Chào ${customerName},\n\nĐơn hàng của bạn đã được bàn giao cho đơn vị vận chuyển.\n\nChi tiết đơn hàng:\n${productDetails}\n\nTổng cộng: ${totalValue}\n\nBạn có thể theo dõi đơn hàng của mình sớm.\n\nTrân trọng,`;
        break;
      case "delivering":
        body = `Chào ${customerName},\n\nTin vui! Đơn hàng của bạn đang trên đường giao đến bạn và sẽ được giao trong hôm nay.\n\nSản phẩm trong đơn:\n${productDetails}\n\nTổng tiền: ${totalValue}\n\nVui lòng chuẩn bị nhận hàng.\n\nTrân trọng,`;
        break;
    }
    setEmailBody(body);
  }, [emailType, formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const productKey = name as ProductKey;
    setFormData((prevData) => ({
      ...prevData,
      products: {
        ...prevData.products,
        [productKey]: { quantity: value === "" ? "" : parseInt(value, 10) },
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasProducts = Object.values(formData.products).some(
      (p) => (p.quantity || 0) > 0
    );
    if (!hasProducts) {
      setStatusMessage("Vui lòng nhập số lượng cho ít nhất một sản phẩm.");
      setIsSuccess(false);
      setTimeout(() => setStatusMessage(""), 5000);
      return;
    }
    if (!emailType) {
      setStatusMessage("Vui lòng chọn một loại email để gửi.");
      setIsSuccess(false);
      setTimeout(() => setStatusMessage(""), 5000);
      return;
    }

    setStatusMessage("Đang gửi...");
    setIsSuccess(null);

    console.log("Dữ liệu đơn hàng đã gửi:", {
      ...formData,
      emailType,
      emailBody,
    });

    setTimeout(() => {
      setIsSuccess(true);
      setStatusMessage("Thông tin đơn hàng đã được gửi thành công!");
      setFormData(initialFormData);
      setEmailType("");
      setEmailBody("");
      setTimeout(() => setStatusMessage(""), 5000);
    }, 2000);
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Loader isLoading={isLoading} />
      <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Tạo và gửi Email Đơn hàng
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Điền thông tin, chọn mẫu email và gửi cho khách hàng.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Thông tin khách hàng */}
          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Thông tin khách hàng
            </h3>
            <div>
              <label
                htmlFor="customerName"
                className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 block"
              >
                Tên khách hàng
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <UserIcon />
                </span>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  placeholder="Nhập tên khách hàng"
                  required
                  className="block w-full pl-10 pr-3 py-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="customerEmail"
                className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 block"
              >
                Email khách hàng
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <MailIcon />
                </span>
                <input
                  type="email"
                  id="customerEmail"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  placeholder="email@example.com"
                  required
                  className="block w-full pl-10 pr-3 py-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />
              </div>
            </div>
          </div>

          {/* Các sản phẩm */}
          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
              <ProductIcon />
              <span className="ml-2">Sản phẩm</span>
            </h3>
            {Object.keys(productOptions).map((key) => {
              const productKey = key as ProductKey;
              const product = productOptions[productKey];
              return (
                <div key={productKey}>
                  <label
                    htmlFor={productKey}
                    className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 block"
                  >
                    {product.name} - (
                    {new Intl.NumberFormat("vi-VN").format(product.price)}{" "}
                    VNĐ/sp)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <QuantityIcon />
                    </span>
                    <input
                      type="number"
                      id={productKey}
                      name={productKey}
                      value={formData.products[productKey].quantity}
                      onChange={handleQuantityChange}
                      placeholder="Nhập số lượng"
                      min="0"
                      className="block w-full pl-10 pr-3 py-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chọn loại Email */}
          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
              <TemplateIcon />
              <span className="ml-2">Chọn mẫu Email</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(["thankyou", "shipped", "delivering"] as EmailType[]).map(
                (type) => (
                  <div key={type}>
                    <input
                      type="radio"
                      id={type}
                      name="emailType"
                      value={type}
                      checked={emailType === type}
                      onChange={(e) =>
                        setEmailType(e.target.value as EmailType)
                      }
                      className="sr-only peer"
                    />
                    <label
                      htmlFor={type}
                      className="block w-full text-center p-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer peer-checked:border-blue-500 peer-checked:text-blue-600 dark:peer-checked:text-blue-400 dark:peer-checked:border-blue-500 transition-all duration-300"
                    >
                      {type === "thankyou" && "Cảm ơn"}
                      {type === "shipped" && "Đã giao hàng"}
                      {type === "delivering" && "Đang giao"}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Nội dung Email */}
          <div>
            <label
              htmlFor="emailBody"
              className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 block"
            >
              Nội dung Email
            </label>
            <textarea
              id="emailBody"
              name="emailBody"
              rows={10}
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              placeholder="Chọn một mẫu email ở trên để tạo nội dung tự động..."
              required
              className="block w-full p-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            />
          </div>

          {/* Tổng giá trị đơn hàng */}
          <div>
            <label
              htmlFor="totalValue"
              className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 block"
            >
              Tổng giá trị đơn hàng (VNĐ)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <TotalValueIcon />
              </span>
              <input
                type="text"
                id="totalValue"
                name="totalValue"
                value={
                  formData.totalValue
                    ? new Intl.NumberFormat("vi-VN").format(
                        Number(formData.totalValue)
                      )
                    : "0"
                }
                readOnly
                placeholder="Tự động tính toán"
                className="block w-full pl-10 pr-3 py-3 text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg cursor-not-allowed"
              />
            </div>
          </div>

          {/* Nút Gửi */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-transform transform hover:scale-105 duration-300"
            >
              Gửi thông tin
            </button>
          </div>
        </form>

        {statusMessage && (
          <div
            className={`mt-6 p-4 rounded-lg text-center text-sm font-medium ${
              isSuccess
                ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
            }`}
          >
            {statusMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return <OrderForm />;
}
