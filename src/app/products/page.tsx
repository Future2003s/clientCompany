"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  ShoppingCart,
  Package,
  CreditCard,
  ChevronLeft,
  Star,
  ArrowRight,
  User,
  Phone,
  MapPin,
  Plus,
  Minus,
} from "lucide-react";
import { useForm } from "react-hook-form";

// --- TYPESCRIPT INTERFACES ---
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  details: string[];
  rating: number;
  reviewCount: number;
  gallery: string[];
}

interface CartItem extends Product {
  quantity: number;
}

// --- MOCK DATA (HONEY PRODUCTS) WITH NEW THEME ---
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Mật Ong Hoa Vải Thanh Hà 435g",
    price: 250000,
    imageUrl:
      "https://placehold.co/800x800/e0f2fe/0c4a6e?text=M%E1%BA%ADt+Ong+L%E1%BB%9Bn",
    description:
      "Mật ong hoa vải nguyên chất từ vùng Thanh Hà, Hải Dương. Hương vị thơm ngon đặc trưng, màu vàng óng tự nhiên, và nhiều lợi ích cho sức khỏe.",
    details: [
      "Nguyên chất 100%",
      "Dung tích: 435g",
      "Xuất xứ: Thanh Hà, Hải Dương",
      "Thích hợp pha đồ uống, làm bánh",
    ],
    rating: 4.9,
    reviewCount: 215,
    gallery: [
      "https://placehold.co/800x800/e0f2fe/0c4a6e?text=M%E1%BA%ADt+Ong+L%E1%BB%9Bn",
      "https://placehold.co/800x800/f0f9ff/0c4a6e?text=G%C3%B3c+Nghi%C3%AAng",
      "https://placehold.co/800x800/e0f2fe/0c4a6e?text=Chi+Ti%E1%BA%BFt",
      "https://placehold.co/800x800/f0f9ff/0c4a6e?text=S%C3%A1nh+M%E1%BB%8Bn",
    ],
  },
  {
    id: 2,
    name: "Mật Ong Hoa Vải Thanh Hà 165g",
    price: 150000,
    imageUrl:
      "https://placehold.co/800x800/e0f2fe/0c4a6e?text=M%E1%BA%ADt+Ong+Nh%E1%BB%8F",
    description:
      "Chai mật ong hoa vải nhỏ gọn, tiện lợi mang theo hoặc làm quà tặng. Giữ trọn hương vị nguyên bản của mật ong Thanh Hà.",
    details: [
      "Nguyên chất 100%",
      "Dung tích: 165g",
      "Thiết kế nhỏ gọn, tiện lợi",
      "Làm quà tặng ý nghĩa",
    ],
    rating: 4.8,
    reviewCount: 188,
    gallery: [
      "https://placehold.co/800x800/e0f2fe/0c4a6e?text=M%E1%BA%ADt+Ong+Nh%E1%BB%8F",
      "https://placehold.co/800x800/f0f9ff/0c4a6e?text=G%C3%B3c+Ch%E1%BB%A5p",
      "https://placehold.co/800x800/e0f2fe/0c4a6e?text=Tr%C3%AAn+Tay",
    ],
  },
];

// --- HELPER FUNCTIONS ---
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

// --- UI COMPONENTS ---

const ProductCard: React.FC<{
  product: Product;
  onSelectProduct: (productId: number) => void;
}> = ({ product, onSelectProduct }) => {
  return (
    <div
      className="bg-white/40 backdrop-blur-md border border-white/20 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group cursor-pointer"
      onClick={() => onSelectProduct(product.id)}
    >
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="text-white font-semibold border-2 border-white rounded-full px-4 py-2">
            Xem chi tiết
          </span>
        </div>
      </div>
      <div className="p-5 text-center">
        <h3 className="text-lg font-semibold text-sky-900 h-14">
          {product.name}
        </h3>
        <p className="mt-2 text-xl font-bold text-sky-700">
          {formatCurrency(product.price)}
        </p>
      </div>
    </div>
  );
};

