import React from 'react'
import { useApp } from '../../context/AppContext'
import toast from 'react-hot-toast'
import styles from './AdminTables.module.css'

export default function AdminTables() {
  const { state, dispatch } = useApp()

  const getTableOrder = (tableId) =>
    state.orders.find(o => o.tableId === tableId && ['pending','preparing','ready'].includes(o.status))

  const clearTable = (table) => {
    dispatch({ type: 'UPDATE_TABLE_STATUS', payload: { id: table.id, status: 'available', currentOrderId: null } })
    toast.success(`Table ${table.number} cleared`)
  }

  const occupiedCount = state.tables.filter(t => t.status === 'occupied').length
  const availableCount = state.tables.filter(t => t.status === 'available').length

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Table Management</h1>
        <p className={styles.pageSubtitle}>
          {occupiedCount} occupied · {availableCount} available
        </p>
      </div>

      {/* Summary Row */}
      <div className={styles.summary}>
        <div className={styles.summaryCard} style={{ '--c': '#22c55e' }}>
          <span className={styles.summaryNum}>{availableCount}</span>
          <span className={styles.summaryLabel}>Available</span>
        </div>
        <div className={styles.summaryCard} style={{ '--c': '#ef4444' }}>
          <span className={styles.summaryNum}>{occupiedCount}</span>
          <span className={styles.summaryLabel}>Occupied</span>
        </div>
        <div className={styles.summaryCard} style={{ '--c': '#6c63ff' }}>
          <span className={styles.summaryNum}>{state.tables.length}</span>
          <span className={styles.summaryLabel}>Total Tables</span>
        </div>
      </div>

      {/* Tables Grid */}
      <div className={styles.grid}>
        {state.tables.map(table => {
          const order = getTableOrder(table.id)
          const occupied = table.status === 'occupied'
          return (
            <div
              key={table.id}
              className={`${styles.tableCard} ${occupied ? styles.occupied : styles.available}`}
            >
              <div className={styles.tableHeader}>
                <div className={styles.tableIcon}>
                  {occupied ? '🪑' : '🟢'}
                </div>
                <div className={styles.tableInfo}>
                  <span className={styles.tableNum}>Table {table.number}</span>
                  <div className={`${styles.tableStatus} ${occupied ? styles.statusOcc : styles.statusAvail}`}>
                    {occupied ? 'Occupied' : 'Available'}
                  </div>
                </div>
              </div>

              {order && (
                <div className={styles.orderInfo}>
                  <div className={styles.orderInfoRow}>
                    <span>Order</span>
                    <span>{order.id}</span>
                  </div>
                  <div className={styles.orderInfoRow}>
                    <span>Items</span>
                    <span>{order.items.reduce((s,i) => s+i.qty, 0)}</span>
                  </div>
                  <div className={styles.orderInfoRow}>
                    <span>Amount</span>
                    <span className={styles.amt}>₹{order.total}</span>
                  </div>
                  <div className={`${styles.orderStatus} ${styles[`os_${order.status}`]}`}>
                    {order.status}
                  </div>
                </div>
              )}

              {occupied && (
                <button className={styles.clearBtn} onClick={() => clearTable(table)}>
                  ✓ Clear Table
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
