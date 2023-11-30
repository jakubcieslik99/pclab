import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import manageAccountReducer from './authSlices/manageAccount'
import confirmAccountReducer from './authSlices/confirmAccount'
import sendPasswordResetReducer from './authSlices/sendPasswordReset'
import resetPasswordReducer from './authSlices/resetPassword'
import getOrderReducer from './ordersSlices/getOrder'
import getCarriersReducer from './ordersSlices/getCarriers'
import placeOrderReducer from './ordersSlices/placeOrder'
import getSetupsReducer from './setupsSlices/getSetups'
import getSetupReducer from './setupsSlices/getSetup'
import manageLikedSetupsReducer from './setupsSlices/manageLikedSetups'
import createCommentReducer from './setupsSlices/createComment'
import getComponentsReducer from './setupsSlices/getComponents'
import saveSetupReducer from './setupsSlices/saveSetup'
import deleteSetupReducer from './setupsSlices/deleteSetup'
import getUserReducer from './userSlices/getUser'
import getLoggedUserReducer from './userSlices/getLoggedUser'

const store = configureStore({
  reducer: {
    //authSlices
    manageAccount: manageAccountReducer,
    confirmAccount: confirmAccountReducer,
    sendPasswordReset: sendPasswordResetReducer,
    resetPassword: resetPasswordReducer,
    //ordersSlices
    getOrder: getOrderReducer,
    getCarriers: getCarriersReducer,
    placeOrder: placeOrderReducer,
    //setupsSlice
    getSetups: getSetupsReducer,
    getSetup: getSetupReducer,
    manageLikedSetups: manageLikedSetupsReducer,
    createComment: createCommentReducer,
    getComponents: getComponentsReducer,
    saveSetup: saveSetupReducer,
    deleteSetup: deleteSetupReducer,
    //userSlice
    getUser: getUserReducer,
    getLoggedUser: getLoggedUserReducer,
  },
  devTools: import.meta.env.VITE_APP_ENV === 'production' ? false : true,
})

export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector

export default store
