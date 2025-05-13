import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosPublic from '../../api/axiosPublic'

const resetPassword = createAsyncThunk('/auth/resetPassword', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosPublic.post('/auth/resetPassword', {
      password: sendData.password,
      repassword: sendData.repassword,
      token: sendData.token,
    })
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { resetPassword }

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState: { loading: false, success: false, successMessage: '', error: false, errorMessage: '' },
  reducers: {
    successReset: state => {
      state.success = false
    },
    errorReset: state => {
      state.error = false
    },
  },
  extraReducers: builder => {
    builder.addCase(resetPassword.pending, state => {
      state.loading = true
      state.success = false
      state.error = false
    })
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.successMessage = action.payload.message
    })
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { successReset, errorReset } = resetPasswordSlice.actions
export default resetPasswordSlice.reducer
