const Dashboard = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">📊 Dashboard</h1>
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded shadow">Tổng sản phẩm: 120</div>
                <div className="bg-white p-4 rounded shadow">Tổng đơn hàng: 340</div>
                <div className="bg-white p-4 rounded shadow">Khách hàng: 200</div>
                <div className="bg-white p-4 rounded shadow">Doanh thu: 50tr</div>
            </div>
        </div>
    );
};

export default Dashboard;
