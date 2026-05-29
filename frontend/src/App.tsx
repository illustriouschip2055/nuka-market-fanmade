import { Routes, Route, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import VisitPage from "./pages/VisitPage"
import ShopPage from "./pages/ShopPage"
import ProductPage from "./pages/ProductPage"
import ShopCart from "./components/ShopCart"
import ConfirmPage from "./pages/ConfirmPage"
import AccountPage from "./pages/AccountPage"
import ProfilePage from "./pages/ProfilePage"
import AdminPage from "./pages/AdminPage"

function App() {
  const location = useLocation()
  const [showCart, setShowCart] = useState(true)
  const [showNavbar, setShowNavbar] = useState(true)

  useEffect(() => {
    const hiddenRoutes = ['/', '/about', '/visit', '/confirm', '/account', '/me', '/admin']
    const otherRoutes = ['/account', '/admin']

    setShowCart(!hiddenRoutes.includes(location.pathname))
    setShowNavbar(!otherRoutes.includes(location.pathname))
  },[location.pathname])


  return (
    <>
      {
        showNavbar && (
          <Navbar />
        )
      }
      <main>

        <Routes>
          <Route path="/" element={<HomePage />} /> {/* METER MERCH */}
          <Route path="/about" element={<AboutPage />} /> 
          <Route path="/visit" element={<VisitPage />} />
          <Route path="/shop" element={<ShopPage />} />{/* LUEGO dE METER MERCH, HACER FILTROS */}
          <Route path="/shop/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<ConfirmPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/me" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>

      </main>

      {
        showCart && (
          <ShopCart />
        )
      }

      {
        showNavbar && (
          <Footer />
        )
      }
    </>
  )
}

export default App
