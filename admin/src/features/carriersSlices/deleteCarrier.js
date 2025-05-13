import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosProtected from '../../api/axiosProtected'

const deleteCarrier = createAsyncThunk('/carriers/deleteCarrier', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosProtected.delete(`/admin/carriers/deleteCarrier/${sendData.id}`)
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { deleteCarrier }

const deleteCarrierSlice = createSlice({
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
    // deleteCarrier
    builder.addCase(deleteCarrier.pending, state => {
      state.loading = true
      state.success = false
      state.error = false
    })
    builder.addCase(deleteCarrier.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.successMessage = action.payload.message
    })
    builder.addCase(deleteCarrier.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { successReset, errorReset } = deleteCarrierSlice.actions
export default deleteCarrierSlice.reducer
