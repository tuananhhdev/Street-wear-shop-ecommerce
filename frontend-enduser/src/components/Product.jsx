import React, { useEffect, useState } from 'react'
import ProductCard from './ProdutCard'
import FilterPanel from './FilterPanel'

const mockData = [
    {
        id: 1,
        name: 'Áo thun basic',
        category: 'T-Shirts',
        size: 'M',
        color: 'Đen',
        price: 250000,
        image: ['/Image/T-Shirts-Đen.jpg']
    },
    {
        id: 2,
        name: 'Quần jeans',
        category: 'Pants',
        size: 'L',
        color: 'Xám',
        price: 400000,
        image: ['/Image/Quan-Rin-Pants.jpg']
    },
    {
        id: 3,
        name: 'Hoodie nỉ',
        category: 'Hoodies',
        size: 'XL',
        color: 'Trắng',
        price: 350000,
        image: ['/Image/Hoodies-Ni-Trang.jpg']
    },
    {
        id: 4,
        name: 'Hoodie oversize',
        category: 'Hoodies',
        size: 'L',
        color: 'Đen',
        price: 380000,
        image: ['/Image/Hoodies-Ni_Den.jpg']
    },
    {
        id: 5,
        name: 'Hoodie nỉ cotton',
        category: 'Hoodies',
        size: 'M',
        color: 'Xám',
        price: 360000,
        image: ['/Image/Hoodies-Ni-Xam.jpg']
    },
    {
        id: 6,
        name: 'Hoodie trơn',
        category: 'Hoodies',
        size: 'XL',
        color: 'Nâu',
        price: 370000,
        image: ['/Image/Hoodies-Ni_Den.jpg']
    },
    {
        id: 7,
        name: 'Hoodie unisex',
        category: 'Hoodies',
        size: 'XXL',
        color: 'Vàng',
        price: 390000,
        image: ['/Image/Hoodies-Ni_Den.jpg']
    },
    {
        id: 8,
        name: 'Áo thun in hình',
        category: 'T-Shirts',
        size: 'S',
        color: 'Đỏ',
        price: 280000,
        image: ['/Image/Hoodies-Ni_Den.jpg']
    },
    {
        id: 9,
        name: 'Quần short kaki',
        category: 'Pants',
        size: 'M',
        color: 'Trắng',
        price: 320000,
        image: ['/Image/Hoodies-Ni_Den.jpg']
    }
]

const Product = () => {
    const [products, setProducts] = useState([])
    const [filter, setFilter] = useState({
        category: '',
        size: '',
        color: '',
        sort: ''
    })

    useEffect(() => {
        setProducts(mockData)
    }, [])

    const filtered = products
        .filter(p => filter.category ? p.category === filter.category : true)
        .filter(p => filter.size ? p.size === filter.size : true)
        .filter(p => filter.color ? p.color === filter.color : true)
        .sort((a, b) => {
            if (filter.sort === "asc") return a.price - b.price
            if (filter.sort === "desc") return b.price - a.price
            return 0
        })

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Cửa hàng</h1>
            <FilterPanel filter={filter} setFilter={setFilter} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default Product
