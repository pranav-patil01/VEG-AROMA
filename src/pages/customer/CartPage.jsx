import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import toast from 'react-hot-toast'
import styles from './CartPage.module.css'

export default function CartPage() {
  const { tableId } = useParams()
  const navigate = useNavigate()
  const { state, dispatch, placeOrder } = useApp()

  const table = state.tables.find(t => t.id === parseInt(tableId))
  const tableNumber = table?.number || tableId
  const cart = state.cart
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const gst = Math.round(total * 0.05)
  const grandTotal = total + gst

  const handlePlaceOrder = () => {
    if (!cart.length) return
    const orderId = placeOrder(parseInt(tableId), tableNumber)
    toast.success('Order placed successfully!')
    navigate(`/menu/order/${orderId}/${tableId}`)
  }

  if (!cart.length) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some delicious items from our menu!</p>
        <button className={styles.browseBtn} onClick={() => navigate(`/menu/table/${tableId}`)}>
          Browse Menu
        </button>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(`/menu/table/${tableId}`)}>←</button>
        <div className={styles.title}>
          <h1>Your Cart</h1>
          <span className={styles.tableBadge}>Table {tableNumber}</span>
        </div>
      </header>

      <div className={styles.content}>
        {/* Items */}
        <div className={styles.itemsList}>
          {cart.map((item, idx) => (
            <div key={item.id} className={styles.cartItem} style={{ animationDelay: `${idx * 0.05}s` }}>
              <div className={styles.itemImg}>
                <img src={item.image} alt={item.name} onError={e => e.target.style.display = 'none'} />
              </div>
              <div className={styles.itemInfo}>
                <p className={styles.itemName}>{item.name}</p>
                <p className={styles.itemPrice}>₹{item.price} each</p>
              </div>
              <div className={styles.qtyControl}>
                <button
                  className={styles.qtyBtn}
                  onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                >−</button>
                <span className={styles.qty}>{item.qty}</span>
                <button
                  className={styles.qtyBtn}
                  onClick={() => dispatch({ type: 'ADD_TO_CART', payload: item })}
                >+</button>
              </div>
              <div className={styles.itemTotal}>₹{item.price * item.qty}</div>
            </div>
          ))}
        </div>

        {/* Bill Summary */}
        <div className={styles.bill}>
          <h3 className={styles.billTitle}>Bill Summary</h3>
          <div className={styles.billRow}>
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>
          <div className={styles.billRow}>
            <span>GST (5%)</span>
            <span>₹{gst}</span>
          </div>
          <div className={`${styles.billRow} ${styles.billTotal}`}>
            <span>Total</span>
            <span>₹{grandTotal}</span>
          </div>
        </div>

        {/* Special instructions placeholder */}
        <div className={styles.instructions}>
          <label>Special Instructions</label>
          <textarea placeholder="Any allergies or special requests? (optional)" rows={2} />
        </div>
      </div>

      {/* Place Order CTA */}
      <div className={styles.cta}>
        <div className={styles.ctaInfo}>
          <span className={styles.ctaItems}>{cart.length} items</span>
          <span className={styles.ctaTotal}>₹{grandTotal}</span>
        </div>
        <button className={styles.placeBtn} onClick={handlePlaceOrder}>
          Place Order 🎉
        </button>
      </div>
    </div>
  )
}
