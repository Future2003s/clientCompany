"use client";
import React, { useState, useEffect } from "react";

// Define product types and their price variants, including bilingual names
const productOptions = {
  "165g / 小": [
    { id: "165g-112", name: "Loại 165g - 112.000 VNĐ", price: 112000 },
    { id: "165g-160", name: "Loại 165g - 160.000 VNĐ", price: 160000 },
  ],
  "435g / 大": [
    { id: "435g-266", name: "Loại 435g - 266.000 VNĐ", price: 266000 },
    { id: "435g-380", name: "Loại 435g - 380.000 VNĐ", price: 380000 },
  ],
};

// Define the email template types, changing "shipped" to "confirmed"
type EmailType = "thankyou" | "confirmed" | "delivering" | "";

// Define the type for the order form state, including shipping details
interface OrderFormData {
  customerName: string;
  customerEmail: string;
  products: {
    [key: string]: { quantity: number | "" };
  };
  totalValue: number | "";
  recipientName: string;
  shippingAddress: string;
  recipientPhone: string;
}

// Icon Components (SVG)
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
const AddressIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.76a11.034 11.034 0 005.455 5.455l.76-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

// Loader component with animations
interface LoaderProps {
  isLoading: boolean;
}

const customAnimationStyle = `
  @keyframes crack-effect { 0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; } 40% { transform: scale(1.1) rotate(0deg); opacity: 1; } 60% { transform: scale(1.2) rotate(15deg); opacity: 0; } }
  @keyframes container-wobble { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-8deg); } 75% { transform: rotate(8deg); } }
  @keyframes split-top-left { 0%, 100% { transform: translate(0, 0) scale(1); } 48% { transform: translate(-14px, -16px) scale(0.9) rotate(-3deg); } 50% { transform: translate(-15px, -15px) scale(0.9) rotate(-4deg); opacity: 0.85; } 52% { transform: translate(-16px, -14px) scale(0.9) rotate(-5deg); } }
  @keyframes split-top-right { 0%, 100% { transform: translate(0, 0) scale(1); } 48% { transform: translate(14px, -16px) scale(0.9) rotate(3deg); } 50% { transform: translate(15px, -15px) scale(0.9) rotate(4deg); opacity: 0.85; } 52% { transform: translate(16px, -14px) scale(0.9) rotate(5deg); } }
  @keyframes split-bottom-left { 0%, 100% { transform: translate(0, 0) scale(1); } 48% { transform: translate(-16px, 14px) scale(0.9) rotate(5deg); } 50% { transform: translate(-15px, 15px) scale(0.9) rotate(4deg); opacity: 0.85; } 52% { transform: translate(-14px, 16px) scale(0.9) rotate(3deg); } }
  @keyframes split-bottom-right { 0%, 100% { transform: translate(0, 0) scale(1); } 48% { transform: translate(16px, 14px) scale(0.9) rotate(-5deg); } 50% { transform: translate(15px, 15px) scale(0.9) rotate(-4deg); opacity: 0.85; } 52% { transform: translate(14px, 16px) scale(0.9) rotate(-3deg); } }
  @keyframes loading-dots-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
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
        <div className="flex flex-col items-center">
          <div className="relative w-[150px] h-[150px] animate-container-wobble">
            <div className="absolute inset-0 flex items-center justify-center crack-effect z-10">
              <div className="absolute w-[110%] h-[2px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.7)]"></div>
              <div className="absolute w-[2px] h-[110%] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.7)]"></div>
            </div>
            <div
              className="absolute top-0 left-0 w-full h-full animate-split-top-left"
              style={{ clipPath: "polygon(0 0, 50% 0, 50% 50%, 0 50%)" }}
            >
              <img
                src="https://d3enplyig2yenj.cloudfront.net/logo"
                alt="Top-left corner of logo"
                className="w-full h-full object-contain rounded-full shadow-lg"
              />
            </div>
            <div
              className="absolute top-0 left-0 w-full h-full animate-split-top-right"
              style={{ clipPath: "polygon(50% 0, 100% 0, 100% 50%, 50% 50%)" }}
            >
              <img
                src="https://d3enplyig2yenj.cloudfront.net/logo"
                alt="Top-right corner of logo"
                className="w-full h-full object-contain rounded-full shadow-lg"
              />
            </div>
            <div
              className="absolute top-0 left-0 w-full h-full animate-split-bottom-left"
              style={{ clipPath: "polygon(0 50%, 50% 50%, 50% 100%, 0 100%)" }}
            >
              <img
                src="https://d3enplyig2yenj.cloudfront.net/logo"
                alt="Bottom-left corner of logo"
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
                alt="Bottom-right corner of logo"
                className="w-full h-full object-contain rounded-full shadow-lg"
              />
            </div>
          </div>
<<<<<<< HEAD
=======
          {/* Hiệu ứng 3 chấm đang tải */}
>>>>>>> 276a6ae18ebb88490169a9dd0533c52a67c791b3
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

// Main Order Form Component
const OrderForm: React.FC = () => {
  // Function to generate the initial state for products based on productOptions
  const generateInitialProducts = () => {
    return Object.values(productOptions)
      .flat()
      .reduce((acc, variant) => {
        acc[variant.id] = { quantity: "" };
        return acc;
      }, {} as { [key: string]: { quantity: number | "" } });
  };

  const initialFormData: OrderFormData = {
    customerName: "",
    customerEmail: "",
    products: generateInitialProducts(),
    totalValue: "",
    recipientName: "",
    shippingAddress: "",
    recipientPhone: "",
  };

  const [formData, setFormData] = useState<OrderFormData>(initialFormData);
  const [emailType, setEmailType] = useState<EmailType>("");
  const [emailBody, setEmailBody] = useState("");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Effect to automatically calculate the total order value
  useEffect(() => {
    const total = Object.values(productOptions)
      .flat()
      .reduce((acc, variant) => {
        const quantity = formData.products[variant.id]?.quantity || 0;
        return acc + Number(quantity) * variant.price;
      }, 0);
    setFormData((prevData) => ({
      ...prevData,
      totalValue: total > 0 ? total : "",
    }));
  }, [formData.products]);

  // Effect to automatically generate email content for preview
  useEffect(() => {
    if (!emailType) {
      setEmailBody("");
      return;
    }
<<<<<<< HEAD

    // --- Placeholders for Vietnamese ---
    const customerNameVi = formData.customerName || "[Tên khách hàng]";
    const totalValueVi = formData.totalValue
=======
    const customerName = formData.customerName || "[Tên khách hàng]";
    const totalValue = formData.totalValue
>>>>>>> 276a6ae18ebb88490169a9dd0533c52a67c791b3
      ? new Intl.NumberFormat("vi-VN").format(Number(formData.totalValue)) +
        " VNĐ"
      : "[Tổng giá trị]";
    const productDetailsVi = Object.values(productOptions)
      .flat()
      .filter((variant) => (formData.products[variant.id]?.quantity || 0) > 0)
      .map((variant) => {
        const quantity = formData.products[variant.id].quantity;
        return `- ${variant.name}: ${quantity} sp`;
      })
      .join("\n");

    // --- Placeholders for Japanese ---
    const customerNameJp = formData.customerName || "[顧客名]";
    const totalValueJp = formData.totalValue
      ? new Intl.NumberFormat("ja-JP").format(Number(formData.totalValue)) +
        " VNĐ"
      : "[合計金額]";
    const productDetailsJp = Object.values(productOptions)
      .flat()
      .filter((variant) => (formData.products[variant.id]?.quantity || 0) > 0)
      .map((variant) => {
        const quantity = formData.products[variant.id].quantity;
        return `- ${variant.name.split(" - ")[0]}: ${quantity} 個`; // Simplified name for Japanese
      })
      .join("\n");

    if (
      !productDetailsVi &&
      (emailType === "thankyou" ||
        emailType === "confirmed" ||
        emailType === "delivering")
    ) {
      setEmailBody(
        "Vui lòng nhập số lượng sản phẩm để tạo nội dung email. / 商品数量を入力してください。"
      );
      return;
    }

    let body_vi = "";
    let body_jp = "";

    switch (emailType) {
      case "thankyou":
        body_vi = `Chào ${customerNameVi},\n\nCảm ơn bạn đã đặt hàng tại cửa hàng của chúng tôi.\n\nChi tiết đơn hàng của bạn:\n${productDetailsVi}\n\nTổng cộng: ${totalValueVi}\n\nChúng tôi sẽ thông báo cho bạn khi đơn hàng được vận chuyển.\n\nTrân trọng,`;
        body_jp = `${customerNameJp}様\n\nこの度は、当店をご利用いただき、誠にありがとうございます。\n\nご注文内容は以下の通りです。\n${productDetailsJp}\n\n合計金額: ${totalValueJp}\n\n商品の発送準備が整い次第、改めてご連絡いたします。\n\n今後ともよろしくお願い申し上げます。`;
        break;
      case "confirmed":
        const recipientNameVi = formData.recipientName || "[Tên người nhận]";
        const shippingAddressVi =
          formData.shippingAddress || "[Địa chỉ giao hàng]";
        const recipientPhoneVi = formData.recipientPhone || "[Số điện thoại]";

        const recipientNameJp = formData.recipientName || "[受取人名]";
        const shippingAddressJp = formData.shippingAddress || "[配送先住所]";
        const recipientPhoneJp = formData.recipientPhone || "[電話番号]";

        body_vi = `Chào ${customerNameVi},\n\nCửa hàng chúng tôi đã nhận được đơn hàng của bạn và đang tiến hành xử lý.\n\nThông tin giao hàng:\n- Người nhận: ${recipientNameVi}\n- Địa chỉ: ${shippingAddressVi}\n- Số điện thoại: ${recipientPhoneVi}\n\nChi tiết đơn hàng:\n${productDetailsVi}\n\nTổng cộng: ${totalValueVi}\n\nChúng tôi sẽ thông báo cho bạn khi đơn hàng được vận chuyển.\n\nTrân trọng,`;
        body_jp = `${customerNameJp}様\n\nご注文いただき、誠にありがとうございます。下記の内容でご注文を承りました。\n\nお届け先情報:\n- お名前: ${recipientNameJp}\n- ご住所: ${shippingAddressJp}\n- 電話番号: ${recipientPhoneJp}\n\nご注文内容:\n${productDetailsJp}\n\n合計金額: ${totalValueJp}\n\n商品の発送準備が整い次第、改めてご連絡いたします。\n\n今後ともよろしくお願い申し上げます。`;
        break;
      case "delivering":
        body_vi = `Chào ${customerNameVi},\n\nTin vui! Đơn hàng của bạn đang trên đường giao đến bạn và sẽ được giao trong hôm nay.\n\nSản phẩm trong đơn:\n${productDetailsVi}\n\nTổng tiền: ${totalValueVi}\n\nVui lòng chuẩn bị nhận hàng.\n\nTrân trọng,`;
        body_jp = `${customerNameJp}様\n\nお待たせいたしました。ご注文の商品が本日、お客様の元へお届け予定です。\n\nご注文商品:\n${productDetailsJp}\n\n合計金額: ${totalValueJp}\n\n商品の到着を楽しみにお待ちください。\n\n今後ともよろしくお願い申し上げます。`;
        break;
    }

    // Combine both versions with a separator, Japanese first.
    const combinedBody = `${body_jp}\n\n====================\n\n${body_vi}`;
    setEmailBody(combinedBody);
  }, [emailType, formData]);

  // Handler for general input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handler for quantity input changes
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // name is now the variant ID
    setFormData((prevData) => ({
      ...prevData,
      products: {
        ...prevData.products,
        [name]: { quantity: value === "" ? "" : parseInt(value, 10) },
      },
    }));
  };

  // Handler for form submission
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

    if (
      emailType === "confirmed" &&
      (!formData.recipientName ||
        !formData.shippingAddress ||
        !formData.recipientPhone)
    ) {
      setStatusMessage("Vui lòng điền đầy đủ thông tin giao hàng.");
      setIsSuccess(false);
      setTimeout(() => setStatusMessage(""), 5000);
      return;
    }

    setStatusMessage("Đang gửi...");
    setIsSuccess(null);

    // Transform products data for the backend
    const orderedProducts = Object.entries(formData.products)
      .filter(([_, { quantity }]) => quantity && Number(quantity) > 0)
      .map(([variantId, { quantity }]) => {
        const productDetails = Object.values(productOptions)
          .flat()
          .find((v) => v.id === variantId);
        return {
          id: variantId,
          name: productDetails ? productDetails.name : "Unknown Product",
          price: productDetails ? productDetails.price : 0,
          quantity: Number(quantity),
        };
      });

    // Create a structured payload for the backend
    const payload = {
      emailType: emailType,
      customerInfo: {
        name: formData.customerName,
        email: formData.customerEmail,
      },
      shippingInfo: {
        recipientName: formData.recipientName,
        address: formData.shippingAddress,
        phone: formData.recipientPhone,
      },
      order: {
        products: orderedProducts,
        totalValue: formData.totalValue,
      },
      // The raw, generated email body can still be sent for logging or as a fallback.
      previewEmailBody: emailBody,
    };

    console.log("Dữ liệu gửi đến backend:", payload);

    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true);
      setStatusMessage("Thông tin đơn hàng đã được gửi thành công!");
      setFormData(initialFormData);
      setEmailType("");
      setEmailBody("");
      setTimeout(() => setStatusMessage(""), 5000);
    }, 2000);
  };

  // Effect for initial loading screen
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
          Tạo và gửi Email Đơn hàng / お客様へのメール
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Điền thông tin, chọn mẫu email và gửi cho khách hàng. /
          下記に情報を入力する
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Information Section */}
          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Thông tin khách hàng / お客様情報
            </h3>
            <div>
              <label
                htmlFor="customerName"
                className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 block"
              >
                Tên khách hàng / 氏名
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
                Email khách hàng / メールアドレス
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

          {/* Products Section (Optimized) */}
          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
              <ProductIcon />
              <span className="ml-2">Sản phẩm / ご注文内容</span>
            </h3>
            <div className="space-y-6">
              {Object.entries(productOptions).map(([type, variants]) => (
                <div
                  key={type}
                  className="pt-4 border-t border-gray-200 dark:border-gray-600 first:pt-0 first:border-t-0"
                >
                  <h4 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    Sản phẩm {type}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    {variants.map((variant) => (
                      <div key={variant.id}>
                        <label
                          htmlFor={variant.id}
                          className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 block"
                        >
                          {variant.name}
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <QuantityIcon />
                          </span>
                          <input
                            type="number"
                            id={variant.id}
                            name={variant.id}
                            value={
                              formData.products[variant.id]?.quantity || ""
                            }
                            onChange={handleQuantityChange}
                            placeholder="Số lượng"
                            min="0"
                            className="block w-full pl-10 pr-3 py-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Email Template Selection */}
          <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
              <TemplateIcon />
              <span className="ml-2">
                Chọn mẫu Email / メールのフォーマット文
              </span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(["thankyou", "confirmed", "delivering"] as EmailType[]).map(
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
                      {type === "thankyou" && "Cảm ơn / ありがとうございます"}
                      {type === "confirmed" &&
                        "Xác nhận đơn hàng / ご注文承りました"}
                      {type === "delivering" && "Đang giao / 準備中です"}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Conditional Shipping Information Section */}
          {emailType === "confirmed" && (
            <div className="space-y-4 rounded-lg border border-blue-300 dark:border-blue-700 p-4 bg-blue-50 dark:bg-gray-700/50 transition-all duration-500 ease-in-out">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Thông tin giao hàng / 配送先情報
              </h3>
              <div>
                <label
                  htmlFor="recipientName"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 block"
                >
                  Tên người nhận / 受取人の氏名
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <UserIcon />
                  </span>
                  <input
                    type="text"
                    id="recipientName"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleInputChange}
                    placeholder="Nhập tên người nhận"
                    required={emailType === "confirmed"}
                    className="block w-full pl-10 pr-3 py-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="shippingAddress"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 block"
                >
                  Địa chỉ giao hàng / お届け先住所
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <AddressIcon />
                  </span>
                  <input
                    type="text"
                    id="shippingAddress"
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleInputChange}
                    placeholder="Nhập địa chỉ giao hàng"
                    required={emailType === "confirmed"}
                    className="block w-full pl-10 pr-3 py-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="recipientPhone"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 block"
                >
                  Số điện thoại người nhận / 受取人の電話番号
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <PhoneIcon />
                  </span>
                  <input
                    type="tel"
                    id="recipientPhone"
                    name="recipientPhone"
                    value={formData.recipientPhone}
                    onChange={handleInputChange}
                    placeholder="Nhập số điện thoại"
                    required={emailType === "confirmed"}
                    className="block w-full pl-10 pr-3 py-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Email Body */}
          <div>
            <label
              htmlFor="emailBody"
              className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 block"
            >
              Nội dung Email / メール内容
            </label>
            <textarea
              id="emailBody"
              name="emailBody"
              rows={12}
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              placeholder="Nội dung tiếng Việt và tiếng Nhật sẽ được tạo tự động tại đây..."
              required
              className="block w-full p-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            />
          </div>

          {/* Total Order Value */}
          <div>
            <label
              htmlFor="totalValue"
              className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 block"
            >
              Tổng giá trị đơn hàng (VNĐ) / 合計金額
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
                    ? `${new Intl.NumberFormat("vi-VN").format(
                        Number(formData.totalValue)
                      )} VNĐ`
                    : "0"
                }
                readOnly
                placeholder="Tự động tính toán"
                className="block w-full pl-10 pr-3 py-3 text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg cursor-not-allowed"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-transform transform hover:scale-105 duration-300"
            >
              Gửi thông tin / 入力情報を送信する
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

export default function Page() {
  return <OrderForm />;
}
