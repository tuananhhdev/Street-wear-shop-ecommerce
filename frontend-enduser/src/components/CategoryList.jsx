import React, { useState } from 'react';

const CategoryList = () => {
    const [categories] = useState([
        { id: 1, image: "/Image/Hoodies-Ni_Den.jpg", name: "Áo thun" },
        { id: 2, image: "/Image/T-Shirts-Đen.jpg", name: "Áo thun đen" },
        { id: 3, image: "/Image/Quan-Rin-Pants.jpg", name: "Quần jean" },
        { id: 4, image: "/Image/Hoodies-Ni-Xam.jpg", name: "Hoodie xám" }
    ]);

    return (
        <div className="py-8 px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map(category => (
                <div
                    key={category.id}
                    className="bg-white border rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer overflow-hidden"
                >
                    <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-40 object-cover"
                    />
                    <div className="p-4 text-center">
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategoryList;
