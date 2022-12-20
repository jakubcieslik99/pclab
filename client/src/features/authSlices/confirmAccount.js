import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosPublic from '../../api/axiosPublic'

const confirmAccount = createAsyncThunk('/auth/confirmAccount', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosPublic.post(`/auth/confirmAccount`, { token: sendData.token })
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { confirmAccount }

const confirmAccountSlice = createSlice({
  name: 'confirmAccount',
  initialState: {
    loading: false,
    success: false,
    successMessage: '',
    error: false,
    errorMessage: '',
  },
  reducers: {
    successReset: state => {
      state.success = false
    },
    errorReset: state => {
      state.error = false
    },
    messageReset: state => {
      state.successMessage = ''
      state.errorMessage = ''
    },
  },
  extraReducers: builder => {
    builder.addCase(confirmAccount.pending, state => {
      state.loading = true
      state.success = false
      state.error = false
    })
    builder.addCase(confirmAccount.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.successMessage = action.payload.message
    })
    builder.addCase(confirmAccount.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { successReset, errorReset, messageReset } = confirmAccountSlice.actions
export default confirmAccountSlice.reducer
