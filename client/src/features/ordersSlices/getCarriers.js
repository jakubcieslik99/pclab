import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosPublic from '../../api/axiosPublic'

const getCarriers = createAsyncThunk('/orders/getCarriers', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosPublic.get(`/orders/getCarriers`)
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { getCarriers }

export const getCarriersSlice = createSlice({
  name: 'getCarriers',
  initialState: {
    loading: false,
    carriers: [],
    error: false,
    errorMessage: '',
  },
  reducers: {
    errorReset: state => {
      state.error = false
    },
    getCarriersReset: state => {
      state.carriers = []
    },
  },
  extraReducers: builder => {
    builder.addCase(getCarriers.pending, state => {
      state.loading = true
      state.error = false
    })
    builder.addCase(getCarriers.fulfilled, (state, action) => {
      state.loading = false
      state.carriers = action.payload.carriers
    })
    builder.addCase(getCarriers.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { errorReset, getCarriersReset } = getCarriersSlice.actions
export default getCarriersSlice.reducer
