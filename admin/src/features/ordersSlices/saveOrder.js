import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosProtected from '../../api/axiosProtected'

const updateOrder = createAsyncThunk('/orders/updateOrder', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosProtected.put(`/admin/orders/updateOrder/${sendData.id}`, {
      status: sendData.status,
      tracking: sendData.tracking,
    })
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { updateOrder }

const saveOrderSlice = createSlice({
  name: 'saveOrder',
  initialState: { loading: false, success: false, successMessage: '', orderSaved: null, error: false, errorMessage: '' },
  reducers: {
    successReset: state => {
      state.success = false
      state.orderSaved = null
    },
    errorReset: state => {
      state.error = false
    },
  },
  extraReducers: builder => {
    // updateOrder
    builder.addCase(updateOrder.pending, state => {
      state.loading = true
      state.success = false
      state.error = false
    })
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.successMessage = action.payload.message
      state.orderSaved = action.payload.order
    })
    builder.addCase(updateOrder.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { errorReset, successReset } = saveOrderSlice.actions
export default saveOrderSlice.reducer
