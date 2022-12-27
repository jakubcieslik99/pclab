import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosProtected from '../../api/axiosProtected'

const createComment = createAsyncThunk('/setups/createComment', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosProtected.post(`/setups/createComment/${sendData.id}`, { comment: sendData.comment })
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { createComment }

const createCommentSlice = createSlice({
  name: 'createComment',
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
    builder.addCase(createComment.pending, state => {
      state.loading = true
      state.success = false
      state.error = false
    })
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.successMessage = action.payload.message
    })
    builder.addCase(createComment.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { successReset, errorReset } = createCommentSlice.actions
export default createCommentSlice.reducer
