import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import manageAccountReducer from './authSlices/manageAccount'

const store = configureStore({
  reducer: {
    manageAccount: manageAccountReducer,
  },
  devTools: import.meta.env.VITE_APP_ENV === 'prod' ? false : true,
})

export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector

export default store
