import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosProtected from '../../api/axiosProtected'

const deleteSetup = createAsyncThunk('/setups/deleteSetup', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosProtected.delete(`/setups/deleteSetup/${sendData.id}`)
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { deleteSetup }

const deleteSetupSlice = createSlice({
  name: 'deleteSetup',
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
  },
  extraReducers: builder => {
    builder.addCase(deleteSetup.pending, state => {
      state.loading = true
      state.success = false
      state.error = false
    })
    builder.addCase(deleteSetup.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.successMessage = action.payload.message
    })
    builder.addCase(deleteSetup.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { successReset, errorReset } = deleteSetupSlice.actions
export default deleteSetupSlice.reducer
