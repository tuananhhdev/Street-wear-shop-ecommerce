const OrderManager = () => {
    const orders = [
        { id: 101, customer: "Nguyễn Văn A", total: 500000, status: "Đang xử lý" },
        { id: 102, customer: "Trần Thị B", total: 750000, status: "Hoàn thành" },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">🧾 Quản lý đơn hàng</h1>
            <table className="w-full border">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2 border">ID</th>
                        <th className="p-2 border">Khách hàng</th>
                        <th className="p-2 border">Tổng tiền</th>
                        <th className="p-2 border">Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((o) => (
                        <tr key={o.id}>
                            <td className="p-2 border">{o.id}</td>
                            <td className="p-2 border">{o.customer}</td>
                            <td className="p-2 border">{o.total.toLocaleString()}đ</td>
                            <td className="p-2 border">{o.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderManager;
