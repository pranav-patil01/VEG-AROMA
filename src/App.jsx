import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import CustomerApp from './pages/customer/CustomerApp'
import AdminApp from './pages/admin/AdminApp'
import RootSelector from './pages/RootSelector'

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<RootSelector />} />
        <Route path="/menu/*" element={<CustomerApp />} />
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProvider>
  )
}
