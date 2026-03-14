import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import styles from './AdminDashboard.module.css'

export default function AdminDashboard() {
  const { state } = useApp()
  const navigate = useNavigate()

  const stats = useMemo(() => {
    const today = new Date().toDateString()
    const todayOrders = state.orders.filter(o => new Date(o.placedAt).toDateString() === today)
    const todayRevenue = todayOrders.reduce((s, o) => s + o.total, 0)
    const pending = state.orders.filter(o => o.status === 'pending').length
    const preparing = state.orders.filter(o => o.status === 'preparing').length
    const occupiedTables = state.tables.filter(t => t.status === 'occupied').length
    const popularItems = state.menuItems
      .filter(m => m.popular)
      .slice(0, 4)
    return { todayOrders: todayOrders.length, todayRevenue, pending, preparing, occupiedTables, popularItems }
  }, [state.orders, state.tables, state.menuItems])

  const STAT_CARDS = [
    { label: "Today's Revenue", value: `₹${stats.todayRevenue}`, icon: '💰', color: '#f59e0b', sub: 'All time earnings' },
    { label: "Today's Orders", value: stats.todayOrders, icon: '📦', color: '#22c55e', sub: 'Orders placed today' },
    { label: 'Pending Orders', value: stats.pending, icon: '⏳', color: '#ef4444', sub: 'Waiting to be processed', link: '/admin/orders' },
    { label: 'Occupied Tables', value: `${stats.occupiedTables}/${state.tables.length}`, icon: '🪑', color: '#6c63ff', sub: 'Tables in use', link: '/admin/tables' },
  ]

  const recentOrders = state.orders.slice(0, 5)

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <p className={styles.pageSubtitle}>Welcome back — here's what's happening today</p>
      </div>

      {/* Stat Cards */}
      <div className={styles.statGrid}>
        {STAT_CARDS.map((card, i) => (
          <div
            key={card.label}
            className={`${styles.statCard} ${card.link ? styles.statCardLink : ''}`}
            style={{ animationDelay: `${i * 0.07}s`, '--accent': card.color }}
            onClick={() => card.link && navigate(card.link)}
          >
            <div className={styles.statIcon}>{card.icon}</div>
            <div className={styles.statInfo}>
              <div className={styles.statValue}>{card.value}</div>
              <div className={styles.statLabel}>{card.label}</div>
              <div className={styles.statSub}>{card.sub}</div>
            </div>
            {card.link && <div className={styles.statArrow}>→</div>}
          </div>
        ))}
      </div>

      <div className={styles.grid2}>
        {/* Recent Orders */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Recent Orders</h2>
            <button className={styles.panelLink} onClick={() => navigate('/admin/orders')}>
              View all →
            </button>
          </div>
          {recentOrders.length === 0 ? (
            <div className={styles.empty}>No orders yet today</div>
          ) : (
            <div className={styles.orderList}>
              {recentOrders.map(order => (
                <div key={order.id} className={styles.orderRow}>
                  <div className={styles.orderMeta}>
                    <span className={styles.orderIdText}>{order.id}</span>
                    <span className={styles.orderTable}>Table {order.tableNumber}</span>
                  </div>
                  <span className={`${styles.orderStatus} ${styles[`status_${order.status}`]}`}>
                    {order.status}
                  </span>
                  <span className={styles.orderAmt}>₹{order.total}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Table Overview */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Table Status</h2>
            <button className={styles.panelLink} onClick={() => navigate('/admin/tables')}>
              Manage →
            </button>
          </div>
          <div className={styles.tableGrid}>
            {state.tables.map(table => (
              <div
                key={table.id}
                className={`${styles.tableTile} ${styles[`table_${table.status}`]}`}
              >
                <span className={styles.tileNum}>{table.number}</span>
                <div className={`${styles.tileDot} ${styles[`dot_${table.status}`]}`} />
              </div>
            ))}
          </div>
          <div className={styles.tableLegend}>
            <span><span className={`${styles.lgDot} ${styles.dot_available}`} />Available</span>
            <span><span className={`${styles.lgDot} ${styles.dot_occupied}`} />Occupied</span>
          </div>
        </div>
      </div>

      {/* Popular Items */}
      {stats.popularItems.length > 0 && (
        <div className={styles.panel} style={{ marginTop: 20 }}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>⭐ Popular Items</h2>
          </div>
          <div className={styles.popularGrid}>
            {stats.popularItems.map(item => (
              <div key={item.id} className={styles.popularCard}>
                <div className={styles.popularImg}>
                  <img src={item.image} alt={item.name} onError={e => e.target.style.display='none'} />
                </div>
                <div className={styles.popularInfo}>
                  <p className={styles.popularName}>{item.name}</p>
                  <p className={styles.popularPrice}>₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
