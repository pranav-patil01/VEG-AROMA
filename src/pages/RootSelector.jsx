import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './RootSelector.module.css'

export default function RootSelector() {
  const navigate = useNavigate()

  return (
    <div className={styles.root}>
      <div className={styles.bg} />
      <div className={styles.grid} />

      <div className={styles.content}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>🌿</div>
          <h1 className={styles.brandName}>
           Kings <span>Sparks</span>
          </h1>
          <p className={styles.brandSub}>Pure Veg A/C Family Restaurant</p>
        </div>

        <div className={styles.cards}>
          <div
            className={`${styles.card} ${styles.cardCustomer}`}
            onClick={() => navigate('/menu')}
          >
            <div className={styles.cardEmoji}>🍽️</div>
            <div className={styles.cardInfo}>
              <h2>Customer Menu</h2>
              <p>Browse our menu, place your order and track it in real time</p>
            </div>
            <div className={styles.cardArrow}>→</div>
          </div>

          <div
            className={`${styles.card} ${styles.cardAdmin}`}
            onClick={() => navigate('/admin')}
          >
            <div className={styles.cardEmoji}>⚙️</div>
            <div className={styles.cardInfo}>
              <h2>Admin Panel</h2>
              <p>Manage orders, track earnings and update the menu</p>
            </div>
            <div className={styles.cardArrow}>→</div>
          </div>
        </div>
      </div>
    </div>
  )
}
