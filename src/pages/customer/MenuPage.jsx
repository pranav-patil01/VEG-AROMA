import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { CATEGORIES } from '../../data/menuData'
import MenuItemCard from '../../components/customer/MenuItemCard'
import CartBar from '../../components/customer/CartBar'
import CustomerNotification from '../../components/customer/CustomerNotification'
import styles from './MenuPage.module.css'

export default function MenuPage() {
  const { tableId } = useParams()
  const navigate = useNavigate()
  const { state } = useApp()
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const categoryRefs = useRef({})
  const scrollContainerRef = useRef(null)

  const tableNum = state.tables.find(t => t.id === parseInt(tableId))?.number || tableId

  // Group items
  const filtered = state.menuItems.filter(item => {
    const matchCat = activeCategory === 'all' || item.category === activeCategory
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const grouped = CATEGORIES.map(cat => ({
    ...cat,
    items: filtered.filter(i => i.category === cat.id && i.available)
  })).filter(cat => cat.items.length > 0)

  const cartCount = state.cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = state.cart.reduce((s, i) => s + i.price * i.qty, 0)

  const scrollToCategory = (catId) => {
    setActiveCategory(catId)
    const el = categoryRefs.current[catId]
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 130
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  // Notifications for this table
  const notifications = state.customerNotifications[parseInt(tableId)] || []

  return (
    <div className={styles.page}>
      {/* Notifications */}
      {notifications.map(n => (
        <CustomerNotification key={n.id} notification={n} tableId={parseInt(tableId)} />
      ))}

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <button className={styles.backBtn} onClick={() => navigate('/menu')}>←</button>
          <div className={styles.headerTitle}>
            <span className={styles.restaurantName}>Veg <span>Aroma</span></span>
            <span className={styles.tableBadge}>Table {tableNum}</span>
          </div>
          {cartCount > 0 && (
            <button className={styles.cartBtn} onClick={() => navigate(`/menu/cart/${tableId}`)}>
              🛒 <span className={styles.cartBadge}>{cartCount}</span>
            </button>
          )}
        </div>

        {/* Search */}
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>⌕</span>
          <input
            className={styles.searchInput}
            placeholder="Search dishes…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className={styles.searchClear} onClick={() => setSearch('')}>✕</button>
          )}
        </div>

        {/* Category Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeCategory === 'all' ? styles.tabActive : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          {CATEGORIES.map(cat => {
            const hasItems = state.menuItems.some(i => i.category === cat.id && i.available)
            if (!hasItems) return null
            return (
              <button
                key={cat.id}
                className={`${styles.tab} ${activeCategory === cat.id ? styles.tabActive : ''}`}
                onClick={() => scrollToCategory(cat.id)}
              >
                {cat.emoji} {cat.name}
              </button>
            )
          })}
        </div>
      </header>

      {/* Menu Content */}
      <main className={styles.main} ref={scrollContainerRef}>
        {grouped.length === 0 ? (
          <div className={styles.empty}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🍃</div>
            <p>No dishes found</p>
          </div>
        ) : (
          grouped.map((cat, idx) => (
            <section
              key={cat.id}
              ref={el => categoryRefs.current[cat.id] = el}
              className={styles.section}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className={styles.sectionHeader}>
                <span className={styles.sectionEmoji}>{cat.emoji}</span>
                <h2 className={styles.sectionTitle}>{cat.name}</h2>
                <div className={styles.sectionLine} />
                <span className={styles.sectionCount}>{cat.items.length}</span>
              </div>
              <div className={styles.grid}>
                {cat.items.map(item => (
                  <MenuItemCard key={item.id} item={item} tableId={tableId} />
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      {/* Cart Bar */}
      {cartCount > 0 && (
        <CartBar count={cartCount} total={cartTotal} tableId={tableId} />
      )}
    </div>
  )
}
