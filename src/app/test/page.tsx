"use client";
// App.tsx
// Để sử dụng, bạn cần cài đặt lucide-react: npm install lucide-react
import React, { useState, useEffect, useRef } from "react";
import {
  Leaf,
  ShoppingBag,
  Menu,
  X,
  Star,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

// --- GHI CHÚ CẬP NHẬT ---
// 1. Cập nhật mục "TestimonialsSection" để thêm avatar cho mỗi đánh giá của khách hàng.
// 2. Thêm trường `avatarUrl` vào kiểu dữ liệu `Testimonial` và dữ liệu mẫu.
// 3. Điều chỉnh layout của thẻ đánh giá để hiển thị avatar một cách đẹp mắt.

// --- TYPE DEFINITIONS (ĐỊNH NGHĨA KIỂU DỮ LIỆU) ---
type Product = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
};

type Testimonial = {
  id: number;
  quote: string;
  author: string;
  role: string;
  avatarUrl: string; // Thêm trường avatar
};

type Slide = {
  id: number;
  imageUrl: string;
  title: React.ReactNode;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
};

type CollectionSlide = {
  id: number;
  imageUrl: string;
  title: string;
  category: string;
};

type Partner = {
  id: number;
  name: string;
  logoUrl: string;
};

type CraftStep = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

type Experience = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

// --- MOCK DATA (DỮ LIỆU MẪU VỚI ẢNH THỰC TẾ) ---
const heroSlides: Slide[] = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJ1aXRzfGVufDB8fDB8fHww",
    title: (
      <>
        Tinh hoa từ <span className="text-rose-300">Trái Vải</span>
      </>
    ),
    subtitle:
      "Khám phá bộ sưu tập sản phẩm cao cấp được chế tác từ những trái vải tươi ngon và tinh khiết nhất.",
    ctaText: "Khám phá ngay",
    ctaLink: "#products",
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJ1aXRzfGVufDB8fDB8fHww",
    title: (
      <>
        Bộ Sưu Tập <span className="text-rose-300">Quà Tặng Mới</span>
      </>
    ),
    subtitle: "Món quà ý nghĩa và sang trọng cho những người bạn trân quý.",
    ctaText: "Xem bộ sưu tập",
    ctaLink: "#collections",
  },
  {
    id: 3,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1671379041175-782d15092945?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJ1aXRzfGVufDB8fDB8fHww",
    title: (
      <>
        Trà Vải <span className="text-rose-300">Thượng Hạng</span>
      </>
    ),
    subtitle: "Trải nghiệm hương vị độc đáo, đánh thức mọi giác quan.",
    ctaText: "Thử ngay",
    ctaLink: "#products",
  },
];

const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Nước Ép Vải Nguyên Chất",
    description: "Tinh khiết từ 100% vải thiều Lục Ngạn tươi ngon.",
    imageUrl:
      "https://images.unsplash.com/photo-1659482633309-ccd1e316c592?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTZ8fGZydWl0c3xlbnwwfHwwfHx8MA%3D%3D",
    price: "120.000đ",
  },
  {
    id: 2,
    name: "Trà Vải Hoa Lài",
    description:
      "Sự kết hợp tinh tế giữa vị ngọt của vải và hương thơm của hoa lài.",
    imageUrl:
      "https://images.unsplash.com/photo-1622219750989-f24af3d4a7ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fGZydWl0c3xlbnwwfHwwfHx8MA%3D%3D",
    price: "95.000đ",
  },
  {
    id: 3,
    name: "Mứt Vải Dẻo Cao Cấp",
    description: "Món quà ngọt ngào, đậm đà hương vị truyền thống.",
    imageUrl:
      "https://images.unsplash.com/photo-1623227866882-c005c26dfe41?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE0fHxmcnVpdHN8ZW58MHx8MHx8fDA%3D",
    price: "180.000đ",
  },
];

