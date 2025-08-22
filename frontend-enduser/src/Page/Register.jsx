import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    // Hàm kiểm tra email hợp lệ
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setMessage("❌ Email không hợp lệ!");
            setIsSuccess(false);
            return;
        }

        if (password !== confirmPassword) {
            setMessage("❌ Mật khẩu xác nhận không khớp!");
            setIsSuccess(false);
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                fullName,
                email,     // ✅ gửi thêm email
                password,
            });

            setMessage("✅ Đăng ký thành công!");
            setIsSuccess(true);
            console.log("Phản hồi từ server:", res.data);
        } catch (err) {
            console.error("Lỗi đăng ký:", err.response?.data || err.message);
            setMessage(
                `❌ Đăng ký thất bại! ${err.response?.data?.message || ""}`
            );
            setIsSuccess(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Đăng ký</h2>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Họ và tên</label>
                        <input
                            type="text"
                            placeholder="Nhập họ và tên..."
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

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
                        <label className="block mb-1 font-medium">Mật khẩu</label>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            placeholder="Nhập lại mật khẩu..."
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
                        Đăng ký
                    </button>
                </form>

                {message && (
                    <div className="mt-4 text-center">
                        <p
                            className={`font-medium ${message.includes("✅") ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {message}
                        </p>

                        {isSuccess && (
                            <Link
                                to="/Login"
                                className="mt-3 inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
                            >
                                Quay về đăng nhập
                            </Link>
                        )}
                    </div>
                )}

                {!isSuccess && (
                    <div className="mt-6 text-sm text-center text-gray-600">
                        <p>
                            Đã có tài khoản?{" "}
                            <Link to="/Login" className="text-blue-500 hover:underline">
                                Đăng nhập
                            </Link>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;
