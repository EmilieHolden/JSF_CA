import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"

import HomeView from "./views/HomeView"
import ProductView from "./views/ProductView"
import CartView from "./views/CartView"
import ContactView from "./views/ContactView"
import CheckoutSuccessView from "./views/CheckoutSuccessView"
import NotFoundView from "./views/NotFoundView"

function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/product/:id" element={<ProductView />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/contact" element={<ContactView />} />
          <Route path="/checkout-success" element={<CheckoutSuccessView />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
