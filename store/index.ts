import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
  },
});

// Cần thiết cho TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
