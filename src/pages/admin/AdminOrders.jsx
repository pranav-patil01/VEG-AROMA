import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import toast from 'react-hot-toast'
import styles from './AdminOrders.module.css'

const STATUS_FLOW = {
  pending:   { next: 'preparing', label: 'Start Preparing', color: '#f59e0b', nextColor: '#3b82f6' },
  preparing: { next: 'ready',    label: 'Mark Ready',      color: '#3b82f6', nextColor: '#22c55e' },
  ready:     { next: 'served',   label: 'Mark Served',     color: '#22c55e', nextColor: '#6c63ff' },
  served:    { next: null,       label: 'Completed',        color: '#6c63ff', nextColor: null },
}

const STATUS_LABELS = {
  pending:   { label: 'New Order', bg: 'rgba(245,158,11,0.15)',  text: '#f59e0b' },
  preparing: { label: 'Preparing', bg: 'rgba(59,130,246,0.15)',  text: '#60a5fa' },
  ready:     { label: 'Ready',     bg: 'rgba(34,197,94,0.15)',   text: '#22c55e' },
  served:    { label: 'Served',    bg: 'rgba(108,99,255,0.15)',  text: '#8b83ff' },
  cancelled: { label: 'Cancelled', bg: 'rgba(239,68,68,0.15)',   text: '#ef4444' },
}

const FILTERS = ['all', 'pending', 'preparing', 'ready', 'served']

export default function AdminOrders() {
  const { state, updateOrderStatus } = useApp()
  const [filter, setFilter] = useState('all')
  const [printingId, setPrintingId] = useState(null)

  const filtered = state.orders.filter(o => filter === 'all' || o.status === filter)

  const handleStatusChange = (order, nextStatus) => {
    updateOrderStatus(order.id, nextStatus, order.tableId)
    const messages = {
      preparing: `👨‍🍳 Preparing order ${order.id}`,
      ready:     `✅ Order ${order.id} is ready!`,
      served:    `🍽️ Order ${order.id} served`,
    }
    toast.success(messages[nextStatus] || 'Status updated')
  }

  const handlePrint = (order) => {
    setPrintingId(order.id)
    // Generate print content
    const content = `
      <html><head>
        <style>
          body { font-family: monospace; font-size: 14px; padding: 20px; width: 300px; }
          h2 { text-align: center; font-size: 18px; margin-bottom: 4px; }
          p  { text-align: center; font-size: 12px; color: #555; margin-bottom: 16px; }
          .divider { border-top: 1px dashed #999; margin: 10px 0; }
          .row { display: flex; justify-content: space-between; margin: 4px 0; font-size: 13px; }
          .total { font-weight: bold; font-size: 15px; }
        </style>
      </head><body>
        <h2>Veg Aroma</h2>
        <p>Pure Veg A/C Family Restaurant</p>
        <div class="divider"></div>
        <div class="row"><span>Order:</span><span>${order.id}</span></div>
        <div class="row"><span>Table:</span><span>${order.tableNumber}</span></div>
        <div class="row"><span>Time:</span><span>${new Date(order.placedAt).toLocaleTimeString()}</span></div>
        <div class="divider"></div>
        ${order.items.map(i => `
          <div class="row">
            <span>${i.qty}x ${i.name}</span>
            <span>₹${i.price * i.qty}</span>
          </div>
        `).join('')}
        <div class="divider"></div>
        <div class="row total"><span>TOTAL</span><span>₹${order.total}</span></div>
        <div class="divider"></div>
        <p style="margin-top:16px">Thank you for dining with us!</p>
      </body></html>
    `
    const win = window.open('', '_blank', 'width=400,height=600')
    win.document.write(content)
    win.document.close()
    win.focus()
    setTimeout(() => { win.print(); win.close(); setPrintingId(null) }, 500)
    toast.success(`Printing bill for Table ${order.tableNumber}`)
  }

  const counts = FILTERS.reduce((acc, f) => {
    acc[f] = f === 'all' ? state.orders.length : state.orders.filter(o => o.status === f).length
    return acc
  }, {})

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Live Orders</h1>
        <p className={styles.pageSubtitle}>{state.orders.filter(o => o.status === 'pending').length} orders awaiting action</p>
      </div>

      {/* Filter Tabs */}
      <div className={styles.filters}>
        {FILTERS.map(f => (
          <button
            key={f}
            className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            <span className={styles.filterCount}>{counts[f]}</span>
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
          <p>No {filter === 'all' ? '' : filter} orders</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((order, idx) => {
            const flow = STATUS_FLOW[order.status]
            const statusStyle = STATUS_LABELS[order.status] || STATUS_LABELS.pending
            return (
              <div
                key={order.id}
                className={`${styles.orderCard} ${order.status === 'pending' ? styles.cardNew : ''}`}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                {/* Card Header */}
                <div className={styles.cardHeader}>
                  <div className={styles.cardLeft}>
                    <span className={styles.cardTable}>Table {order.tableNumber}</span>
                    <span className={styles.cardId}>{order.id}</span>
                  </div>
                  <div
                    className={styles.cardStatus}
                    style={{ background: statusStyle.bg, color: statusStyle.text }}
                  >
                    {statusStyle.label}
                  </div>
                </div>

                {/* Items */}
                <div className={styles.itemsList}>
                  {order.items.map(item => (
                    <div key={item.id} className={styles.item}>
                      <span className={styles.itemQtyBadge}>×{item.qty}</span>
                      <span className={styles.itemName}>{item.name}</span>
                      <span className={styles.itemPrice}>₹{item.price * item.qty}</span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className={styles.cardFooter}>
                  <div className={styles.cardTotal}>
                    <span className={styles.totalLabel}>Total</span>
                    <span className={styles.totalAmt}>₹{order.total}</span>
                  </div>
                  <div className={styles.cardTime}>
                    {new Date(order.placedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {/* Actions */}
                <div className={styles.actions}>
                  <button
                    className={styles.printBtn}
                    onClick={() => handlePrint(order)}
                    disabled={printingId === order.id}
                  >
                    🖨️ {printingId === order.id ? 'Printing…' : 'Print Bill'}
                  </button>
                  {flow?.next && (
                    <button
                      className={styles.statusBtn}
                      style={{ '--color': flow.nextColor }}
                      onClick={() => handleStatusChange(order, flow.next)}
                    >
                      {flow.label} →
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
