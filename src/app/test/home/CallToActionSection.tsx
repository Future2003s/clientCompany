export const CallToActionSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-pink-500 to-red-500 text-white text-center rounded-2xl">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg rounded-xl">
          Sẵn Sàng Trải Nghiệm Lalalycheee?
        </h2>
        <p className="text-xl font-light opacity-95 px-4 rounded-xl">
          Khám phá bộ sưu tập sản phẩm làm từ vải thiều độc đáo của chúng tôi
          ngay hôm nay!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button className="px-8 py-4 bg-white text-pink-600 text-lg font-semibold rounded-full shadow-lg hover:bg-gray-100 hover:shadow-xl transition duration-300 transform hover:scale-105">
            Xem Sản Phẩm
          </button>
          <button className="px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-full shadow-lg hover:bg-white hover:text-pink-600 transition duration-300 transform hover:scale-105">
            Liên Hệ
          </button>
        </div>
      </div>
    </section>
  );
};