const collectionSlides: CollectionSlide[] = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGZydWl0c3xlbnwwfHwwfHx8MA%3D%3D",
    title: "Vị Ngọt Mùa Hè",
    category: "NƯỚC ÉP",
  },
  {
    id: 2,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1674228288342-d72cf144e5de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGZydWl0c3xlbnwwfHwwfHx8MA%3D%3D",
    title: "Hương Trà Tinh Tế",
    category: "TRÀ VẢI",
  },
  {
    id: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGZydWl0c3xlbnwwfHwwfHx8MA%3D%3D",
    title: "Quà Tặng Doanh Nghiệp",
    category: "QUÀ TẶNG",
  },
  {
    id: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fGZydWl0c3xlbnwwfHwwfHx8MA%3D%3D",
    title: "Mứt Vải Truyền Thống",
    category: "MỨT & KẸO",
  },
  {
    id: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1471943038886-87c772c31367?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fGZydWl0c3xlbnwwfHwwfHx8MA%3D%3D",
    title: "Phiên Bản Giới Hạn",
    category: "ĐẶC BIỆT",
  },
];

const partners: Partner[] = [
  {
    id: 1,
    name: "Gourmet Foods",
    logoUrl:
      "https://placehold.co/200x100/f1f5f9/94a3b8?text=Gourmet+Foods&font=serif",
  },
  {
    id: 2,
    name: "Luxury Hotels",
    logoUrl:
      "https://placehold.co/200x100/f1f5f9/94a3b8?text=Luxury+Hotels&font=serif",
  },
  {
    id: 3,
    name: "The Artistry",
    logoUrl:
      "https://placehold.co/200x100/f1f5f9/94a3b8?text=The+Artistry&font=serif",
  },
  {
    id: 4,
    name: "Elite Events",
    logoUrl:
      "https://placehold.co/200x100/f1f5f9/94a3b8?text=Elite+Events&font=serif",
  },
  {
    id: 5,
    name: "Vinpearl",
    logoUrl:
      "https://placehold.co/200x100/f1f5f9/94a3b8?text=Vinpearl&font=serif",
  },
  {
    id: 6,
    name: "Sofitel",
    logoUrl:
      "https://placehold.co/200x100/f1f5f9/94a3b8?text=Sofitel&font=serif",
  },
  {
    id: 7,
    name: "Golden Spoon",
    logoUrl:
      "https://placehold.co/200x100/f1f5f9/94a3b8?text=Golden+Spoon&font=serif",
  },
  {
    id: 8,
    name: "Prestige Gifts",
    logoUrl:
      "https://placehold.co/200x100/f1f5f9/94a3b8?text=Prestige+Gifts&font=serif",
  },
];

const craftSteps: CraftStep[] = [
  {
    id: 1,
    title: "Tuyển Chọn Tinh Tế",
    description:
      "Từng trái vải được lựa chọn thủ công từ những khu vườn đạt chuẩn, đảm bảo độ chín mọng và hương vị ngọt ngào nhất.",
    imageUrl:
      "https://images.unsplash.com/photo-1552010099-5dc86fcfaa38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fGZydWl0c3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 2,
    title: "Chế Biến Tỉ Mỉ",
    description:
      "Quy trình sản xuất khép kín, ứng dụng công nghệ hiện đại để giữ trọn vẹn dưỡng chất và hương vị tự nhiên của trái vải.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1700145523324-1da4b9000d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODV8fGZydWl0c3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 3,
    title: "Đóng Gói Sang Trọng",
    description:
      "Mỗi sản phẩm là một tác phẩm nghệ thuật, được khoác lên mình bao bì đẳng cấp, tinh xảo trong từng chi tiết.",
    imageUrl:
      "https://images.unsplash.com/photo-1559181567-c3190ca9959b?q=80&w=800&auto=format&fit=crop",
  },
];

