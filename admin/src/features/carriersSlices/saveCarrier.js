import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosProtected from '../../api/axiosProtected'

const createCarrier = createAsyncThunk('/carriers/createCarrier', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosProtected.post('/admin/carriers/createCarrier', {
      name: sendData.name,
      price: sendData.price,
    })
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
const updateCarrier = createAsyncThunk('/carriers/updateCarrier', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosProtected.put(`/admin/carriers/updateCarrier/${sendData.id}`, {
      name: sendData.name,
      price: sendData.price,
    })
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { createCarrier, updateCarrier }

const saveCarrierSlice = createSlice({
  name: 'saveCarrier',
  initialState: {
    loading: false,
    success: false,
    successMessage: '',
    carrierSaved: null,
    error: false,
    errorMessage: '',
  },
  reducers: {
    successReset: state => {
      state.success = false
      state.carrierSaved = null
    },
    errorReset: state => {
      state.error = false
    },
  },
  extraReducers: builder => {
    //createCarrier
    builder.addCase(createCarrier.pending, state => {
      state.loading = true
      state.success = false
      state.error = false
    })
    builder.addCase(createCarrier.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.successMessage = action.payload.message
      state.carrierSaved = action.payload.carrier
    })
    builder.addCase(createCarrier.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
    //updateCarrier
    builder.addCase(updateCarrier.pending, state => {
      state.loading = true
      state.success = false
      state.error = false
    })
    builder.addCase(updateCarrier.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.successMessage = action.payload.message
      state.carrierSaved = action.payload.carrier
    })
    builder.addCase(updateCarrier.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { errorReset, successReset } = saveCarrierSlice.actions
export default saveCarrierSlice.reducer
