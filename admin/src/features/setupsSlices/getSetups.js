import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosProtected from '../../api/axiosProtected'

const getSetups = createAsyncThunk('/setups/getSetups', async (sendData, thunkAPI) => {
  try {
    const controller = new AbortController()
    thunkAPI.signal.addEventListener('abort', () => controller.abort())

    const searching = `?searching=${sendData.searching}`
    const sorting = `&sorting=${sendData.sorting}`
    const page = `&page=${sendData.page}`
    const limit = `&limit=${sendData.limit || 15}`

    const { data } = await axiosProtected.get(`/admin/setups/getSetups${searching}${sorting}${page}${limit}`, {
      signal: controller.signal,
    })
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { getSetups }

export const getSetupsSlice = createSlice({
  name: 'getSetups',
  initialState: { loading: false, count: 0, setups: [], error: false, errorMessage: '' },
  reducers: {
    errorReset: state => {
      state.error = false
    },
  },
  extraReducers: builder => {
    // getSetups
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

export const { errorReset } = getSetupsSlice.actions
export default getSetupsSlice.reducer
