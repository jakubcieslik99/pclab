import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import manageAccountReducer from './authSlices/manageAccount'
import confirmAccountReducer from './authSlices/confirmAccount'
import sendPasswordResetReducer from './authSlices/sendPasswordReset'
import resetPasswordReducer from './authSlices/resetPassword'
import getOrderReducer from './ordersSlices/getOrder'
import placeOrderReducer from './ordersSlices/placeOrder'
import getSetupsReducer from './setupsSlices/getSetups'
import getSetupReducer from './setupsSlices/getSetup'
import manageLikedSetupsReducer from './setupsSlices/manageLikedSetups'
import createCommentReducer from './setupsSlices/createComment'
import getComponentsReducer from './setupsSlices/getComponents'
import createSetupReducer from './setupsSlices/createSetup'
import updateSetupReducer from './setupsSlices/updateSetup'
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
    placeOrder: placeOrderReducer,
    //setupsSlice
    getSetups: getSetupsReducer,
    getSetup: getSetupReducer,
    manageLikedSetups: manageLikedSetupsReducer,
    createComment: createCommentReducer,
    getComponents: getComponentsReducer,
    createSetup: createSetupReducer,
    updateSetup: updateSetupReducer,
    deleteSetup: deleteSetupReducer,
    //userSlice
    getUser: getUserReducer,
    getLoggedUser: getLoggedUserReducer,
  },
  devTools: import.meta.env.VITE_APP_ENV === 'prod' ? false : true,
})

export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector

export default store
