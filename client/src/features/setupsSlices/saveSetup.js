import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosProtected from '../../api/axiosProtected'

const createSetup = createAsyncThunk('/setups/createSetup', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosProtected.post('/setups/createSetup', {
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

const updateSetup = createAsyncThunk('/setups/updateSetup', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosProtected.put(`/setups/updateSetup/${sendData.id}`, {
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

export { createSetup, updateSetup }

const saveSetupSlice = createSlice({
  name: 'saveSetup',
  initialState: { loading: false, idSaved: '', error: false, errorMessage: '' },
  reducers: {
    errorReset: state => {
      state.error = false
    },
    idSavedReset: state => {
      state.idSaved = ''
    },
  },
  extraReducers: builder => {
    // createSetup
    builder.addCase(createSetup.pending, state => {
      state.loading = true
      state.error = false
    })
    builder.addCase(createSetup.fulfilled, (state, action) => {
      state.loading = false
      state.idSaved = action.payload.setup._id
    })
    builder.addCase(createSetup.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
    // updateSetup
    builder.addCase(updateSetup.pending, state => {
      state.loading = true
      state.error = false
    })
    builder.addCase(updateSetup.fulfilled, (state, action) => {
      state.loading = false
      state.idSaved = action.payload.setup._id
    })
    builder.addCase(updateSetup.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { errorReset, idSavedReset } = saveSetupSlice.actions
export default saveSetupSlice.reducer
