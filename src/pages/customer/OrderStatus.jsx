import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import CustomerNotification from '../../components/customer/CustomerNotification'
import styles from './OrderStatus.module.css'

const STEPS = [
  { key: 'pending',   label: 'Order Placed',   icon: '📋', desc: 'Your order has been received' },
  { key: 'preparing', label: 'Preparing',       icon: '👨‍🍳', desc: 'Kitchen is preparing your food' },
  { key: 'ready',     label: 'Ready',           icon: '✅', desc: 'Your food is ready to serve' },
  { key: 'served',    label: 'Served',          icon: '🍽️', desc: 'Enjoy your meal!' },
]

const STATUS_INDEX = { pending: 0, preparing: 1, ready: 2, served: 3 }

export default function OrderStatus() {
  const { orderId, tableId } = useParams()
  const navigate = useNavigate()
  const { state } = useApp()

  const order = state.orders.find(o => o.id === orderId)
  const notifications = state.customerNotifications[parseInt(tableId)] || []

  if (!order) {
    return (
      <div className={styles.notFound}>
        <div>Order not found</div>
        <button onClick={() => navigate('/menu')}>Go to Menu</button>
      </div>
    )
  }

  const currentStep = STATUS_INDEX[order.status] ?? 0

  return (
    <div className={styles.page}>
      {notifications.map(n => (
        <CustomerNotification key={n.id} notification={n} tableId={parseInt(tableId)} />
      ))}

      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(`/menu/table/${tableId}`)}>←</button>
        <div className={styles.title}>
          <h1>Order Status</h1>
          <span className={styles.orderId}>{orderId}</span>
        </div>
      </header>

      <div className={styles.content}>
        {/* Status Stepper */}
        <div className={styles.stepper}>
          {STEPS.map((step, idx) => {
            const done = idx < currentStep
            const active = idx === currentStep
            return (
              <div key={step.key} className={`${styles.step} ${done ? styles.done : ''} ${active ? styles.active : ''}`}>
                <div className={styles.stepIconWrap}>
                  <div className={styles.stepIcon}>{step.icon}</div>
                  {active && <div className={styles.ping} />}
                </div>
                {idx < STEPS.length - 1 && (
                  <div className={`${styles.connector} ${done ? styles.connectorDone : ''}`} />
                )}
                <div className={styles.stepLabel}>{step.label}</div>
                {active && <div className={styles.stepDesc}>{step.desc}</div>}
              </div>
            )
          })}
        </div>

        {/* Order Items */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>
            <span>Table {order.tableNumber}</span>
            <span className={`${styles.statusBadge} ${styles[`badge_${order.status}`]}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </h3>
          <div className={styles.items}>
            {order.items.map(item => (
              <div key={item.id} className={styles.orderItem}>
                <span className={styles.itemQty}>×{item.qty}</span>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemAmt}>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>
          <div className={styles.orderTotal}>
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>
        </div>

        {order.status === 'served' && (
          <button
            className={styles.newOrderBtn}
            onClick={() => navigate(`/menu/table/${tableId}`)}
          >
            🍽️ Order More Items
          </button>
        )}
      </div>
    </div>
  )
}
