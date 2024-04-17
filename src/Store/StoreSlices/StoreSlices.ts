import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductsAPI } from "../../API";

export interface IProducts {
  id: string;
  title: string;
  price: number | string;
  description: string;
  image: string;
  category: string;
  addNumber?: number;
}

export interface IState {
  loading: "idle" | "loading" | "finished" | "rejected";
  error: null | string;
  products: IProducts[];
  searchValue: string;
  addedItems: IProducts[];
}

const initialState: IState = {
  loading: "idle",
  error: null,
  products: [],
  searchValue: "",
  addedItems: [],
};

export const getAllProducts = createAsyncThunk(
  "products/getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ProductsAPI.getAllProducts();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const StoreSlices = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    addItem: (state, action: PayloadAction<IProducts>) => {
      const itemToAdd = action.payload;

      const existingItem = state.addedItems.find(
        (addedItem) => addedItem.id === itemToAdd.id
      );

      if (existingItem) {
        existingItem.addNumber = (existingItem.addNumber || 0) + 1;
      } else {
        state.addedItems.push({ ...itemToAdd, addNumber: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<IProducts>) => {
      const itemToRemove = action.payload;
      state.addedItems = state.addedItems.filter(
        (addedItem) => addedItem.id !== itemToRemove.id
      );
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.addedItems.find(
        (addedItem) => addedItem.id === action.payload
      );
      if (item) {
        item.addNumber = (item.addNumber || 0) + 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.addedItems.find(
        (addedItem) => addedItem.id === action.payload
      );
      if (item && item.addNumber && item.addNumber > 1) {
        item.addNumber = item.addNumber - 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.loading = "rejected";
        state.error = "error";
      })
      .addCase(
        getAllProducts.fulfilled,
        (state, action: PayloadAction<IProducts[]>) => {
          state.loading = "finished";
          state.error = null;
          state.products = action.payload;
        }
      );
  },
});

export const {
  addItem,
  removeItem,
  setSearchValue,
  incrementQuantity,
  decrementQuantity,
} = StoreSlices.actions;
export default StoreSlices.reducer;
