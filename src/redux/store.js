import { configureStore } from '@reduxjs/toolkit'
import accountReducer from './slices/accountSlice'
import cartReducer from './slices/cartSlice'

export default configureStore({
  reducer: {
    account: accountReducer,
    cart: cartReducer,
  },
})