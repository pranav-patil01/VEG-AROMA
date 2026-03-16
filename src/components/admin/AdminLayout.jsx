import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import styles from './AdminLayout.module.css'

const NAV_ITEMS = [
  { to: '/admin',         label: 'Dashboard', icon: '📊', exact: true },
  { to: '/admin/orders',  label: 'Live Orders', icon: '🔔' },
  { to: '/admin/tables',  label: 'Tables',    icon: '🪑' },
  { to: '/admin/menu',    label: 'Menu',       icon: '🍽️' },
  { to: '/admin/history', label: 'History',   icon: '📜' },
]

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const { state, dispatch } = useApp()

  const pendingCount = state.orders.filter(o => o.status === 'pending').length

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🌿</span>
            <span className={styles.logoText}>Kings Spark<span></span></span>
          </div>
          <div className={styles.adminBadge}>Admin Panel</div>
        </div>

        <nav className={styles.nav}>
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.navActive : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
              {item.label === 'Live Orders' && pendingCount > 0 && (
                <span className={styles.navBadge}>{pendingCount}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <button
            className={styles.exitBtn}
            onClick={() => navigate('/')}
          >
            ← Back to Menu
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className={styles.main}>
        {/* Top bar */}
        <header className={styles.topbar}>
          <button
            className={styles.menuToggle}
            onClick={() => setSidebarOpen(v => !v)}
          >
            ☰
          </button>
          <div className={styles.topbarTitle}>Admin Panel</div>
          <div className={styles.topbarRight}>
            {pendingCount > 0 && (
              <div className={styles.alertBell} onClick={() => { navigate('/admin/orders'); dispatch({ type: 'MARK_ADMIN_READ' }) }}>
                🔔
                <span className={styles.bellBadge}>{pendingCount}</span>
              </div>
            )}
            <div className={styles.adminAvatar}>A</div>
          </div>
        </header>

        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  )
}
