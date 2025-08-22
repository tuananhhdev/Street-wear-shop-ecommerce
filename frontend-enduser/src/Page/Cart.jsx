import { useState } from "react";

const Cart = () => {
    // Demo giỏ hàng
    const [cart, setCart] = useState([
        { id: 1, name: "Áo thun Basic", price: 250000, quantity: 1, image: "/Image/Hoodies-Ni_Den.jpg" },
        { id: 2, name: "Áo Polo", price: 300000, quantity: 2, image: "/Image/Hoodies-Ni_Den.jpg" },
    ]);

    const [customer, setCustomer] = useState({
        name: "",
        phone: "",
        address: "",
        payment: "COD",
    });

    // Cập nhật số lượng
    const updateQuantity = (id, qty) => {
        if (qty < 1) return;
        setCart(
            cart.map((item) =>
                item.id === id ? { ...item, quantity: qty } : item
            )
        );
    };

    // Xóa sản phẩm
    const removeItem = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    // Tính tổng tiền
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Xử lý đặt hàng
    const handleOrder = () => {
        if (!customer.name || !customer.phone || !customer.address) {
            alert("Vui lòng nhập đầy đủ thông tin khách hàng!");
            return;
        }
        alert(
            `Đặt hàng thành công!\nTên: ${customer.name}\nSĐT: ${customer.phone}\nĐịa chỉ: ${customer.address}\nThanh toán: ${customer.payment}\nTổng tiền: ${total.toLocaleString()}đ`
        );
    };

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Danh sách giỏ hàng */}
            <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4">Giỏ hàng</h2>
                {cart.length === 0 ? (
                    <p>Giỏ hàng trống.</p>
                ) : (
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 border p-3 rounded-lg shadow">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                <div className="flex-1">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p>{item.price.toLocaleString()}đ</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            className="px-2 py-1 border rounded"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                                            className="w-12 text-center border rounded"
                                        />
                                        <button
                                            className="px-2 py-1 border rounded"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-500 font-bold"
                                >
                                    Xóa
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Form thanh toán */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Thanh toán</h2>
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Họ tên"
                        className="w-full border p-2 rounded"
                        value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Số điện thoại"
                        className="w-full border p-2 rounded"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    />
                    <textarea
                        placeholder="Địa chỉ"
                        className="w-full border p-2 rounded"
                        value={customer.address}
                        onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    />
                    <div>
                        <label className="font-semibold">Phương thức thanh toán:</label>
                        <div className="mt-2 space-y-1">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="COD"
                                    checked={customer.payment === "COD"}
                                    onChange={(e) => setCustomer({ ...customer, payment: e.target.value })}
                                />
                                Thanh toán khi nhận hàng (COD)
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="Chuyển khoản"
                                    checked={customer.payment === "Chuyển khoản"}
                                    onChange={(e) => setCustomer({ ...customer, payment: e.target.value })}
                                />
                                Chuyển khoản ngân hàng
                            </label>
                        </div>
                    </div>

                    <p className="font-bold text-lg">Tổng: {total.toLocaleString()}đ</p>

                    <button
                        onClick={handleOrder}
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                    >
                        Đặt hàng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
