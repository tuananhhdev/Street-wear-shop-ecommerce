import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product.id}`}>
            <div className="border rounded overflow-hidden shadow hover:shadow-lg transition group">
                <div className="relative w-full h-64">
                    <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                    />
                    <img
                        src={product.image[1]}
                        alt={`${product.name} hover`}
                        className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    />
                </div>
                <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-red-500">{product.price.toLocaleString()}đ</p>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard