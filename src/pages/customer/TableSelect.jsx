import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import styles from './TableSelect.module.css'

export default function TableSelect() {
  const navigate = useNavigate()
  const { state } = useApp()

  const handleSelect = (table) => {
    if (table.status === 'occupied') return
    navigate(`/menu/table/${table.id}`)
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <div className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🌿</span>
          <span className={styles.logoText}>Veg <span>Aroma</span></span>
        </div>
        <p className={styles.subtitle}>Select your table to start ordering</p>
      </div>

      <div className={styles.grid}>
        {state.tables.map((table) => (
          <button
            key={table.id}
            className={`${styles.tableBtn} ${styles[table.status]}`}
            onClick={() => handleSelect(table)}
            disabled={table.status === 'occupied'}
          >
            <span className={styles.tableNum}>{table.number}</span>
            <span className={styles.tableLabel}>
              {table.status === 'available' ? 'Available' :
               table.status === 'occupied' ? 'Occupied' : 'Reserved'}
            </span>
            <div className={`${styles.statusDot} ${styles[`dot_${table.status}`]}`} />
          </button>
        ))}
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendDot} ${styles.dot_available}`} /> Available
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendDot} ${styles.dot_occupied}`} /> Occupied
        </div>
      </div>
    </div>
  )
}
