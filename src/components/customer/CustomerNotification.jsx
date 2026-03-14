import React, { useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import styles from './CustomerNotification.module.css'

const STATUS_CONFIG = {
  preparing: { icon: '👨‍🍳', color: '#f59e0b', label: 'Being Prepared' },
  ready:     { icon: '✅', color: '#22c55e', label: 'Ready to Serve' },
  served:    { icon: '🍽️', color: '#6c63ff', label: 'Served — Enjoy!' },
}

export default function CustomerNotification({ notification, tableId }) {
  const { dispatch } = useApp()
  const config = STATUS_CONFIG[notification.status] || {}

  useEffect(() => {
    if (notification.status === 'served') {
      const t = setTimeout(() => {
        dispatch({ type: 'DISMISS_CUSTOMER_NOTIFICATION', payload: { tableId, notifId: notification.id } })
      }, 8000)
      return () => clearTimeout(t)
    }
  }, [notification.id, notification.status, tableId, dispatch])

  if (!config.icon) return null

  return (
    <div className={styles.notif} style={{ '--color': config.color }}>
      <div className={styles.icon}>{config.icon}</div>
      <div className={styles.content}>
        <div className={styles.label}>{config.label}</div>
        <div className={styles.message}>{notification.message}</div>
      </div>
      <button
        className={styles.close}
        onClick={() => dispatch({
          type: 'DISMISS_CUSTOMER_NOTIFICATION',
          payload: { tableId, notifId: notification.id }
        })}
      >
        ✕
      </button>
    </div>
  )
}
