import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './CartBar.module.css'

export default function CartBar({ count, total, tableId }) {
  const navigate = useNavigate()
  return (
    <div className={styles.bar}>
      <div className={styles.info}>
        <span className={styles.count}>{count} {count === 1 ? 'item' : 'items'}</span>
        <span className={styles.total}>₹{total}</span>
      </div>
      <button className={styles.btn} onClick={() => navigate(`/menu/cart/${tableId}`)}>
        View Cart →
      </button>
    </div>
  )
}
