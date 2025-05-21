import { axiosInstance } from '@/lib/axios/axios';
import { CartData, CartItem } from '@/types/cartItemModel';

export async function getCart(userId: number) {
  try {
    const res = await axiosInstance.get<CartData>(`/cart/${userId}`);
    return res.data;
  } catch (err) {
    console.error('Error fetching cart:', err);
    // Return empty cart on error
    return { cartItems: [], totalQuantity: 0, totalPrice: 0 };
  }
}

export const addCartItem = async (item: CartItem) => {
  try {
    const res = await axiosInstance.post<CartItem>('/cart/add', item);
    return res.data;
  } catch (err) {
    console.error('Error adding to cart:', err);
    throw err;
  }
};

export const updateCartItemAPI = async (item: CartItem) => {
  try {
    const res = await axiosInstance.put<CartItem>('/cart/update', item);
    return res.data;
  } catch (err) {
    console.error('Error updating cart:', err);
    throw err;
  }
};

export const removeCartItemAPI = async (productId: number) => {
  try {
    const res = await axiosInstance.delete<CartItem>(
      `/cart/remove/${productId}`
    );
    return res.data;
  } catch (err) {
    console.error('Error removing from cart:', err);
    throw err;
  }
};

// 'use client';

// import { CartData, CartItem } from '@/types/cartItemModel';
// import useaxiosInstance from '@/lib/axios/useaxiosInstance';

// // Convert to a custom hook
// export const useCartService = () => {
//   const axiosInstance = useaxiosInstance(); // Use the hook to get the authenticated axios instance

//   const getCart = async (userId: number) => {
//     try {
//       const res = await axiosInstance.get<CartData>(`/cart/${userId}`);
//       return res.data;
//     } catch (err) {
//       console.error(err);
//       throw err; // Re-throw to allow handling in components
//     }
//   };

//   const addCartItem = async (item: CartItem) => {
//     try {
//       console.log(item);
//       const res = await axiosInstance.post<CartItem>('/cart/add', item);
//       return res.data;
//     } catch (err) {
//       console.error(err);
//       throw err;
//     }
//   };

//   const updateCartItem = async (item: CartItem) => {
//     try {
//       console.log('Updating cart item:', item);
//       const res = await axiosInstance.put<CartItem>('/cart/update', item);
//       return res.data;
//     } catch (err) {
//       console.error(err);
//       throw err;
//     }
//   };

//   const removeCartItem = async (productId: number) => {
//     try {
//       console.log('Removing from cart:', productId);
//       const res = await axiosInstance.delete<CartItem>(
//         `/cart/remove/${productId}`
//       );
//       return res.data;
//     } catch (err) {
//       console.error(err);
//       throw err;
//     }
//   };

//   return {
//     getCart,
//     addCartItem,
//     updateCartItem,
//     removeCartItem,
//   };
// };

// export async function getCartServer(userId: number) {
//   try {
//     const res = await axiosInstance.get<CartData>(`/cart/${userId}`);
//     return res.data;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// }
