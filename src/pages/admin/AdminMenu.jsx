import React, { useState, useRef } from 'react'
import { useApp } from '../../context/AppContext'
import { CATEGORIES } from '../../data/menuData'
import toast from 'react-hot-toast'
import styles from './AdminMenu.module.css'

const EMPTY_FORM = { name: '', price: '', description: '', category: 'starters', image: '', available: true, popular: false }

export default function AdminMenu() {
  const { state, dispatch } = useApp()
  const [filterCat, setFilterCat] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [imgPreview, setImgPreview] = useState('')
  const fileRef = useRef()

  const filtered = state.menuItems.filter(
    m => filterCat === 'all' || m.category === filterCat
  )

  const openAdd = () => {
    setEditItem(null)
    setForm(EMPTY_FORM)
    setImgPreview('')
    setShowForm(true)
  }

  const openEdit = (item) => {
    setEditItem(item)
    setForm({ name: item.name, price: item.price, description: item.description, category: item.category, image: item.image, available: item.available, popular: item.popular })
    setImgPreview(item.image)
    setShowForm(true)
  }

  const handleImageFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setImgPreview(ev.target.result)
      setForm(f => ({ ...f, image: ev.target.result }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.price || !form.category) {
      toast.error('Please fill all required fields')
      return
    }
    if (editItem) {
      dispatch({
        type: 'UPDATE_MENU_ITEM',
        payload: { ...editItem, ...form, price: Number(form.price) }
      })
      toast.success('Menu item updated!')
    } else {
      dispatch({
        type: 'ADD_MENU_ITEM',
        payload: { id: `item-${Date.now()}`, ...form, price: Number(form.price) }
      })
      toast.success('New item added to menu!')
    }
    setShowForm(false)
  }

  const handleDelete = (item) => {
    if (!confirm(`Delete "${item.name}"?`)) return
    dispatch({ type: 'DELETE_MENU_ITEM', payload: item.id })
    toast.success('Item deleted')
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Menu Management</h1>
          <p className={styles.pageSubtitle}>{state.menuItems.length} items across {CATEGORIES.length} categories</p>
        </div>
        <button className={styles.addBtn} onClick={openAdd}>+ Add Item</button>
      </div>

      {/* Category Filter */}
      <div className={styles.filters}>
        <button className={`${styles.fBtn} ${filterCat === 'all' ? styles.fActive : ''}`} onClick={() => setFilterCat('all')}>
          All ({state.menuItems.length})
        </button>
        {CATEGORIES.map(cat => {
          const count = state.menuItems.filter(m => m.category === cat.id).length
          if (!count) return null
          return (
            <button
              key={cat.id}
              className={`${styles.fBtn} ${filterCat === cat.id ? styles.fActive : ''}`}
              onClick={() => setFilterCat(cat.id)}
            >
              {cat.emoji} {cat.name} ({count})
            </button>
          )
        })}
      </div>

      {/* Menu Items Grid */}
      <div className={styles.grid}>
        {filtered.map((item, idx) => (
          <div key={item.id} className={`${styles.card} ${!item.available ? styles.unavailable : ''}`} style={{ animationDelay: `${idx * 0.03}s` }}>
            <div className={styles.cardImg}>
              {item.image ? (
                <img src={item.image} alt={item.name} onError={e => e.target.style.display='none'} />
              ) : (
                <div className={styles.noImg}>🍽️</div>
              )}
              {item.popular && <span className={styles.popularTag}>⭐ Popular</span>}
              {!item.available && <div className={styles.unavailableOverlay}>Unavailable</div>}
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardMeta}>
                <span className={styles.catTag}>
                  {CATEGORIES.find(c => c.id === item.category)?.emoji}
                  {CATEGORIES.find(c => c.id === item.category)?.name}
                </span>
              </div>
              <p className={styles.cardName}>{item.name}</p>
              <p className={styles.cardDesc}>{item.description}</p>
              <p className={styles.cardPrice}>₹{item.price}</p>
            </div>
            <div className={styles.cardActions}>
              <button
                className={`${styles.toggleBtn} ${item.available ? styles.toggleOn : styles.toggleOff}`}
                onClick={() => dispatch({ type: 'TOGGLE_ITEM_AVAILABILITY', payload: item.id })}
              >
                {item.available ? '● On' : '○ Off'}
              </button>
              <button className={styles.editBtn} onClick={() => openEdit(item)}>✏️</button>
              <button className={styles.delBtn} onClick={() => handleDelete(item)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className={styles.modalOverlay} onClick={() => setShowForm(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{editItem ? 'Edit Item' : 'Add New Item'}</h2>
              <button className={styles.modalClose} onClick={() => setShowForm(false)}>✕</button>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              {/* Image Upload */}
              <div className={styles.imgUpload} onClick={() => fileRef.current.click()}>
                {imgPreview ? (
                  <img src={imgPreview} alt="preview" className={styles.imgPreview} />
                ) : (
                  <div className={styles.imgPlaceholder}>
                    <span>📷</span>
                    <span>Click to upload image</span>
                  </div>
                )}
                <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleImageFile} />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Item Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Paneer Tikka"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    placeholder="e.g. 240"
                    value={form.price}
                    onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                    required
                    min="1"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Category *</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.emoji} {cat.name}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  placeholder="Short description of the dish…"
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  rows={2}
                />
              </div>

              <div className={styles.formRow}>
                <label className={styles.checkLabel}>
                  <input
                    type="checkbox"
                    checked={form.available}
                    onChange={e => setForm(f => ({ ...f, available: e.target.checked }))}
                  />
                  Available on menu
                </label>
                <label className={styles.checkLabel}>
                  <input
                    type="checkbox"
                    checked={form.popular}
                    onChange={e => setForm(f => ({ ...f, popular: e.target.checked }))}
                  />
                  Mark as Popular ⭐
                </label>
              </div>

              <div className={styles.formActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className={styles.submitBtn}>
                  {editItem ? '💾 Save Changes' : '+ Add to Menu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