const ProductListPage: React.FC<{
  products: Product[];
  onSelectProduct: (productId: number) => void;
}> = ({ products, onSelectProduct }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1
        className="text-4xl md:text-5xl font-bold text-center text-white mb-4"
        style={{ textShadow: "1px 1px 3px rgba(14, 116, 144, 0.3)" }}
      >
        Khám phá Sản Phẩm <span className="text-sky-200">Tuyệt Vời</span>
      </h1>
      <p className="text-center text-sky-100 text-lg mb-8">
        Hương vị ngọt ngào từ thiên nhiên
      </p>

      {/* Search Bar */}
      <div className="mb-12 flex justify-center">
        <div className="relative w-full max-w-2xl">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full px-6 py-4 pr-12 border border-white/20 bg-white/30 backdrop-blur-lg rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-sky-200/50 text-lg text-white placeholder:text-sky-100 transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Tìm kiếm sản phẩm"
          />
          <svg
            className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-sky-100"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white/40 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl max-w-md mx-auto">
          <Package size={64} className="mx-auto text-sky-200 mb-4" />
          <p className="text-xl text-white">Không tìm thấy sản phẩm</p>
          <p className="text-sky-100 mt-2">
            Rất tiếc, không có sản phẩm nào cho từ khóa "{searchTerm}".
          </p>
        </div>
      )}
    </div>
  );
};

