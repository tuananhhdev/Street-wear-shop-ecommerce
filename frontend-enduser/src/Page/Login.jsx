import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            });

            setMessage("✅ Đăng nhập thành công!");
            console.log("Phản hồi từ server:", res.data);

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
            }
        } catch (err) {
            console.error("Lỗi đăng nhập:", err);
            setMessage("❌ Đăng nhập thất bại!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập</h2>

                <form onSubmit={handleLogin} className="space-y-4">
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

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition duration-200"
                    >
                        Đăng nhập
                    </button>
                </form>

                {message && (
                    <p
                        className={`mt-4 text-center font-medium ${message.includes("✅") ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {message}
                    </p>
                )}

                {/* Footer đăng ký và quên mật khẩu */}
                <div className="mt-6 text-sm text-center text-gray-600">
                    <p>
                        Chưa có tài khoản?{" "}
                        <Link to="/Register" className="text-blue-500 hover:underline">
                            Đăng ký
                        </Link>
                    </p>
                    <p className="mt-2">
                        <Link to="/ResetPassword" className="text-blue-500 hover:underline">
                            Quên mật khẩu?
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
