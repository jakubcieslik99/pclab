import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosProtected from '../../api/axiosProtected'

const unlikeSetup = createAsyncThunk('/setups/unlikeSetup', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosProtected.delete(`/setups/unlikeSetup/${sendData.id}`)
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { unlikeSetup }

const unlikeSetupSlice = createSlice({
  name: 'unlikeSetup',
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
    builder.addCase(unlikeSetup.pending, state => {
      state.loading = true
      state.success = false
      state.error = false
    })
    builder.addCase(unlikeSetup.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.successMessage = action.payload.message
    })
    builder.addCase(unlikeSetup.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { successReset, errorReset, messageReset } = unlikeSetupSlice.actions
export default unlikeSetupSlice.reducer
