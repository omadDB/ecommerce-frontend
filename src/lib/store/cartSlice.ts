import { CartItem } from '@/types/cartItemModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalQuantity: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: (create) => ({
    setCart: create.reducer((state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.totalPrice = action.payload.reduce(
        (sum, item) => sum + item.sum,
        0
      );
      state.totalQuantity = action.payload.reduce(
        (sum, item) => sum + item.count,
        0
      );
    }),
    addToCart: create.reducer((state, action: PayloadAction<CartItem>) => {
      const item = state.items.find(
        (i) => i.productId === action.payload.productId
      );
      if (item) {
        item.count += action.payload.count;
        item.sum += action.payload.sum;
      } else {
        state.items.push(action.payload);
      }
      state.totalPrice += action.payload.sum;
      state.totalQuantity += action.payload.count;
    }),
    updateCartItem: create.reducer((state, action: PayloadAction<CartItem>) => {
      const item = state.items.find(
        (i) => i.productId === action.payload.productId
      );
      if (item) {
        item.count = action.payload.count;
        item.sum = action.payload.sum;
      }
      state.totalPrice = state.items.reduce((sum, item) => sum + item.sum, 0);
      state.totalQuantity = state.items.reduce(
        (sum, item) => sum + item.count,
        0
      );
    }),
    removeFromCart: create.reducer((state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );

      state.totalPrice = state.items.reduce((sum, item) => sum + item.sum, 0);
      state.totalQuantity = state.items.reduce(
        (sum, item) => sum + item.count,
        0
      );
    }),

    // Additional reducers
    incrementCount: create.reducer((state, action: PayloadAction<number>) => {
      const index = state.items.findIndex(
        (item) => item.productId === action.payload
      );
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          count: state.items[index].count + 1,
          sum:
            (state.items[index].count + 1) * state.items[index].product.price,
        };
        state.totalPrice += state.items[index].product.price;
        state.totalQuantity++;
      }
    }),
    decrementCount: create.reducer((state, action: PayloadAction<number>) => {
      const index = state.items.findIndex(
        (item) => item.productId === action.payload
      );
      if (index !== -1) {
        const updatedCount = state.items[index].count - 1;
        if (updatedCount > 0) {
          state.items[index] = {
            ...state.items[index],
            count: updatedCount,
            sum: updatedCount * state.items[index].product.price,
          };
          state.totalPrice -= state.items[index].product.price;
          state.totalQuantity--;
        } else {
          cartSlice.caseReducers.removeFromCart(state, {
            payload: action.payload,
          } as PayloadAction<number>);
        }
      }
    }),
    setItemCount: create.reducer(
      (state, action: PayloadAction<{ id: number; count: number }>) => {
        const index = state.items.findIndex(
          (item) => item.productId === action.payload.id
        );
        if (index !== -1) {
          const difference = action.payload.count - state.items[index].count;
          state.items[index] = {
            ...state.items[index],
            count: action.payload.count,
            sum: action.payload.count * state.items[index].product.price,
          };
          state.totalQuantity += difference;
          state.totalPrice += difference * state.items[index].product.price;

          if (state.items[index].count === 0) {
            cartSlice.caseReducers.removeFromCart(state, {
              payload: action.payload.id,
            } as PayloadAction<number>);
          }
        }
      }
    ),
  }),
});

export const {
  setCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  incrementCount,
  decrementCount,
  setItemCount,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export default cartSlice;

export const getTotalCartQuantity = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.count, 0);

export const getTotalCartPrice = (state: RootState) =>
  state.cart.items.reduce(
    (sum, item) => sum + (item.product.price ?? 0) * item.count,
    0
  );

export const getCurrentQuantityById = (id: number) => (state: RootState) =>
  state.cart.items.find((item: CartItem) => item.productId === id)?.count ?? 0;
