import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosPublic from '../../api/axiosPublic'

const getSetups = createAsyncThunk('/setups/getSetups', async (sendData, thunkAPI) => {
  try {
    const searching = `?searching=${sendData.searching}`
    const sorting = `&sorting=${sendData.sorting}`
    const priceFrom = `&priceFrom=${sendData.priceFrom}`
    const priceTo = `&priceTo=${sendData.priceTo}`
    const page = `&page=${sendData.page}`
    const limit = `&limit=${15}`

    const { data } = await axiosPublic.get(`/setups/getSetups${searching}${sorting}${priceFrom}${priceTo}${page}${limit}`)
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { getSetups }

export const getSetupsSlice = createSlice({
  name: 'getSetups',
  initialState: {
    loading: false,
    count: 0,
    setups: [],
    error: false,
    errorMessage: '',
  },
  reducers: {
    errorReset: state => {
      state.error = false
    },
    messageReset: state => {
      state.errorMessage = ''
    },
    getSetupsReset: state => {
      state.count = 0
      state.setups = []
    },
  },
  extraReducers: builder => {
    builder.addCase(getSetups.pending, state => {
      state.loading = true
      state.error = false
    })
    builder.addCase(getSetups.fulfilled, (state, action) => {
      state.loading = false
      state.count = action.payload.count
      state.setups = action.payload.setups
    })
    builder.addCase(getSetups.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { errorReset, messageReset, getSetupsReset } = getSetupsSlice.actions
export default getSetupsSlice.reducer
