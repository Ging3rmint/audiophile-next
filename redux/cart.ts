import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// declaring the types for our state
export type CartState = {
  cartItems: {
    quantity: number;
    name: string;
    category: string;
    slug: string;
    price: number;
    image: string;
    tag: string;
  }[];
};

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions.
  // In this example, 'increment', 'decrement' and 'incrementByAmount' are actions. They can be triggered from outside this slice, anywhere in the app.
  // So for example, if we make a dispatch to the 'increment' action here from the index page, it will get triggered and change the value of the state from 0 to 1.
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    addCartItem: (
      state,
      action: PayloadAction<{
        quantity: number;
        name: string;
        category: string;
        slug: string;
        price: number;
        image: string;
        tag: string;
      }>
    ) => {
      const newCartItems = [...state.cartItems];

      if (!newCartItems.length) {
        state.cartItems = [action.payload];
      } else {
        const targetItemIndex = newCartItems.findIndex(
          (item) => item.slug === action.payload.slug
        );
        if (targetItemIndex < 0) {
          newCartItems.push(action.payload);
          state.cartItems = newCartItems;
        } else {
          newCartItems[targetItemIndex].quantity += action.payload.quantity;
          state.cartItems = newCartItems;
        }
      }
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      const newCartItems = [...state.cartItems].filter(
        (item) => item.slug !== action.payload
      );
      state.cartItems = newCartItems;
    },
    // 'The increment by amount' action here, has one job and that is to take whatever value is passed to it and add that to state.value.
    // The PayloadAction type here is used to declare the contents of `action.payload`
    updateCart: (
      state,
      action: PayloadAction<{
        quantity: number;
        name: string;
        category: string;
        slug: string;
        price: number;
        image: string;
        tag: string;
      }>
    ) => {
      const newCartItems = [...state.cartItems];

      if (!newCartItems.length) {
        state.cartItems = [action.payload];
      } else {
        const targetItemIndex = newCartItems.findIndex(
          (item) => item.slug === action.payload.slug
        );
        if (targetItemIndex < 0) {
          newCartItems.push(action.payload);
          state.cartItems = newCartItems;
        } else {
          newCartItems[targetItemIndex].quantity = action.payload.quantity;
          state.cartItems = newCartItems;
        }
      }
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { updateCart, clearCart, removeCartItem, addCartItem } =
  cartSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectCartItems = (state: RootState) => state.cart.cartItems;

// exporting the reducer here, as we need to add this to the store
export default cartSlice.reducer;
