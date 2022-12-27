import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosPublic from '../../api/axiosPublic'

const getUser = createAsyncThunk('/user/getUser', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosPublic.get(`/user/getUser/${sendData.id}`)
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { getUser }

export const getUserSlice = createSlice({
  name: 'getUser',
  initialState: {
    loading: false,
    user: '',
    setups: [],
    error: false,
    errorMessage: '',
  },
  reducers: {
    errorReset: state => {
      state.error = false
    },
    getUserReset: state => {
      state.user = ''
      state.setups = []
    },
  },
  extraReducers: builder => {
    builder.addCase(getUser.pending, state => {
      state.loading = true
      state.error = false
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload.user
      state.setups = action.payload.setups
    })
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { errorReset, getUserReset } = getUserSlice.actions
export default getUserSlice.reducer
