import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import manageAccountReducer from './authSlices/manageAccount'
import getOrdersReducer from './ordersSlices/getOrders'
import getOrderReducer from './ordersSlices/getOrder'
import saveOrderReducer from './ordersSlices/saveOrder'
import getCarriersReducer from './carriersSlices/getCarriers'
import saveCarrierReducer from './carriersSlices/saveCarrier'
import deleteCarrierReducer from './carriersSlices/deleteCarrier'
import getComponentsReducer from './componentsSlices/getComponents'
import saveComponentReducer from './componentsSlices/saveComponent'
import deleteComponentReducer from './componentsSlices/deleteComponent'
import getSetupsReducer from './setupsSlices/getSetups'
import deleteSetupReducer from './setupsSlices/deleteSetup'
import getUsersReducer from './usersSlices/getUsers'
import saveUserReducer from './usersSlices/saveUser'
import deleteUserReducer from './usersSlices/deleteUser'

const store = configureStore({
  reducer: {
    // authSlices
    manageAccount: manageAccountReducer,
    // ordersSlices
    getOrders: getOrdersReducer,
    getOrder: getOrderReducer,
    saveOrder: saveOrderReducer,
    // carriersSlices
    getCarriers: getCarriersReducer,
    saveCarrier: saveCarrierReducer,
    deleteCarrier: deleteCarrierReducer,
    // componentsSlices
    getComponents: getComponentsReducer,
    saveComponent: saveComponentReducer,
    deleteComponent: deleteComponentReducer,
    // setupsSlice
    getSetups: getSetupsReducer,
    deleteSetup: deleteSetupReducer,
    // usersSlices
    getUsers: getUsersReducer,
    saveUser: saveUserReducer,
    deleteUser: deleteUserReducer,
  },
  devTools: import.meta.env.VITE_APP_ENV === 'production' ? false : true,
})

export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector

export default store
