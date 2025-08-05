import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('')
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => {
                console.log('Lỗi gọi API:', err);
            });
    }, []);

    return (
        <div className="py-8 px-4 grid grid-cols-2 gap-4">
            {categories.map(category => (
                <div key={category.id} className="border rounded-xl py-6 hover:shadow-md cursor-pointer transition">
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <div className="text-lg font-medium">{category.name}</div>
                </div>
            ))}

        </div>
    );
};

export default CategoryList;
