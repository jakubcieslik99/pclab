import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosProtected from '../../api/axiosProtected'

const getUsers = createAsyncThunk('/users/getUsers', async (sendData, thunkAPI) => {
  try {
    const controller = new AbortController()
    thunkAPI.signal.addEventListener('abort', () => controller.abort())

    const searching = `?searching=${sendData.searching}`
    const sorting = `&sorting=${sendData.sorting}`
    const page = `&page=${sendData.page}`
    const limit = `&limit=${sendData.limit || 15}`

    const { data } = await axiosProtected.get(`/admin/users/getUsers${searching}${sorting}${page}${limit}`, {
      signal: controller.signal,
    })
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { getUsers }

export const getUsersSlice = createSlice({
  name: 'getUsers',
  initialState: { loading: false, count: 0, users: [], error: false, errorMessage: '' },
  reducers: {
    errorReset: state => {
      state.error = false
    },
  },
  extraReducers: builder => {
    // getUsers
    builder.addCase(getUsers.pending, state => {
      state.loading = true
      state.error = false
    })
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false
      state.count = action.payload.count
      state.users = action.payload.users
    })
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { errorReset } = getUsersSlice.actions
export default getUsersSlice.reducer
