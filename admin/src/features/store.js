import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import manageAccountReducer from './authSlices/manageAccount'
import getOrdersReducer from './ordersSlices/getOrders'
import getOrderReducer from './ordersSlices/getOrder'
import saveOrderReducer from './ordersSlices/saveOrder'
import getCarriersReducer from './carriersSlices/getCarriers'
import getCarrierReducer from './carriersSlices/getCarrier'
import saveCarrierReducer from './carriersSlices/saveCarrier'
import deleteCarrierReducer from './carriersSlices/deleteCarrier'
import getComponentsReducer from './componentsSlices/getComponents'
import getComponentReducer from './componentsSlices/getComponent'
import saveComponentReducer from './componentsSlices/saveComponent'
import deleteComponentReducer from './componentsSlices/deleteComponent'
import getSetupsReducer from './setupsSlices/getSetups'
import deleteSetupReducer from './setupsSlices/deleteSetup'
import getUsersReducer from './usersSlices/getUsers'
import getUserReducer from './usersSlices/getUser'
import saveUserReducer from './usersSlices/saveUser'
import deleteUserReducer from './usersSlices/deleteUser'

const store = configureStore({
  reducer: {
    //authSlices
    manageAccount: manageAccountReducer,
    //ordersSlices
    getOrders: getOrdersReducer,
    getOrder: getOrderReducer,
    saveOrder: saveOrderReducer,
    //carriersSlices
    getCarriers: getCarriersReducer,
    getCarrier: getCarrierReducer,
    saveCarrier: saveCarrierReducer,
    deleteCarrier: deleteCarrierReducer,
    //componentsSlices
    getComponents: getComponentsReducer,
    getComponent: getComponentReducer,
    saveComponent: saveComponentReducer,
    deleteComponent: deleteComponentReducer,
    //setupsSlice
    getSetups: getSetupsReducer,
    deleteSetup: deleteSetupReducer,
    //usersSlices
    getUsers: getUsersReducer,
    getUser: getUserReducer,
    saveUser: saveUserReducer,
    deleteUser: deleteUserReducer,
  },
  devTools: import.meta.env.VITE_APP_ENV === 'prod' ? false : true,
})

export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector

export default store