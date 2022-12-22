import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosProtected from '../../api/axiosProtected'

const createSetup = createAsyncThunk('/setups/createSetup', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosProtected.post(`/setups/createSetup`, {
      case: sendData.case,
      cpu: sendData.cpu,
      mobo: sendData.mobo,
      ram: sendData.ram,
      gpu: sendData.gpu,
      psu: sendData.psu,
      driveOne: sendData.driveOne,
      driveTwo: sendData.driveTwo,
      driveThree: sendData.driveThree,
      description: sendData.description,
    })
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { createSetup }

const createSetupSlice = createSlice({
  name: 'createSetup',
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
    builder.addCase(createSetup.pending, state => {
      state.loading = true
      state.success = false
      state.error = false
    })
    builder.addCase(createSetup.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.successMessage = action.payload.message
    })
    builder.addCase(createSetup.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { successReset, errorReset, messageReset } = createSetupSlice.actions
export default createSetupSlice.reducer
