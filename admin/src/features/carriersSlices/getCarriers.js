import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosProtected from '../../api/axiosProtected'

const getCarriers = createAsyncThunk('/carriers/getCarriers', async (sendData, thunkAPI) => {
  try {
    const searching = `?searching=${sendData.searching}`
    const sorting = `&sorting=${sendData.sorting}`
    const page = `&page=${sendData.page}`
    const limit = `&limit=${sendData.limit || 15}`

    const { data } = await axiosProtected.get(`/admin/carriers/getCarriers${searching}${sorting}${page}${limit}`)
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
    count: 0,
    carriers: [],
    error: false,
    errorMessage: '',
  },
  reducers: {
    errorReset: state => {
      state.error = false
    },
  },
  extraReducers: builder => {
    //getCarriers
    builder.addCase(getCarriers.pending, state => {
      state.loading = true
      state.error = false
    })
    builder.addCase(getCarriers.fulfilled, (state, action) => {
      state.loading = false
      state.count = action.payload.count
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

export const { errorReset } = getCarriersSlice.actions
export default getCarriersSlice.reducer
