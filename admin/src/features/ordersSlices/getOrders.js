import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosProtected from '../../api/axiosProtected'

const getOrders = createAsyncThunk('/orders/getOrders', async (sendData, thunkAPI) => {
  try {
    const searching = `?searching=${sendData.searching}`
    const sorting = `&sorting=${sendData.sorting}`
    const filtering = `&filtering=${sendData.filtering}`
    const page = `&page=${sendData.page}`
    const limit = `&limit=${sendData.limit || 15}`

    const { data } = await axiosProtected.get(`/admin/orders/getOrders${searching}${sorting}${filtering}${page}${limit}`)
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { getOrders }

export const getOrdersSlice = createSlice({
  name: 'getOrders',
  initialState: {
    loading: false,
    count: 0,
    orders: [],
    error: false,
    errorMessage: '',
  },
  reducers: {
    errorReset: state => {
      state.error = false
    },
  },
  extraReducers: builder => {
    //getOrders
    builder.addCase(getOrders.pending, state => {
      state.loading = true
      state.error = false
    })
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.loading = false
      state.count = action.payload.count
      state.orders = action.payload.orders
    })
    builder.addCase(getOrders.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { errorReset } = getOrdersSlice.actions
export default getOrdersSlice.reducer
