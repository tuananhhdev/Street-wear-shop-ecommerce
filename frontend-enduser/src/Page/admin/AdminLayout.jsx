import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-60 bg-gray-800 text-white p-4">
                <h2 className="text-lg font-bold mb-6">Admin Panel</h2>
                <nav className="flex flex-col gap-3">
                    <Link to="/admin/dashboard" className="hover:text-blue-300">📊 Dashboard</Link>
                    <Link to="/admin/products" className="hover:text-blue-300">📦 Quản lý sản phẩm</Link>
                    <Link to="/admin/orders" className="hover:text-blue-300">🧾 Quản lý đơn hàng</Link>
                    <Link to="/admin/customers" className="hover:text-blue-300">👥 Quản lý khách hàng</Link>
                    <Link to="/admin/statistics" className="hover:text-blue-300">📈 Thống kê</Link>
                </nav>
            </aside>

            {/* Nội dung chính */}
            <main className="flex-1 p-6 bg-gray-100">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
