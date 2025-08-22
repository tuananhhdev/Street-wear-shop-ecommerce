const ProductManager = () => {
    const products = [
        { id: 1, name: "Áo thun", price: 200000 },
        { id: 2, name: "Áo hoodie", price: 400000 },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">📦 Quản lý sản phẩm</h1>
            <table className="w-full border">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2 border">ID</th>
                        <th className="p-2 border">Tên sản phẩm</th>
                        <th className="p-2 border">Giá</th>
                        <th className="p-2 border">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p.id}>
                            <td className="p-2 border">{p.id}</td>
                            <td className="p-2 border">{p.name}</td>
                            <td className="p-2 border">{p.price.toLocaleString()}đ</td>
                            <td className="p-2 border">
                                <button className="px-2 py-1 bg-yellow-400 rounded mr-2">Sửa</button>
                                <button className="px-2 py-1 bg-red-500 text-white rounded">Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductManager;