const experiences: Experience[] = [
  {
    id: 1,
    title: "Thanh Khiết",
    description:
      "Cảm nhận sự tinh khôi từ những trái vải tươi mọng, được chắt lọc để giữ trọn vị ngọt nguyên bản.",
    imageUrl:
      "https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Ngọt Ngào",
    description:
      "Hòa quyện trong hương vị đậm đà, đánh thức những ký ức và cảm xúc dịu êm nhất.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1675237625753-c01705e314bb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Sang Trọng",
    description:
      "Một trải nghiệm đẳng cấp, nơi sự tinh tế trong hương vị và thiết kế được nâng tầm nghệ thuật.",
    imageUrl:
      "https://images.unsplash.com/photo-1559181567-c3190ca9959b?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Sản phẩm của LALA-LYCHEE thực sự khác biệt. Vị ngọt thanh và hương thơm tự nhiên khiến tôi rất ấn tượng. Bao bì cũng rất sang trọng!",
    author: "Ngọc Anh",
    role: "Chuyên gia ẩm thực",
    avatarUrl: "https://placehold.co/100x100/fecdd3/44403c?text=NA&font=lora",
  },
  {
    id: 2,
    quote:
      "Tôi đã dùng trà vải của LALA-LYCHEE để tiếp đãi đối tác và họ rất thích. Một sản phẩm chất lượng, thể hiện được sự tinh tế của người tặng.",
    author: "Minh Tuấn",
    role: "Giám đốc Doanh nghiệp",
    avatarUrl: "https://placehold.co/100x100/fecdd3/44403c?text=MT&font=lora",
  },
  {
    id: 3,
    quote:
      "Chưa bao giờ tôi nghĩ một sản phẩm từ quả vải lại có thể tinh tế đến vậy. Chắc chắn sẽ ủng hộ LALA-LYCHEE dài dài.",
    author: "Phương Linh",
    role: "Blogger Du lịch",
    avatarUrl: "https://placehold.co/100x100/fecdd3/44403c?text=PL&font=lora",
  },
];

// --- UTILITY FUNCTIONS (HÀM TIỆN ÍCH) ---
const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.target as HTMLImageElement;
  target.onerror = null; // Prevent infinite loop if placeholder fails
  target.src = `https://placehold.co/600x400/fecdd3/44403c?text=Lỗi+Tải+Ảnh`;
};

// --- CUSTOM HOOKS (HOOKS TÙY CHỈNH) ---
const useScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return isScrolled;
};

const useIntersectionObserver = (options: IntersectionObserverInit) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [node, setNode] = useState<HTMLElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      ([entry]) => setEntry(entry),
      options
    );

    const { current: currentObserver } = observer;
    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node, options]);

  return [setNode, entry] as const;
};

