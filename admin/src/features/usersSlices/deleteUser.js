import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosProtected from '../../api/axiosProtected'

const deleteUser = createAsyncThunk('/users/deleteUser', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosProtected.delete(`/admin/users/deleteUser/${sendData.id}`)
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { deleteUser }

const deleteUserSlice = createSlice({
  name: 'deleteUser',
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
    // deleteUser
    builder.addCase(deleteUser.pending, state => {
      state.loading = true
      state.success = false
      state.error = false
    })
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.successMessage = action.payload.message
    })
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { successReset, errorReset } = deleteUserSlice.actions
export default deleteUserSlice.reducer
