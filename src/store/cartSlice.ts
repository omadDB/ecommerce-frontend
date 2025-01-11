import { Cart } from "@/types/cartModel"
import { Product } from "@/types/productModel"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: Cart = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: (create) => ({
    addItem: create.reducer((state, action: PayloadAction<Product>) => {
      state.cartItems = state.cartItems.push(action.payload)
    }),
    incrementCount: create.reducer((state, action: PayloadAction<number>) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      )
      const itemToIncrement: Product = state.cartItems[itemIndex]
      itemToIncrement.count++
      state.totalPrice += itemToIncrement.price
      state.totalQuantity++
    }),
    decrementCount: create.reducer((state, action: PayloadAction<number>) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      )
      const itemToDecrement: Product = state.cartItems[itemIndex]
      itemToDecrement.count--
      state.totalPrice -= itemToDecrement.price
      state.totalQuantity--
    }),
    removeItem: create.reducer((state, action: PayloadAction<Product>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      )
    }),
    clearCart: create.reducer((state) => {
      state.cartItems = []
      state.totalQuantity = 0
      state.totalPrice = 0
    }),
    setItemCount(state, action: PayloadAction<{ id: string; count: number }>) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      )
      const item = state.cartItems[itemIndex]
      const difference = action.payload.count - item.count
      item.count = action.payload.count
      state.totalItems += difference
      state.totalPrice += difference * item.price
    },
  }),
})

export const cartActions = cartSlice.actions
export const cartReducer = cartSlice.reducer