// --- UI COMPONENTS (CÁC THÀNH PHẦN GIAO DIỆN) ---
const FadeInWhenVisible: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });
  const isVisible = entry?.isIntersecting;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-1000 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useScroll();
  const navLinks = [
    { name: "Trải Nghiệm", href: "#experience" },
    { name: "Sản Phẩm", href: "#products" },
    { name: "Bộ Sưu Tập", href: "#collections" },
    { name: "Quy Trình", href: "#craft" },
    { name: "Đánh Giá", href: "#testimonials" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 shadow-md backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a
            href="#"
            className={`flex items-center space-x-2 text-2xl font-serif font-bold transition-colors ${
              isScrolled ? "text-slate-800" : "text-white"
            }`}
          >
            <Leaf className="text-rose-500" />
            <span>LALA-LYCHEE</span>
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`transition-colors duration-300 ${
                  isScrolled
                    ? "text-slate-600 hover:text-rose-500"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <button
              className={`hidden md:block px-5 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md ${
                isScrolled
                  ? "bg-rose-500 text-white hover:bg-rose-600"
                  : "bg-white/30 text-white hover:bg-white/40 backdrop-blur-sm"
              }`}
            >
              Mua Ngay
            </button>
            <ShoppingBag
              className={`cursor-pointer transition-colors ${
                isScrolled
                  ? "text-slate-600 hover:text-rose-500"
                  : "text-white hover:text-rose-300"
              }`}
            />
            <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
              <Menu
                className={`${isScrolled ? "text-slate-600" : "text-white"}`}
              />
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="fixed top-0 right-0 h-full w-2/3 max-w-sm bg-white p-6 shadow-xl animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-serif text-xl font-bold text-slate-800">
                Menu
              </h2>
              <button onClick={() => setIsMenuOpen(false)}>
                <X className="text-slate-500" />
              </button>
            </div>
            <nav className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-700 text-lg hover:text-rose-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <button className="w-full mt-8 bg-rose-500 text-white px-4 py-3 rounded-full hover:bg-rose-600 transition-all duration-300">
              Mua Ngay
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

const HeroSliderSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dragStartX = useRef(0);
  const isDragging = useRef(false);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };
  const nextSlide = () =>
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
  const prevSlide = () =>
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + heroSlides.length) % heroSlides.length
    );
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(nextSlide, 5000);
    return () => resetTimeout();
  }, [currentIndex]);
  const goToSlide = (slideIndex: number) => setCurrentIndex(slideIndex);
  const handleDragStart = (clientX: number) => {
    resetTimeout();
    isDragging.current = true;
    dragStartX.current = clientX;
  };
  const handleDragEnd = (clientX: number) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const dragDistance = dragStartX.current - clientX;
    if (dragDistance > 50) nextSlide();
    else if (dragDistance < -50) prevSlide();
    timeoutRef.current = setTimeout(nextSlide, 5000); // Resume auto-play
  };
  const onMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
  const onTouchStart = (e: React.TouchEvent) =>
    handleDragStart(e.touches[0].clientX);
  const onMouseUp = (e: React.MouseEvent) => handleDragEnd(e.clientX);
  const onTouchEnd = (e: React.TouchEvent) =>
    handleDragEnd(e.changedTouches[0].clientX);

  const onMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      timeoutRef.current = setTimeout(nextSlide, 5000);
    }
  };

  return (
    <section
      className="relative h-screen min-h-[700px] w-full overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out select-none ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.imageUrl}
            alt={slide.subtitle}
            onError={handleImageError}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 pointer-events-none"></div>
          <div className="relative container mx-auto px-6 h-full flex flex-col justify-center items-start text-white">
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-2xl pointer-events-none">
              {slide.title}
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-xl text-rose-50 pointer-events-none">
              {slide.subtitle}
            </p>
            <a
              href={slide.ctaLink}
              className="mt-8 inline-flex items-center bg-white text-rose-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-rose-50 transition-all duration-300 transform hover:scale-105"
            >
              {slide.ctaText} <ChevronRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      ))}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2 bg-black/20 rounded-full"
        aria-label="Slide trước"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2 bg-black/20 rounded-full"
        aria-label="Slide tiếp theo"
      >
        <ChevronRight size={32} />
      </button>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {heroSlides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === slideIndex ? "bg-white scale-125" : "bg-white/50"
            }`}
            aria-label={`Đi đến slide ${slideIndex + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

const MarqueeBannerSection: React.FC = () => {
  const bannerItems = [
    "100% Vải Tươi Tuyển Chọn",
    "Công Thức Độc Quyền",
    "Quà Tặng Sang Trọng",
    "Giao Hàng Toàn Quốc",
    "Chất Lượng Hàng Đầu",
  ];
  const marqueeContent = [...bannerItems, ...bannerItems];
  return (
    <section className="bg-rose-50 py-4 border-y border-rose-200/80">
      <div className="relative flex overflow-x-hidden text-rose-800">
        <div className="py-2 animate-marquee whitespace-nowrap flex items-center">
          {marqueeContent.map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="text-base md:text-lg mx-8 font-serif">
                {item}
              </span>
              <Star size={16} className="text-rose-300 fill-current" />
            </div>
          ))}
        </div>
        <div className="absolute top-0 py-2 animate-marquee2 whitespace-nowrap flex items-center">
          {marqueeContent.map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="text-base md:text-lg mx-8 font-serif">
                {item}
              </span>
              <Star size={16} className="text-rose-300 fill-current" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InteractiveShowcaseSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleItemClick = (index: number) => {
    if (index === activeIndex || isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex(index);
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 400);
  };

  return (
    <section
      id="experience"
      className="relative min-h-screen bg-rose-50 py-24 flex items-center justify-center overflow-hidden"
    >
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="gooey-effect">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <FadeInWhenVisible>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-800">
              Trải Nghiệm LALA-LYCHEE
            </h2>
            <p className="mt-3 text-lg text-slate-500 max-w-2xl mx-auto">
              Mỗi sản phẩm là một câu chuyện, một cảm xúc. Hãy chọn trải nghiệm
              của riêng bạn.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className="relative w-full aspect-w-4 aspect-h-5"
              style={{ filter: "url(#gooey-effect)" }}
            >
              <div className="absolute inset-0">
                {experiences.map((exp, index) => (
                  <img
                    key={exp.id}
                    src={exp.imageUrl}
                    alt={exp.title}
                    onError={handleImageError}
                    className={`absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl transition-opacity duration-700 ease-in-out ${
                      index === activeIndex ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>
              {isAnimating && <div className="blob"></div>}
            </div>
            <div className="flex flex-col items-start space-y-8">
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  onClick={() => handleItemClick(index)}
                  className="cursor-pointer group"
                >
                  <h3
                    className={`font-serif text-4xl md:text-5xl font-bold transition-colors duration-300 ${
                      activeIndex === index
                        ? "text-rose-500"
                        : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  >
                    {exp.title}
                  </h3>
                  <p
                    className={`mt-2 text-slate-600 max-w-sm transition-all duration-500 ease-in-out ${
                      activeIndex === index
                        ? "opacity-100 max-h-40"
                        : "opacity-0 max-h-0"
                    }`}
                  >
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeInWhenVisible>
    </section>
  );
};

const AboutSection: React.FC = () => (
  <section id="about" className="py-24 bg-white">
    <FadeInWhenVisible>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="rounded-lg overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZydWl0c3xlbnwwfHwwfHx8MA%3D%3D"
              alt="Vườn vải LALA-LYCHEE"
              onError={handleImageError}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-800">
              Câu Chuyện LALA-LYCHEE
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              LALA-LYCHEE ra đời từ niềm đam mê với trái vải - một loại quả đặc
              sản của Việt Nam. Chúng tôi tin rằng, đằng sau vị ngọt ngào ấy là
              cả một câu chuyện về văn hóa, về sự chăm sóc tỉ mỉ và về tinh hoa
              của đất trời.
            </p>
            <p className="mt-4 text-slate-600">
              Mỗi sản phẩm đều là một tác phẩm nghệ thuật, được tạo ra từ nguồn
              nguyên liệu tuyển chọn khắt khe và quy trình sản xuất hiện đại,
              nhằm mang đến cho bạn trải nghiệm vị giác đẳng cấp và trọn vẹn
              nhất.
            </p>
            <a
              href="#"
              className="mt-6 inline-flex items-center text-rose-600 font-bold group"
            >
              Tìm hiểu thêm
              <ChevronRight className="ml-1 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </FadeInWhenVisible>
  </section>
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
    <div className="relative overflow-hidden h-72">
      <img
        src={product.imageUrl}
        alt={product.name}
        onError={handleImageError}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <button className="bg-white text-rose-600 font-bold px-6 py-3 rounded-full shadow-md transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          Thêm vào giỏ
        </button>
      </div>
    </div>
    <div className="p-6 text-center">
      <h3 className="font-serif text-xl font-bold text-slate-800">
        {product.name}
      </h3>
      <p className="mt-2 text-slate-500 text-sm h-10">{product.description}</p>
      <div className="mt-4">
        <span className="text-lg font-bold text-rose-500">{product.price}</span>
      </div>
    </div>
  </div>
);

const FeaturedProductsSection: React.FC = () => (
  <section id="products" className="py-24 bg-rose-50/50">
    <FadeInWhenVisible>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-800">
            Sản Phẩm Nổi Bật
          </h2>
          <p className="mt-3 text-lg text-slate-500 max-w-2xl mx-auto">
            Những sáng tạo độc đáo từ LALA-LYCHEE, mang đến hương vị không thể
            nào quên.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </FadeInWhenVisible>
  </section>
);

const CoverFlowSliderSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(
    Math.floor(collectionSlides.length / 2)
  );
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % collectionSlides.length);
  const prevSlide = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + collectionSlides.length) % collectionSlides.length
    );
  return (
    <section id="collections" className="py-24 bg-white overflow-hidden">
      <FadeInWhenVisible>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-800">
              Bộ Sưu Tập Đặc Biệt
            </h2>
            <p className="mt-3 text-lg text-slate-500 max-w-2xl mx-auto">
              Khám phá những dòng sản phẩm độc đáo được sáng tạo dành riêng cho
              bạn.
            </p>
          </div>
          <div className="relative w-full h-[500px] flex items-center justify-center coverflow-container">
            <div className="relative w-full h-full flex items-center justify-center">
              {collectionSlides.map((slide, index) => {
                const offset = index - currentIndex;
                const isVisible = Math.abs(offset) <= 2;
                const transformStyle = {
                  transform: `rotateY(${offset * -25}deg) translateX(${
                    offset * 30
                  }%) scale(${1 - Math.abs(offset) * 0.15})`,
                  zIndex: collectionSlides.length - Math.abs(offset),
                  opacity: isVisible ? 1 : 0,
                  transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
                };
                return (
                  <div
                    key={slide.id}
                    className="absolute w-full md:w-1/2 lg:w-1/3 h-full"
                    style={transformStyle}
                  >
                    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
                      <img
                        src={slide.imageUrl}
                        alt={slide.title}
                        onError={handleImageError}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-6 text-white">
                        <p className="text-sm font-bold tracking-widest uppercase text-rose-200">
                          {slide.category}
                        </p>
                        <h3 className="text-2xl font-serif font-bold mt-1">
                          {slide.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-600 transition"
              aria-label="Bộ sưu tập trước"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-600 transition"
              aria-label="Bộ sưu tập tiếp theo"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </FadeInWhenVisible>
    </section>
  );
};

const OurCraftSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section id="craft" className="py-24 bg-rose-50/50">
      <FadeInWhenVisible>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-800">
              Quy Trình Sáng Tạo
            </h2>
            <p className="mt-3 text-lg text-slate-500 max-w-2xl mx-auto">
              Hành trình từ trái vải tươi ngon đến sản phẩm tinh hoa trên tay
              bạn.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl">
              {craftSteps.map((step, index) => (
                <img
                  key={step.id}
                  src={step.imageUrl}
                  alt={step.title}
                  onError={handleImageError}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                    index === activeIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
            <div className="flex flex-col space-y-4">
              {craftSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-white shadow-lg"
                      : "bg-transparent hover:bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mr-6 transition-colors flex-shrink-0 ${
                        activeIndex === index
                          ? "bg-rose-500 text-white"
                          : "bg-rose-200 text-rose-600"
                      }`}
                    >
                      <span className="font-bold text-lg">{`0${
                        index + 1
                      }`}</span>
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-slate-800">
                        {step.title}
                      </h3>
                      <div
                        className={`grid transition-all duration-500 ease-in-out ${
                          activeIndex === index
                            ? "grid-rows-[1fr] opacity-100 pt-1"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="text-slate-600">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeInWhenVisible>
    </section>
  );
};

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dragStartX = useRef(0);
  const isDragging = useRef(false);

  const nextTestimonial = () =>
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  const prevTestimonial = () =>
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(nextTestimonial, 5000);
    return () => resetTimeout();
  }, [currentIndex]);

  const handleDragStart = (clientX: number) => {
    resetTimeout();
    isDragging.current = true;
    dragStartX.current = clientX;
  };

  const handleDragEnd = (clientX: number) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const dragDistance = dragStartX.current - clientX;
    if (dragDistance > 50) nextTestimonial();
    else if (dragDistance < -50) prevTestimonial();
    timeoutRef.current = setTimeout(nextTestimonial, 5000);
  };

  const onMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
  const onTouchStart = (e: React.TouchEvent) =>
    handleDragStart(e.touches[0].clientX);
  const onMouseUp = (e: React.MouseEvent) => handleDragEnd(e.clientX);
  const onTouchEnd = (e: React.TouchEvent) =>
    handleDragEnd(e.changedTouches[0].clientX);

  const onMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      timeoutRef.current = setTimeout(nextTestimonial, 5000);
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-rose-50/50">
      <FadeInWhenVisible>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-800">
              Khách Hàng Nói Về Chúng Tôi
            </h2>
          </div>
          <div
            className="relative max-w-3xl mx-auto h-80 cursor-grab active:cursor-grabbing"
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out select-none ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="relative bg-white pt-16 pb-8 px-8 rounded-lg shadow-xl h-full flex flex-col justify-center border border-rose-100 pointer-events-none">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                    <img
                      src={testimonial.avatarUrl}
                      alt={`Avatar của ${testimonial.author}`}
                      onError={handleImageError}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                    />
                  </div>
                  <div className="flex text-yellow-400 mb-4 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-slate-600 italic text-center text-lg">
                    "{testimonial.quote}"
                  </p>
                  <div className="mt-4 text-center">
                    <p className="font-bold text-slate-800">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={prevTestimonial}
              className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md transition z-10"
              aria-label="Đánh giá trước"
            >
              <ChevronLeft className="text-slate-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md transition z-10"
              aria-label="Đánh giá tiếp theo"
            >
              <ChevronRight className="text-slate-600" />
            </button>
          </div>
        </div>
      </FadeInWhenVisible>
    </section>
  );
};

const PartnerCarouselSection: React.FC = () => {
  const radius = 280;
  const angle = 360 / partners.length;
  return (
    <section className="py-24 bg-white">
      <FadeInWhenVisible>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-800">
              Đối Tác Đồng Hành
            </h2>
            <p className="mt-3 text-lg text-slate-500 max-w-2xl mx-auto">
              LALA-LYCHEE tự hào được tin tưởng bởi các thương hiệu hàng đầu.
            </p>
          </div>
          <div className="scene mx-auto h-[120px] w-[200px]">
            <div className="carousel">
              {partners.map((partner, index) => (
                <div
                  key={partner.id}
                  className="carousel__cell"
                  style={{
                    transform: `rotateY(${
                      index * angle
                    }deg) translateZ(${radius}px)`,
                  }}
                >
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    onError={handleImageError}
                    className="w-32 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeInWhenVisible>
    </section>
  );
};

const CtaSection: React.FC = () => (
  <section id="contact" className="bg-rose-500">
    <div className="container mx-auto px-6 py-20 text-center text-white">
      <h2 className="font-serif text-3xl md:text-4xl font-bold">
        Tham Gia Cộng Đồng LALA-LYCHEE
      </h2>
      <p className="mt-3 text-lg max-w-2xl mx-auto text-rose-100">
        Đăng ký để nhận những ưu đãi độc quyền, thông tin sản phẩm mới và những
        câu chuyện thú vị từ chúng tôi.
      </p>
      <form className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          placeholder="Nhập email của bạn..."
          className="w-full px-5 py-3 rounded-full text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white"
          required
        />
        <button
          type="submit"
          className="bg-white text-rose-600 font-bold px-8 py-3 rounded-full shadow-md hover:bg-rose-50 transition-colors duration-300 whitespace-nowrap"
        >
          Đăng Ký
        </button>
      </form>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="bg-slate-800 text-slate-300">
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <h3 className="font-serif text-xl font-bold text-white mb-4">
            LALA-LYCHEE
          </h3>
          <p className="text-slate-400 max-w-md">
            Mang tinh hoa trái vải Việt Nam đến với thế giới qua những sản phẩm
            đẳng cấp và chỉn chu.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Khám Phá</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#experience"
                className="hover:text-white transition-colors"
              >
                Trải Nghiệm
              </a>
            </li>
            <li>
              <a
                href="#products"
                className="hover:text-white transition-colors"
              >
                Sản Phẩm
              </a>
            </li>
            <li>
              <a
                href="#collections"
                className="hover:text-white transition-colors"
              >
                Bộ Sưu Tập
              </a>
            </li>
            <li>
              <a href="#craft" className="hover:text-white transition-colors">
                Quy Trình
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Cửa Hàng
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Hỗ Trợ</h4>
          <ul className="space-y-2">
            <li>
              <a href="#contact" className="hover:text-white transition-colors">
                Liên Hệ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Chính Sách
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12 border-t border-slate-700 pt-8 text-center text-slate-500 text-sm">
        <p>
          &copy; {new Date().getFullYear()} LALA-LYCHEE. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
);

// --- MAIN APP COMPONENT (COMPONENT CHÍNH) ---
export default function App() {
  return (
    <>
      <style>{`
        /* Global font styles */
        body {
            font-family: 'Inter', sans-serif;
        }
        .font-serif {
            font-family: 'Lora', serif;
        }

        /* Marquee animation */
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-100%); } }
        @keyframes marquee2 { 0% { transform: translateX(100%); } 100% { transform: translateX(0%); } }
        .animate-marquee { animation: marquee 40s linear infinite; }
        .animate-marquee2 { animation: marquee2 40s linear infinite; }
        .group:hover .animate-marquee, .group:hover .animate-marquee2 { animation-play-state: paused; }
        
        /* Coverflow slider perspective */
        .coverflow-container { perspective: 1200px; }

        /* 3D Partner Carousel */
        .scene { perspective: 1000px; }
        .carousel {
            width: 100%;
            height: 100%;
            position: absolute;
            transform-style: preserve-3d;
            animation: rotate-carousel 25s linear infinite;
        }
        .scene:hover .carousel { animation-play-state: paused; }
        .carousel__cell {
            position: absolute;
            width: 200px;
            height: 100px;
            left: 0;
            top: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(241, 245, 249, 0.8);
            border-radius: 0.5rem;
            border: 1px solid rgba(226, 232, 240, 1);
        }
        @keyframes rotate-carousel {
            from { transform: rotateY(0deg); }
            to { transform: rotateY(360deg); }
        }

        /* Gooey effect animation */
        .blob {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 50px;
            height: 50px;
            background-color: #fecdd3; /* Rose-200 */
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: blob-animation 0.8s ease-in-out;
            filter: url(#gooey-effect);
        }

        @keyframes blob-animation {
            0% {
                transform: translate(-50%, -50%) scale(0);
            }
            50% {
                transform: translate(-50%, -50%) scale(15);
            }
            100% {
                transform: translate(-50%, -50%) scale(0);
            }
        }
      `}</style>
      <div className="bg-white font-sans antialiased">
        <Header />
        <main>
          <HeroSliderSection />
          <div className="group">
            <MarqueeBannerSection />
          </div>
          <InteractiveShowcaseSection />
          <AboutSection />
          <FeaturedProductsSection />
          <CoverFlowSliderSection />
          <OurCraftSection />
          <TestimonialsSection />
          <PartnerCarouselSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
