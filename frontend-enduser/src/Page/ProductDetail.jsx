import { useState } from "react";

const ProductDetail = () => {
    // Demo dữ liệu sản phẩm
    const product = {
        id: 1,
        name: "Áo thun Basic",
        description: "Áo thun cotton mềm mịn, thoáng mát, phù hợp cho cả nam và nữ.",
        material: "100% Cotton",
        size: ["S", "M", "L", "XL"],
        colors: ["Đen", "Trắng", "Xanh"],
        price: 250000,
        images: [
            "/Image/Hoodies-Ni_Den.jpg",
            "/Image/Hoodies-Ni_Den.jpg",
            "/Image/Hoodies-Ni_Den.jpg",
        ],
    };

    const relatedProducts = [
        { id: 2, name: "Áo Polo", price: 300000, image: "/Image/Hoodies-Ni_Den.jpg" },
        { id: 3, name: "Áo Hoodie", price: 450000, image: "/Image/Hoodies-Ni_Den.jpg" },
        { id: 4, name: "Áo Sơ mi", price: 400000, image: "/Image/Hoodies-Ni_Den.jpg" },
    ];

    const [mainImage, setMainImage] = useState(product.images[0]);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            alert("Vui lòng chọn size và màu!");
            return;
        }
        alert(`Đã thêm ${product.name} - Size: ${selectedSize}, Màu: ${selectedColor} vào giỏ hàng!`);
    };

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Hình ảnh sản phẩm */}
            <div>
                <img
                    src={mainImage}
                    alt={product.name}
                    className="w-full h-[400px] object-cover rounded-2xl shadow"
                />
                <div className="flex gap-3 mt-4">
                    {product.images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt="thumb"
                            onClick={() => setMainImage(img)}
                            className={`w-20 h-20 object-cover rounded cursor-pointer border ${mainImage === img ? "border-blue-500" : "border-gray-300"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Thông tin sản phẩm */}
            <div>
                <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="mb-1"><strong>Chất liệu:</strong> {product.material}</p>
                <p className="mb-1"><strong>Giá:</strong> {product.price.toLocaleString()}đ</p>

                {/* Chọn size */}
                <div className="mt-4">
                    <label className="font-semibold">Size:</label>
                    <div className="flex gap-3 mt-2">
                        {product.size.map((s) => (
                            <button
                                key={s}
                                onClick={() => setSelectedSize(s)}
                                className={`px-4 py-2 border rounded ${selectedSize === s ? "bg-blue-500 text-white" : "bg-white"
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chọn màu */}
                <div className="mt-4">
                    <label className="font-semibold">Màu:</label>
                    <div className="flex gap-3 mt-2">
                        {product.colors.map((c) => (
                            <button
                                key={c}
                                onClick={() => setSelectedColor(c)}
                                className={`px-4 py-2 border rounded ${selectedColor === c ? "bg-blue-500 text-white" : "bg-white"
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Nút thêm giỏ hàng */}
                <button
                    onClick={handleAddToCart}
                    className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700"
                >
                    Thêm vào giỏ hàng
                </button>
            </div>

            {/* Gợi ý sản phẩm liên quan */}
            <div className="col-span-2 mt-10">
                <h2 className="text-xl font-bold mb-4">Sản phẩm liên quan</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {relatedProducts.map((rp) => (
                        <div
                            key={rp.id}
                            className="border rounded-lg shadow p-3 hover:shadow-lg cursor-pointer"
                        >
                            <img
                                src={rp.image}
                                alt={rp.name}
                                className="w-full h-40 object-cover rounded"
                            />
                            <h3 className="mt-2 font-semibold">{rp.name}</h3>
                            <p className="text-gray-600">{rp.price.toLocaleString()}đ</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
