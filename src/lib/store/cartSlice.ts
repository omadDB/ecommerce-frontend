import { Cart } from "@/types/cartModel"
import { CartItem } from "@/types/cartItemModel"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"

const initialState: Cart = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: (create) => ({
    addItem: create.reducer((state, action: PayloadAction<CartItem>) => {
      state.cartItems.push(action.payload)

      state.totalPrice += action.payload.sum
      state.totalQuantity += action.payload.count
    }),
    incrementCount: create.reducer((state, action: PayloadAction<number>) => {
      const index = state.cartItems.findIndex(
        (item) => item.productId === action.payload
      )
      if (index !== -1) {
        state.cartItems[index] = {
          ...state.cartItems[index],
          count: state.cartItems[index].count + 1,
          sum:
            (state.cartItems[index].count + 1) * state.cartItems[index].price,
        }
        state.totalPrice += state.cartItems[index].price
        state.totalQuantity++
      }
    }),
    decrementCount: create.reducer((state, action: PayloadAction<number>) => {
      const index = state.cartItems.findIndex(
        (item) => item.productId === action.payload
      )
      if (index !== -1) {
        const updatedCount = state.cartItems[index].count - 1
        if (updatedCount > 0) {
          state.cartItems[index] = {
            ...state.cartItems[index],
            count: updatedCount,
            sum: updatedCount * state.cartItems[index].price,
          }
          state.totalPrice -= state.cartItems[index].price
          state.totalQuantity--
        } else {
          cartSlice.caseReducers.removeItem(state, {
            payload: action.payload,
          } as PayloadAction<number>)
        }
      }
    }),
    removeItem: create.reducer((state, action: PayloadAction<number>) => {
      const product = state.cartItems.filter(
        (i) => i.productId === action.payload
      )[0]

      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      )

      state.totalPrice -= product.price * product.count
      state.totalQuantity -= product.count
    }),
    clearCart: create.reducer((state) => {
      state.cartItems = []
      state.totalQuantity = 0
      state.totalPrice = 0
    }),
    setItemCount: create.reducer(
      (state, action: PayloadAction<{ id: number; count: number }>) => {
        const index = state.cartItems.findIndex(
          (item) => item.productId === action.payload.id
        )
        if (index !== -1) {
          const difference = action.payload.count - state.cartItems[index].count
          state.cartItems[index] = {
            ...state.cartItems[index],
            count: action.payload.count,
            sum: action.payload.count * state.cartItems[index].price,
          }
          state.totalQuantity += difference
          state.totalPrice += difference * state.cartItems[index].price

          if (state.cartItems[index].count === 0) {
            cartSlice.caseReducers.removeItem(state, {
              payload: action.payload.id,
            } as PayloadAction<number>)
          }
        }
      }
    ),
  }),
})

export const {
  addItem,
  incrementCount,
  decrementCount,
  removeItem,
  setItemCount,
  clearCart,
} = cartSlice.actions
export const cartReducer = cartSlice.reducer

export const getTotalCartQuantity = (state: RootState) =>
  state.cart.cartItems.reduce((sum, item) => sum + item.count, 0)

export const getTotalCartPrice = (state: RootState) =>
  state.cart.cartItems.reduce(
    (sum, item) => sum + (item.price ?? 0) * item.count,
    0
  )

export const getCurrentQuantityById = (id: number) => (state: RootState) =>
  state.cart.cartItems.find((item: CartItem) => item.productId === id)?.count ??
  0
