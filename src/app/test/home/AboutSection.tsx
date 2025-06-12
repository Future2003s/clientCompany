export const AboutSection = () => {
  return (
    <section className="py-20 px-4 bg-white shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <img
            src="https://placehold.co/600x400/9966CC/FFFFFF?text=Về+Lalalycheee" // Placeholder for about section image
            alt="About Lalalycheee"
            className="rounded-3xl shadow-2xl transform hover:scale-102 transition duration-300"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/600x400/9966CC/FFFFFF?text=Về+Vải+Thiều";
            }}
          />
        </div>
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-900 rounded-xl">
            Về Lalalycheee
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">
            Lalalycheee là dòng vải tiên phong được dệt từ sợi thiều tự nhiên,
            mang đến trải nghiệm độc đáo về sự mềm mại, thoáng khí và thân thiện
            với môi trường. Chúng tôi tự hào giới thiệu một sản phẩm không chỉ
            đẹp mà còn bền vững, góp phần bảo vệ hành tinh.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Với quy trình sản xuất hiện đại và cam kết chất lượng, Lalalycheee
            hứa hẹn sẽ là lựa chọn hoàn hảo cho những ai tìm kiếm sự thoải mái
            và phong cách.
          </p>
        </div>
      </div>
    </section>
  );
};
