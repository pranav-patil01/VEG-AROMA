import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import AdminDashboard from './AdminDashboard'
import AdminOrders from './AdminOrders'
import AdminTables from './AdminTables'
import AdminMenu from './AdminMenu'
import AdminHistory from './AdminHistory'

export default function AdminApp() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/orders" element={<AdminOrders />} />
        <Route path="/tables" element={<AdminTables />} />
        <Route path="/menu" element={<AdminMenu />} />
        <Route path="/history" element={<AdminHistory />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  )
}
