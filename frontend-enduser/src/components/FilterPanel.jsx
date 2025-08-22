import React from 'react'

const FilterPanel = ({ filter, setFilter }) => {
    return (
        <div className="flex flex-wrap gap-4 mb-6">
            {/* Category Filter */}
            <select
                value={filter.category}
                onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                className="border px-3 py-1 rounded"
            >
                <option value="">Tất cả danh mục</option>
                <option value="T-Shirts">T-Shirts</option>
                <option value="Pants">Pants</option>
                <option value="Hoodies">Hoodies</option>
            </select>

            {/* Size Filter */}
            <select
                value={filter.size}
                onChange={(e) => setFilter({ ...filter, size: e.target.value })}
                className="border px-3 py-1 rounded"
            >
                <option value="">Tất cả size</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
            </select>

            {/* Color Filter */}
            <select
                value={filter.color}
                onChange={(e) => setFilter({ ...filter, color: e.target.value })}
                className="border px-3 py-1 rounded"
            >
                <option value="">Tất cả màu</option>
                <option value="Đen">Đen</option>
                <option value="Trắng">Trắng</option>
                <option value="Xám">Xám</option>
                <option value="Nâu">Nâu</option>
                <option value="Vàng">Vàng</option>
            </select>

            {/* Sort Filter */}
            <select
                value={filter.sort}
                onChange={(e) => setFilter({ ...filter, sort: e.target.value })}
                className="border px-3 py-1 rounded"
            >
                <option value="">Sắp xếp</option>
                <option value="asc">Giá tăng dần</option>
                <option value="desc">Giá giảm dần</option>
            </select>
        </div>
    )
}

export default FilterPanel