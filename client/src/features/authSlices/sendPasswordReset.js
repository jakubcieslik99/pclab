import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosPublic from '../../api/axiosPublic'

const sendPasswordReset = createAsyncThunk('/auth/sendPasswordReset', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosPublic.post(`/auth/sendPasswordReset`, { email: sendData.email })
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { sendPasswordReset }

const sendPasswordResetSlice = createSlice({
  name: 'sendPasswordReset',
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
    builder.addCase(sendPasswordReset.pending, state => {
      state.loading = true
      state.success = false
      state.error = false
    })
    builder.addCase(sendPasswordReset.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.successMessage = action.payload.message
    })
    builder.addCase(sendPasswordReset.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { successReset, errorReset, messageReset } = sendPasswordResetSlice.actions
export default sendPasswordResetSlice.reducer
