import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react'
import { initialMenuData } from '../data/menuData'
import toast from 'react-hot-toast'

const AppContext = createContext(null)

const initialState = {
  // Menu
  menuItems: initialMenuData,
  // Cart (customer)
  cart: [],
  // Orders
  orders: [],
  // Tables
  tables: Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    number: i + 1,
    status: 'available', // available | occupied | reserved
    currentOrderId: null,
  })),
  // Notifications for customer (keyed by tableId)
  customerNotifications: {},
  // Admin stats
  todayEarnings: 0,
  totalOrdersToday: 0,
  // Current table (customer)
  currentTable: null,
  // Admin notification count
  adminUnread: 0,
}

function reducer(state, action) {
  switch (action.type) {

    case 'SET_TABLE':
      return { ...state, currentTable: action.payload }

    case 'ADD_TO_CART': {
      const existing = state.cart.find(i => i.id === action.payload.id)
      if (existing) {
        return {
          ...state,
          cart: state.cart.map(i =>
            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          )
        }
      }
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] }
    }

    case 'REMOVE_FROM_CART': {
      const existing = state.cart.find(i => i.id === action.payload)
      if (!existing) return state
      if (existing.qty === 1) {
        return { ...state, cart: state.cart.filter(i => i.id !== action.payload) }
      }
      return {
        ...state,
        cart: state.cart.map(i =>
          i.id === action.payload ? { ...i, qty: i.qty - 1 } : i
        )
      }
    }

    case 'CLEAR_CART':
      return { ...state, cart: [] }

    case 'PLACE_ORDER': {
      const order = action.payload
      const updatedTables = state.tables.map(t =>
        t.id === order.tableId
          ? { ...t, status: 'occupied', currentOrderId: order.id }
          : t
      )
      return {
        ...state,
        orders: [order, ...state.orders],
        cart: [],
        tables: updatedTables,
        adminUnread: state.adminUnread + 1,
        todayEarnings: state.todayEarnings + order.total,
        totalOrdersToday: state.totalOrdersToday + 1,
      }
    }

    case 'UPDATE_ORDER_STATUS': {
      const { orderId, status, tableId } = action.payload
      const updatedOrders = state.orders.map(o =>
        o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o
      )
      // Update table status when order is done
      let updatedTables = state.tables
      if (status === 'served') {
        updatedTables = state.tables.map(t =>
          t.id === tableId ? { ...t, status: 'available', currentOrderId: null } : t
        )
      }
      // Add customer notification
      const notification = {
        id: Date.now(),
        status,
        message: status === 'preparing'
          ? '👨‍🍳 Your order is being prepared!'
          : status === 'ready'
          ? '✅ Your order is ready! Serving shortly.'
          : status === 'served'
          ? '🍽️ Your food has been served. Enjoy!'
          : '',
        timestamp: new Date().toISOString(),
      }
      return {
        ...state,
        orders: updatedOrders,
        tables: updatedTables,
        customerNotifications: {
          ...state.customerNotifications,
          [tableId]: [
            notification,
            ...(state.customerNotifications[tableId] || []).slice(0, 9),
          ],
        },
      }
    }

    case 'MARK_ADMIN_READ':
      return { ...state, adminUnread: 0 }

    case 'ADD_MENU_ITEM':
      return { ...state, menuItems: [...state.menuItems, action.payload] }

    case 'UPDATE_MENU_ITEM':
      return {
        ...state,
        menuItems: state.menuItems.map(m =>
          m.id === action.payload.id ? action.payload : m
        )
      }

    case 'DELETE_MENU_ITEM':
      return {
        ...state,
        menuItems: state.menuItems.filter(m => m.id !== action.payload)
      }

    case 'TOGGLE_ITEM_AVAILABILITY':
      return {
        ...state,
        menuItems: state.menuItems.map(m =>
          m.id === action.payload ? { ...m, available: !m.available } : m
        )
      }

    case 'UPDATE_TABLE_STATUS':
      return {
        ...state,
        tables: state.tables.map(t =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        )
      }

    case 'DISMISS_CUSTOMER_NOTIFICATION': {
      const { tableId, notifId } = action.payload
      return {
        ...state,
        customerNotifications: {
          ...state.customerNotifications,
          [tableId]: (state.customerNotifications[tableId] || []).filter(n => n.id !== notifId),
        }
      }
    }

    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const orderIdRef = useRef(1000)

  const placeOrder = useCallback((tableId, tableNumber) => {
    if (!state.cart.length) return null
    const orderId = `ORD-${++orderIdRef.current}`
    const order = {
      id: orderId,
      tableId,
      tableNumber,
      items: state.cart.map(i => ({ ...i })),
      total: state.cart.reduce((s, i) => s + i.price * i.qty, 0),
      status: 'pending', // pending | preparing | ready | served | cancelled
      placedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    dispatch({ type: 'PLACE_ORDER', payload: order })
    return orderId
  }, [state.cart])

  const updateOrderStatus = useCallback((orderId, status, tableId) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { orderId, status, tableId } })
  }, [])

  return (
    <AppContext.Provider value={{ state, dispatch, placeOrder, updateOrderStatus }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
