import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosProtected from '../../api/axiosProtected'

const updateUser = createAsyncThunk('/users/updateUser', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosProtected.put(`/admin/users/updateUser/${sendData.id}`, { isAdmin: sendData.isAdmin })
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { updateUser }

const saveUserSlice = createSlice({
  name: 'saveUser',
  initialState: { loading: false, success: false, successMessage: '', userSaved: null, error: false, errorMessage: '' },
  reducers: {
    successReset: state => {
      state.success = false
      state.userSaved = null
    },
    errorReset: state => {
      state.error = false
    },
  },
  extraReducers: builder => {
    // updateUser
    builder.addCase(updateUser.pending, state => {
      state.loading = true
      state.success = false
      state.error = false
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.successMessage = action.payload.message
      state.userSaved = action.payload.user
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { errorReset, successReset } = saveUserSlice.actions
export default saveUserSlice.reducer
