import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosProtected from '../../api/axiosProtected'

const deleteComponent = createAsyncThunk('/components/deleteComponent', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosProtected.delete(`/admin/components/deleteComponent/${sendData.id}`)
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { deleteComponent }

const deleteComponentSlice = createSlice({
  name: 'deleteCarrier',
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
    // deleteComponent
    builder.addCase(deleteComponent.pending, state => {
      state.loading = true
      state.success = false
      state.error = false
    })
    builder.addCase(deleteComponent.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.successMessage = action.payload.message
    })
    builder.addCase(deleteComponent.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { successReset, errorReset } = deleteComponentSlice.actions
export default deleteComponentSlice.reducer
