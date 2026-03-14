import React, { useMemo, useState } from 'react'
import { useApp } from '../../context/AppContext'
import styles from './AdminHistory.module.css'

export default function AdminHistory() {
  const { state } = useApp()
  const [search, setSearch] = useState('')

  const filtered = state.orders.filter(o =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    String(o.tableNumber).includes(search) ||
    o.items.some(i => i.name.toLowerCase().includes(search.toLowerCase()))
  )

  const stats = useMemo(() => {
    const total = state.orders.reduce((s, o) => s + o.total, 0)
    const served = state.orders.filter(o => o.status === 'served').length
    const avgOrder = state.orders.length ? Math.round(total / state.orders.length) : 0
    return { total, served, avgOrder }
  }, [state.orders])

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Order History</h1>
        <p className={styles.pageSubtitle}>Complete log of all orders</p>
      </div>

      {/* Summary */}
      <div className={styles.summaryRow}>
        <div className={styles.sumCard}>
          <div className={styles.sumIcon}>💰</div>
          <div>
            <div className={styles.sumValue}>₹{stats.total}</div>
            <div className={styles.sumLabel}>Total Revenue</div>
          </div>
        </div>
        <div className={styles.sumCard}>
          <div className={styles.sumIcon}>📦</div>
          <div>
            <div className={styles.sumValue}>{state.orders.length}</div>
            <div className={styles.sumLabel}>Total Orders</div>
          </div>
        </div>
        <div className={styles.sumCard}>
          <div className={styles.sumIcon}>✅</div>
          <div>
            <div className={styles.sumValue}>{stats.served}</div>
            <div className={styles.sumLabel}>Completed</div>
          </div>
        </div>
        <div className={styles.sumCard}>
          <div className={styles.sumIcon}>📊</div>
          <div>
            <div className={styles.sumValue}>₹{stats.avgOrder}</div>
            <div className={styles.sumLabel}>Avg Order Value</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className={styles.searchWrap}>
        <span>⌕</span>
        <input
          className={styles.searchInput}
          placeholder="Search by order ID, table, dish…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📜</div>
          <p>{state.orders.length === 0 ? 'No orders yet' : 'No results found'}</p>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Table</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, idx) => (
                <tr key={order.id} className={styles.row} style={{ animationDelay: `${idx * 0.02}s` }}>
                  <td className={styles.orderId}>{order.id}</td>
                  <td>
                    <span className={styles.tableNum}>Table {order.tableNumber}</span>
                  </td>
                  <td>
                    <div className={styles.itemNames}>
                      {order.items.slice(0, 2).map(i => (
                        <span key={i.id} className={styles.itemChip}>
                          {i.name} ×{i.qty}
                        </span>
                      ))}
                      {order.items.length > 2 && (
                        <span className={styles.moreChip}>+{order.items.length - 2} more</span>
                      )}
                    </div>
                  </td>
                  <td className={styles.amt}>₹{order.total}</td>
                  <td>
                    <span className={`${styles.statusPill} ${styles[`s_${order.status}`]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className={styles.time}>
                    {new Date(order.placedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
