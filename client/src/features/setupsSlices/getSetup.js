import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosPublic from '../../api/axiosPublic'

const getSetup = createAsyncThunk('/setups/getSetup', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosPublic.get(`/setups/getSetup/${sendData.id}`)
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
    messageReset: state => {
      state.errorMessage = ''
    },
    getSetupReset: state => {
      state.setup = null
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

export const { errorReset, messageReset, getSetupReset } = getSetupSlice.actions
export default getSetupSlice.reducer
