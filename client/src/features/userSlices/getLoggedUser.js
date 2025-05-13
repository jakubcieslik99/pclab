import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosProtected from '../../api/axiosProtected'

const getLoggedUser = createAsyncThunk('/user/getLoggedUser', async (_sendData, thunkAPI) => {
  try {
    const controller = new AbortController()
    thunkAPI.signal.addEventListener('abort', () => controller.abort())

    const { data } = await axiosProtected.get('/user/getLoggedUser', { signal: controller.signal })
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { getLoggedUser }

export const getLoggedUserSlice = createSlice({
  name: 'getLoggedUser',
  initialState: { loading: false, orders: [], likedSetups: [], error: false, errorMessage: '' },
  reducers: {
    errorReset: state => {
      state.error = false
    },
    getLoggedUserReset: state => {
      state.orders = []
      state.likedSetups = []
    },
    removeLike: (state, action) => {
      state.likedSetups = state.likedSetups.filter(likedSetup => likedSetup._id !== action.payload)
    },
  },
  extraReducers: builder => {
    builder.addCase(getLoggedUser.pending, state => {
      state.loading = true
      state.error = false
    })
    builder.addCase(getLoggedUser.fulfilled, (state, action) => {
      state.loading = false
      state.orders = action.payload.orders
      state.likedSetups = action.payload.likedSetups
    })
    builder.addCase(getLoggedUser.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { errorReset, getLoggedUserReset, removeLike } = getLoggedUserSlice.actions
export default getLoggedUserSlice.reducer
