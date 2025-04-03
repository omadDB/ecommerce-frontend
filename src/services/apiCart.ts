import { axiosPrivate } from '@/lib/axios/axios';
import { CartData, CartItem } from '@/types/cartItemModel';

export async function getCart(userId: number) {
  try {
    const res = await axiosPrivate.get<CartData>(`/cart/${userId}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export const addCartItem = async (item: CartItem) => {
  try {
    console.log(item);
    const res = await axiosPrivate.post<CartItem>('/cart/add', item);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const updateCartItemAPI = async (item: CartItem) => {
  try {
    console.log('Adding to cart:', item);
    const res = await axiosPrivate.put<CartItem>('/cart/update', item);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const removeCartItemAPI = async (productId: number) => {
  try {
    console.log('Adding to cart:', productId);
    const res = await axiosPrivate.delete<CartItem>(
      `/cart/remove/${productId}`
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

// 'use client';

// import { CartData, CartItem } from '@/types/cartItemModel';
// import useAxiosPrivate from '@/lib/axios/useAxiosPrivate';

// // Convert to a custom hook
// export const useCartService = () => {
//   const axiosPrivate = useAxiosPrivate(); // Use the hook to get the authenticated axios instance

//   const getCart = async (userId: number) => {
//     try {
//       const res = await axiosPrivate.get<CartData>(`/cart/${userId}`);
//       return res.data;
//     } catch (err) {
//       console.error(err);
//       throw err; // Re-throw to allow handling in components
//     }
//   };

//   const addCartItem = async (item: CartItem) => {
//     try {
//       console.log(item);
//       const res = await axiosPrivate.post<CartItem>('/cart/add', item);
//       return res.data;
//     } catch (err) {
//       console.error(err);
//       throw err;
//     }
//   };

//   const updateCartItem = async (item: CartItem) => {
//     try {
//       console.log('Updating cart item:', item);
//       const res = await axiosPrivate.put<CartItem>('/cart/update', item);
//       return res.data;
//     } catch (err) {
//       console.error(err);
//       throw err;
//     }
//   };

//   const removeCartItem = async (productId: number) => {
//     try {
//       console.log('Removing from cart:', productId);
//       const res = await axiosPrivate.delete<CartItem>(
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
//     const res = await axiosPrivate.get<CartData>(`/cart/${userId}`);
//     return res.data;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// }
