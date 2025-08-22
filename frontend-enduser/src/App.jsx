import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Page/Home'
import Shop from './Page/Shop'
import Login from './components/Login'
import Register from './components/Register'
import ResetPassword from './components/ResetPassword'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Trang mặc định là ProductDetail */}
        <Route path="/" element={<Cart></Cart>} />
        <Route path="/ProductDetail" element={<ProductDetail />} />

        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />

        {/* Có thể xem chi tiết sản phẩm theo id */}

      </Routes>
    </BrowserRouter>
  )
}

export default App