const ProductDetailPage: React.FC<{
  product: Product;
  onAddToCart: (
    product: Product,
    quantity: number,
    showNotification: boolean
  ) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  onNavigate: (page: "products" | "cart") => void;
}> = ({ product, onAddToCart, onBuyNow, onNavigate }) => {
  const [selectedImage, setSelectedImage] = useState(product.gallery[0]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedImage(product.gallery[0]);
    setQuantity(1);
  }, [product]);

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => onNavigate("products")}
        className="flex items-center text-white hover:text-sky-200 font-semibold mb-8"
      >
        <ChevronLeft size={20} className="mr-2" />
        Tất cả sản phẩm
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-6 md:p-8">
        {/* Image Gallery */}
        <div className="flex flex-col items-center">
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg mb-4"
          />
          <div className="flex space-x-3">
            {product.gallery.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-all duration-200 ${
                  selectedImage === img
                    ? "border-sky-400"
                    : "border-transparent hover:border-sky-200"
                }`}
              />
            ))}
          </div>
        </div>
        {/* Product Info */}
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-sky-900">
            {product.name}
          </h1>
          <div className="flex items-center my-4">
            <div className="flex items-center text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  strokeWidth={1.5}
                  fill={
                    i < Math.round(product.rating) ? "currentColor" : "none"
                  }
                  className="drop-shadow-sm"
                />
              ))}
            </div>
            <span className="ml-3 text-sky-800">
              {product.rating.toFixed(1)} ({product.reviewCount} đánh giá)
            </span>
          </div>
          <p className="text-3xl font-bold text-sky-700 mb-6">
            {formatCurrency(product.price)}
          </p>
          <p className="text-sky-800 leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="flex items-center mb-6">
            <label className="text-sky-800 font-semibold mr-4">Số lượng:</label>
            <div className="flex items-center border border-sky-200 bg-white/50 rounded-lg">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 text-sky-800 hover:bg-sky-100/50 rounded-l-lg"
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-bold text-sky-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 text-sky-800 hover:bg-sky-100/50 rounded-r-lg"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => onAddToCart(product, quantity, true)}
              className="w-full bg-white/70 text-sky-800 font-bold py-3 px-4 rounded-lg hover:bg-white transition-all duration-300 flex items-center justify-center space-x-2 text-base border border-sky-200 shadow-md"
            >
              <ShoppingCart size={22} />
              <span>Thêm vào giỏ</span>
            </button>
            <button
              onClick={() => onBuyNow(product, quantity)}
              className="w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-700 transition-all duration-300 flex items-center justify-center space-x-2 text-base shadow-lg hover:shadow-sky-400/50"
            >
              <span>Mua Ngay</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShoppingCartPage: React.FC<{
  cartItems: CartItem[];
  onNavigate: (page: "products" | "cart" | "checkout") => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}> = ({ cartItems, onNavigate, onUpdateQuantity }) => {
  const subtotal = useMemo(
    () =>
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );
  const shippingFee = 30000;
  const total = subtotal + shippingFee;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1
        className="text-3xl font-bold text-white mb-8 text-center"
        style={{ textShadow: "1px 1px 3px rgba(14, 116, 144, 0.3)" }}
      >
        Giỏ hàng của bạn
      </h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-white/40 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl max-w-md mx-auto">
          <Package size={64} className="mx-auto text-sky-200 mb-4" />
          <p className="text-xl text-white">Giỏ hàng của bạn đang trống.</p>
          <button
            onClick={() => onNavigate("products")}
            className="mt-6 bg-sky-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-sky-700 transition-colors"
          >
            Khám phá sản phẩm
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-white/70 backdrop-blur-xl border border-white/20 p-4 rounded-xl shadow-md"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg mr-4"
                />
                <div className="flex-grow">
                  <p className="font-semibold text-sky-900">{item.name}</p>
                  <p className="text-sm text-sky-700">
                    {formatCurrency(item.price)}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() =>
                      onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="w-8 h-8 rounded-full border border-sky-200 text-sky-700 bg-white/50 hover:bg-white"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-semibold text-sky-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full border border-sky-200 text-sky-700 bg-white/50 hover:bg-white"
                  >
                    +
                  </button>
                </div>
                <p className="w-32 text-right font-bold text-sky-600">
                  {formatCurrency(item.price * item.quantity)}
                </p>
                <button
                  onClick={() => onUpdateQuantity(item.id, 0)}
                  className="ml-4 text-gray-400 hover:text-red-500 text-2xl font-light"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-6 h-fit sticky top-24">
            <h2 className="text-xl font-semibold mb-4 text-sky-900">
              Tóm tắt đơn hàng
            </h2>
            <div className="space-y-3 text-sky-800">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span>{formatCurrency(shippingFee)}</span>
              </div>
              <div className="border-t border-sky-200/50 my-3"></div>
              <div className="flex justify-between font-bold text-lg text-sky-900">
                <span>Tổng cộng</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate("checkout")}
              className="w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-lg mt-6 hover:bg-sky-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-sky-400/50"
            >
              <CreditCard size={20} />
              <span>Tiến hành thanh toán</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const CheckoutPage: React.FC<{
  cartItems: CartItem[];
  onNavigate: (page: "cart" | "products") => void;
  onOrderComplete: () => void;
}> = ({ cartItems, onNavigate, onOrderComplete }) => {
  const subtotal = useMemo(
    () =>
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );
  const shippingFee = 30000;
  const total = subtotal + shippingFee;

  const { register, handleSubmit } = useForm();

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   onOrderComplete();
  // };

  const handleData = (data: any) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => onNavigate("cart")}
        className="flex items-center text-white hover:text-sky-200 font-semibold mb-8"
      >
        <ChevronLeft size={20} className="mr-2" />
        Quay lại giỏ hàng
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        <div className="lg:col-span-3 bg-white/80 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-sky-900 mb-6">
            Thông tin giao hàng
          </h1>
          <form onSubmit={handleSubmit(handleData)} className="space-y-5">
            <div className="relative">
              <label className="block text-sm font-medium text-sky-800 mb-1">
                Họ và tên
              </label>
              <User className="absolute left-3 top-9 text-gray-400" size={20} />
              <input
                type="text"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500 bg-white text-sky-900 placeholder:text-gray-500"
                placeholder="Nguyễn Văn A"
                {...register("name")}
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-sky-800 mb-1">
                Số điện thoại
              </label>
              <Phone
                className="absolute left-3 top-9 text-gray-400"
                size={20}
              />
              <input
                type="tel"
                {...register("phone_number")}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500 bg-white text-sky-900 placeholder:text-gray-500"
                placeholder="09xxxxxxxx"
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-sky-800 mb-1">
                Địa chỉ giao hàng
              </label>
              <MapPin
                className="absolute left-3 top-9 text-gray-400"
                size={20}
              />
              <input
                type="text"
                {...register("address")}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500 bg-white text-sky-900 placeholder:text-gray-500"
                placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-lg mt-6 hover:bg-sky-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-sky-400/50"
            >
              Hoàn tất đơn hàng
            </button>
          </form>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-6 h-fit sticky top-24">
            <h2 className="text-xl font-semibold mb-4 text-sky-900">
              Đơn hàng của bạn
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div className="flex-grow">
                    <p className="font-semibold text-sm text-sky-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-sky-700">SL: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-sky-600">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-sky-200/50 mt-4 pt-4 space-y-3 text-sky-800">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span>{formatCurrency(shippingFee)}</span>
              </div>
              <div className="border-t border-sky-200/50 my-3"></div>
              <div className="flex justify-between font-bold text-lg text-sky-900">
                <span>Tổng cộng</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- NEW, INTEGRATED HEADER COMPONENT ---

// --- MAIN APP COMPONENT ---
type Page = "products" | "cart" | "productDetail" | "checkout";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("products");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "info";
  } | null>(null);

  const showNotification = (
    message: string,
    type: "success" | "info" = "success"
  ) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleNavigate = (page: Page) => {
    if (page !== "productDetail") {
      setSelectedProductId(null);
    }
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSelectProduct = (productId: number) => {
    setSelectedProductId(productId);
    setCurrentPage("productDetail");
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (
    product: Product,
    quantity: number,
    showNotif: boolean
  ) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
    if (showNotif) {
      showNotification(`Đã thêm ${quantity} "${product.name}" vào giỏ!`);
    }
  };

  const handleBuyNow = (product: Product, quantity: number) => {
    handleAddToCart(product, quantity, false);
    handleNavigate("checkout");
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId ? { ...item, quantity: quantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleOrderComplete = () => {
    showNotification("Đặt hàng thành công! Cảm ơn bạn.", "info");
    setCartItems([]);
    handleNavigate("products");
  };

  const cartItemCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const renderPage = () => {
    switch (currentPage) {
      case "productDetail":
        const selectedProduct = mockProducts.find(
          (p) => p.id === selectedProductId
        );
        return selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onNavigate={handleNavigate}
          />
        ) : (
          (handleNavigate("products"), null)
        );
      case "checkout":
        return cartItems.length > 0 ? (
          <CheckoutPage
            cartItems={cartItems}
            onNavigate={handleNavigate}
            onOrderComplete={handleOrderComplete}
          />
        ) : (
          (handleNavigate("products"), null)
        );
      case "cart":
        return (
          <ShoppingCartPage
            cartItems={cartItems}
            onNavigate={handleNavigate}
            onUpdateQuantity={handleUpdateQuantity}
          />
        );
      case "products":
      default:
        return (
          <ProductListPage
            products={mockProducts}
            onSelectProduct={handleSelectProduct}
          />
        );
    }
  };

  return (
    <div className="min-h-screen font-sans app-background">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      {notification && (
        <div
          className={`fixed top-28 right-5 backdrop-blur-lg border py-2 px-4 rounded-lg shadow-lg z-50 animate-fade-in-out
            ${
              notification.type === "success"
                ? "bg-green-100/50 border-green-200/50 text-green-800"
                : "bg-blue-100/50 border-blue-200/50 text-blue-800"
            }`}
        >
          {notification.message}
        </div>
      )}

      <main>{renderPage()}</main>
      <style>{`
            .app-background {
                background-color: #0c4a6e;
                background-image: 
                    radial-gradient(at 10% 20%, hsla(204, 80%, 85%, 0.3) 0px, transparent 50%),
                    radial-gradient(at 80% 10%, hsla(199, 70%, 75%, 0.2) 0px, transparent 50%),
                    radial-gradient(at 90% 90%, hsla(210, 65%, 80%, 0.3) 0px, transparent 50%);
            }
            @keyframes fade-in-out {
              0% { opacity: 0; transform: translateY(-20px); }
              15% { opacity: 1; transform: translateY(0); }
              85% { opacity: 1; transform: translateY(0); }
              100% { opacity: 0; transform: translateY(-20px); }
            }
            .animate-fade-in-out {
              animation: fade-in-out 3s ease-in-out forwards;
            }
        `}</style>
    </div>
  );
}
