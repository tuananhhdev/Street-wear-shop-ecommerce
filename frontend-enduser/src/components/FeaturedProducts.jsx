import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeaturedProducts = () => {
    const [products, setProduct] = useState([]);

    useEffect(() => {
        axios.get('')
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                console.error('Lỗi khi lấy sản phẩm nổi bật', err);
            });
    }, []);

    return (
        <div className="py-8 px-4">
            <h2 className="font-bold mb-6 text-center text-xl">Sản phẩm nổi bật</h2>
            <div className="grid grid-cols-2 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="border p-4 rounded-lg shadow hover:shadow-md transition">
                        <img src={product.image} alt={product.title} className="h-40 object-contain mx-auto mb-2" />
                        <div className="text-center">
                            <h3 className="font-medium text-base mb-1">{product.title}</h3>
                            <p className="text-red-500 font-semibold">{product.price.toLocaleString()}đ</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default FeaturedProducts;
