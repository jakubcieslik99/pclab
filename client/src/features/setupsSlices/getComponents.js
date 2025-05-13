import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosProtected from '../../api/axiosProtected'

const getComponents = createAsyncThunk('/setups/getComponents', async (sendData, thunkAPI) => {
  try {
    const controller = new AbortController()
    thunkAPI.signal.addEventListener('abort', () => controller.abort())

    const searching = `?searching=${sendData.searching}`
    const type = `&type=${sendData.type}`
    const page = `&page=${sendData.page}`

    const { data } = await axiosProtected.get(`/setups/getComponents${searching}${type}${page}`, {
      params: {
        moboCompat: sendData.moboCompat || '',
        cpuCompat: sendData.cpuCompat || '',
        caseCompat: sendData.caseCompat || '',
        ramCompat: sendData.ramCompat || '',
      },
      signal: controller.signal,
    })
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { getComponents }

export const getComponentsSlice = createSlice({
  name: 'getComponents',
  initialState: { loading: false, count: 0, components: [], error: false, errorMessage: '' },
  reducers: {
    errorReset: state => {
      state.error = false
    },
    getComponentsReset: state => {
      state.count = 0
      state.components = []
    },
  },
  extraReducers: builder => {
    builder.addCase(getComponents.pending, state => {
      state.loading = true
      state.error = false
    })
    builder.addCase(getComponents.fulfilled, (state, action) => {
      state.loading = false
      state.count = action.payload.count
      state.components = action.payload.components
    })
    builder.addCase(getComponents.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { errorReset, getComponentsReset } = getComponentsSlice.actions
export default getComponentsSlice.reducer
