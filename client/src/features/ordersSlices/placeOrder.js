import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosProtected from '../../api/axiosProtected'

const placeOrder = createAsyncThunk('/orders/placeOrder', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosProtected.post(`/orders/placeOrder`, {
      setupId: sendData.setupId,
      carrierId: sendData.carrierId,
      shippingDetails: sendData.shippingDetails,
    })
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { placeOrder }

export const placeOrderSlice = createSlice({
  name: 'placeOrder',
  initialState: {
    loading: false,
    orderId: '',
    error: false,
    errorMessage: '',
  },
  reducers: {
    errorReset: state => {
      state.error = false
    },
    placeOrderReset: state => {
      state.orderId = ''
    },
  },
  extraReducers: builder => {
    builder.addCase(placeOrder.pending, state => {
      state.loading = true
      state.error = false
    })
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      state.loading = false
      state.orderId = action.payload.orderId
    })
    builder.addCase(placeOrder.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { errorReset, placeOrderReset } = placeOrderSlice.actions
export default placeOrderSlice.reducer
