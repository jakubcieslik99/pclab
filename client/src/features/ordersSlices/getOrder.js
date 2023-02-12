import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosProtected from '../../api/axiosProtected'

const getOrder = createAsyncThunk('/orders/getOrder', async (sendData, thunkAPI) => {
  try {
    const controller = new AbortController()
    thunkAPI.signal.addEventListener('abort', () => controller.abort())

    const { data } = await axiosProtected.get(`/orders/getOrder/${sendData.id}`, { signal: controller.signal })
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { getOrder }

export const getOrderSlice = createSlice({
  name: 'getOrder',
  initialState: {
    loading: false,
    order: null,
    paymentKey: '',
    error: false,
    errorMessage: '',
  },
  reducers: {
    errorReset: state => {
      state.error = false
    },
    getOrderReset: state => {
      state.order = null
      state.paymentKey = ''
    },
  },
  extraReducers: builder => {
    builder.addCase(getOrder.pending, state => {
      state.loading = true
      state.error = false
    })
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.loading = false
      state.order = action.payload.order
      state.paymentKey = action.payload.paymentKey
    })
    builder.addCase(getOrder.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { errorReset, getOrderReset } = getOrderSlice.actions
export default getOrderSlice.reducer
