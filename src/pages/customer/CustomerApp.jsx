import React from 'react'
import { Routes, Route } from 'react-router-dom'
import TableSelect from './TableSelect'
import MenuPage from './MenuPage'
import CartPage from './CartPage'
import OrderStatus from './OrderStatus'

export default function CustomerApp() {
  return (
    <Routes>
      <Route path="/" element={<TableSelect />} />
      <Route path="/table/:tableId" element={<MenuPage />} />
      <Route path="/cart/:tableId" element={<CartPage />} />
      <Route path="/order/:orderId/:tableId" element={<OrderStatus />} />
    </Routes>
  )
}
