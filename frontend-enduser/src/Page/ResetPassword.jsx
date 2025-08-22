import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("❌ Mật khẩu xác nhận không khớp!");
            setIsSuccess(false);
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/api/auth/reset-password", {
                email,
                newPassword,
            });

            setMessage("✅ Đặt lại mật khẩu thành công! Đang chuyển về trang đăng nhập...");
            setIsSuccess(true);
            console.log("Phản hồi từ server:", res.data);

            // Tự động quay về đăng nhập sau 2 giây
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            console.error("Lỗi đặt lại mật khẩu:", err);
            setMessage("❌ Không thể đặt lại mật khẩu!");
            setIsSuccess(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Đặt lại mật khẩu</h2>

                <form onSubmit={handleReset} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="Nhập email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Mật khẩu mới</label>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu mới..."
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Xác nhận mật khẩu mới</label>
                        <input
                            type="password"
                            placeholder="Nhập lại mật khẩu mới..."
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition duration-200"
                    >
                        Cập nhật mật khẩu
                    </button>
                </form>

                {message && (
                    <div className="mt-4 text-center">
                        <p
                            className={`font-medium ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}
                        >
                            {message}
                        </p>

                        {isSuccess && (
                            <Link
                                to="/login"
                                className="mt-3 inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200"
                            >
                                Quay về đăng nhập ngay
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
