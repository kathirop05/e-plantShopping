// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice'; // ✅ Correct path, since CartSlice.jsx is in the same folder

// Create a Redux store using configureStore from Redux Toolkit
const store = configureStore({
  // Define the root reducer object
  reducer: {
    // 'cart' is the name of the slice in the store, and it's managed by cartReducer
    cart: cartReducer,
  },
});

export default store; // Export the store for use in the app (e.g., in <Provider store={store}>)
