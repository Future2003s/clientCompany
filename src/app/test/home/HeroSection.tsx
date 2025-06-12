import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center p-4 bg-gradient-to-r from-red-600 to-pink-600 text-white overflow-hidden">
      {/* Background overlay for subtle effect */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Image of lychee in the background for visual appeal */}
      <Image
        src="https://placehold.co/1920x1080/FF3366/FFFFFF?text=Lalalycheee+Fabric" // Placeholder image for a lychee-themed fabric
        alt="Lalalycheee Fabric"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-70"
        onError={(e) => {
          e.currentTarget.src =
            "https://placehold.co/1920x1080/FF3366/FFFFFF?text=Vải+Thiều+Lalalycheee";
        }}
      />

      {/* Content wrapper with z-index to appear above background */}
      <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight drop-shadow-lg rounded-xl">
          Lalalycheee: Vải Thiều Tinh Túy
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl font-light opacity-95 px-4 rounded-xl">
          Khám phá sự mềm mại, thoáng mát và bền vững từ sợi vải thiều tự nhiên.
        </p>
        <button className="px-8 py-4 bg-white text-pink-600 text-lg font-semibold rounded-full shadow-lg hover:bg-gray-100 hover:shadow-xl transition duration-300 transform hover:scale-105">
          Tìm hiểu thêm
        </button>
      </div>
    </section>
  );
}
