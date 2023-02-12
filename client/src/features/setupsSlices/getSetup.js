import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosPublic from '../../api/axiosPublic'

const getSetup = createAsyncThunk('/setups/getSetup', async (sendData, thunkAPI) => {
  try {
    const controller = new AbortController()
    thunkAPI.signal.addEventListener('abort', () => controller.abort())

    const { data } = await axiosPublic.get(`/setups/getSetup/${sendData.id}`, { signal: controller.signal })
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { getSetup }

export const getSetupSlice = createSlice({
  name: 'getSetup',
  initialState: {
    loading: false,
    setup: null,
    error: false,
    errorMessage: '',
  },
  reducers: {
    errorReset: state => {
      state.error = false
    },
    /*getSetupReset: state => {
      state.setup = null
    },*/
    addLike: (state, action) => {
      if (state.setup?._id === action.payload) state.setup.likes += 1
    },
    removeLike: (state, action) => {
      if (state.setup?._id === action.payload) state.setup.likes -= 1
    },
    addComment: (state, action) => {
      if (state.setup?._id === action.payload._id) state.setup.comments = action.payload.comments
    },
  },
  extraReducers: builder => {
    builder.addCase(getSetup.pending, state => {
      state.loading = true
      state.error = false
    })
    builder.addCase(getSetup.fulfilled, (state, action) => {
      state.loading = false
      state.setup = action.payload.setup
    })
    builder.addCase(getSetup.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { errorReset, getSetupReset, addLike, removeLike, addComment } = getSetupSlice.actions
export default getSetupSlice.reducer
