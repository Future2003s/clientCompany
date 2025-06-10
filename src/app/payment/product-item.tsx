import Image from "next/image";

function ProductItem({
  imageSrc,
  altText,
  quantity,
  onQuantityChange,
  name,
  price,
  weight,
}: {
  imageSrc: any;
  altText: any;
  quantity: any;
  onQuantityChange: any;
  name: any;
  price: any;
  weight: any;
}) {
  const handleInputChange = (e: any) => {
    const value = parseInt(e.target.value, 10);
    onQuantityChange(isNaN(value) || value < 0 ? 0 : value);
  };

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-xs transition-transform duration-300 hover:scale-105">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{name}</h3>
      <div className="w-48 h-48 mb-4 rounded-lg overflow-hidden shadow-inner">
        <Image
          src={imageSrc}
          alt={altText}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="text-center mb-4">
        <p className="text-2xl font-bold text-indigo-600">
          {price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </p>
        <p className="text-sm text-gray-500 mt-1">{weight}g</p>
      </div>
      <div className="flex items-center gap-3">
        <label
          htmlFor={`quantity-${altText}`}
          className="text-sm font-medium text-gray-700"
        >
          Số lượng:
        </label>
        <input
          type="number"
          id={`quantity-${altText}`}
          value={quantity}
          onChange={handleInputChange}
          className="h-10 w-24 rounded-md border-2 border-gray-300 text-center focus:border-indigo-500 focus:ring-indigo-500"
          min="0"
        />
      </div>
    </div>
  );
}

export default ProductItem;
