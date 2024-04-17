import { configureStore, combineReducers } from "@reduxjs/toolkit";
import StoreSlices from "./StoreSlices/StoreSlices";

const rootReducer = combineReducers({
  products: StoreSlices,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
