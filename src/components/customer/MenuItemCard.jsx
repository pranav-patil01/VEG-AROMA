import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import styles from './MenuItemCard.module.css'

export default function MenuItemCard({ item }) {
  const { state, dispatch } = useApp()
  const [imgErr, setImgErr] = useState(false)

  const cartItem = state.cart.find(i => i.id === item.id)
  const qty = cartItem?.qty || 0

  const add = (e) => {
    e.stopPropagation()
    dispatch({ type: 'ADD_TO_CART', payload: item })
  }

  const remove = (e) => {
    e.stopPropagation()
    dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })
  }

  return (
    <div className={`${styles.card} ${qty > 0 ? styles.inCart : ''}`}>
      <div className={styles.imgWrap}>
        {!imgErr ? (
          <img
            src={item.image}
            alt={item.name}
            onError={() => setImgErr(true)}
            loading="lazy"
          />
        ) : (
          <div className={styles.imgFallback}>🍽️</div>
        )}
        <div className={styles.vegBadge}>
          <div className={styles.vegDot} />
        </div>
        {item.popular && <div className={styles.popularBadge}>⭐ Popular</div>}
      </div>

      <div className={styles.body}>
        <p className={styles.name}>{item.name}</p>
        <p className={styles.desc}>{item.description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>₹{item.price}</span>
          {qty === 0 ? (
            <button className={styles.addBtn} onClick={add}>+ Add</button>
          ) : (
            <div className={styles.qtyControl}>
              <button className={styles.qtyBtn} onClick={remove}>−</button>
              <span className={styles.qtyNum}>{qty}</span>
              <button className={styles.qtyBtn} onClick={add}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
