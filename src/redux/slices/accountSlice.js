import { createSlice } from '@reduxjs/toolkit'

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    loggedIn: sessionStorage.getItem("kees-customer-token") ? true : false,
  },
  reducers: {
    loginn: (state, action) => {
      sessionStorage.setItem("kees-customer-id", action.payload.data.id)
      sessionStorage.setItem("kees-customer-token", action.payload.data.token)
      sessionStorage.setItem("kees-customer-email", action.payload.data.email)
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.loggedIn = true

    },
    logout: (state) => {
      sessionStorage.removeItem('kees-customer-token')
      sessionStorage.removeItem('kees-customer-id')
      sessionStorage.removeItem('kees-customer-email')
      state.loggedIn = false
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { loginn, logout } = accountSlice.actions

// console.log(accountSlice)
export default accountSlice.reducer