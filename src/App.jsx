import { BrowserRouter, Routes, Route } from 'react-router'
import { CartProvider } from './context/CartProvider'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import VendorPage from './pages/VendorPage'
import CartPage from './pages/CartPage'
import OrdersPage from './pages/OrdersPage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthProvider'
import SeedPage from './pages/SeedPage.jsx'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="vendor/:id" element={<VendorPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              {import.meta.env.DEV && <Route path="seed" element={<SeedPage />} />}

              {/* Everything inside ProtectedRoute needs a signed-in user */}
              <Route element={<ProtectedRoute />}>
                <Route path="cart" element={<CartPage />} />
                <Route path="orders" element={<OrdersPage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}