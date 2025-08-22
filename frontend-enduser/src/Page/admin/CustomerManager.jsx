const CustomerManager = () => {
    const customers = [
        { id: 1, name: "Nguyễn Văn A", phone: "0123456789" },
        { id: 2, name: "Trần Thị B", phone: "0987654321" },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">👥 Quản lý khách hàng</h1>
            <ul className="list-disc pl-6">
                {customers.map((c) => (
                    <li key={c.id}>
                        {c.name} - {c.phone}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerManager;
