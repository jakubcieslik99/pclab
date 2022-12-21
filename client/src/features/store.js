import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import manageAccountReducer from './authSlices/manageAccount'
import confirmAccountReducer from './authSlices/confirmAccount'
import sendPasswordResetReducer from './authSlices/sendPasswordReset'
import resetPasswordReducer from './authSlices/resetPassword'
import getOrderSlice from './ordersSlices/getOrder'
import placeOrderSlice from './ordersSlices/placeOrder'
import getUserSlice from './userSlices/getUser'
import getLoggedUserSlice from './userSlices/getLoggedUser'

const store = configureStore({
  reducer: {
    //authSlices
    manageAccount: manageAccountReducer,
    confirmAccount: confirmAccountReducer,
    sendPasswordReset: sendPasswordResetReducer,
    resetPassword: resetPasswordReducer,
    //ordersSlices
    getOrder: getOrderSlice,
    placeOrder: placeOrderSlice,
    //setupsSlice
    //userSlice
    getUser: getUserSlice,
    getLoggedUser: getLoggedUserSlice,
  },
  devTools: import.meta.env.VITE_APP_ENV === 'prod' ? false : true,
})

export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector

export default store
