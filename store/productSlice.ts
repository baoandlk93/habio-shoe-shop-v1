// store/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '@/server/entity';

interface ProductState {
  items: IProduct[];
}

const initialState: ProductState = {
  items: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct(state, action: PayloadAction<IProduct[]>) {
      state.items = action.payload;
    },
    addToProduct(state, action: PayloadAction<IProduct>) {
      // Logic thêm hoặc cập nhật số lượng
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.stock += action.payload.stock;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromProduct(state, action: PayloadAction<number>) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    updateStockProduct(state, action: PayloadAction<{ id: number; stock: number }>) {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) item.stock = action.payload.stock;
    },
    clearProduct(state) {
      state.items = [];
    },
  },
});

export const { setProduct, addToProduct, removeFromProduct, updateStockProduct, clearProduct } = productSlice.actions;
export default productSlice.reducer;
