import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosProtected from '../../api/axiosProtected'

const likeSetup = createAsyncThunk('/setups/likeSetup', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosProtected.post(`/setups/likeSetup/${sendData.id}`)
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { likeSetup }

const likeSetupSlice = createSlice({
  name: 'likeSetup',
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
    builder.addCase(likeSetup.pending, state => {
      state.loading = true
      state.success = false
      state.error = false
    })
    builder.addCase(likeSetup.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.successMessage = action.payload.message
    })
    builder.addCase(likeSetup.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { successReset, errorReset, messageReset } = likeSetupSlice.actions
export default likeSetupSlice.reducer
