// "use client"; // Rất quan trọng: Component này cần quản lý state nên phải là Client Component

// import React, { createContext, useState, useContext, useMemo } from "react";

// // Định nghĩa các kiểu dữ liệu
// type Page = "products" | "cart" | "productDetail" | "checkout";
// // ... (Thêm các interface Product, CartItem ở đây)

// interface CartItem {}

// interface AppContextType {
//   currentPage: Page;
//   cartItems: CartItem[];
//   cartItemCount: number;
//   handleNavigate: (page: Page) => void;
//   // ... (Thêm các hàm khác như handleAddToCart, handleBuyNow, ...)
// }

// // Tạo Context
// const AppContext = createContext<AppContextType | null>(null);

// // Tạo Provider Component
// export function AppProvider({ children }: { children: React.ReactNode }) {
//   const [currentPage, setCurrentPage] = useState<Page>("products");
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   // ... (Thêm các state khác như selectedProduct, notification)

//   const cartItemCount = useMemo(() => {
//     return cartItems.reduce((total, item) => total + item.quantity, 0);
//   }, [cartItems]);

//   const handleNavigate = (page: Page) => {
//     setCurrentPage(page);
//     window.scrollTo(0, 0);
//   };

//   // ... (Triển khai các hàm khác: handleAddToCart, handleBuyNow, ...)

//   const value = {
//     currentPage,
//     cartItems,
//     cartItemCount,
//     handleNavigate,
//     // ... (truyền các giá trị và hàm khác)
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// }

// // Tạo một custom hook để sử dụng Context dễ dàng hơn
// export function useAppContext() {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error("useAppContext must be used within an AppProvider");
//   }
//   return context;
// }
