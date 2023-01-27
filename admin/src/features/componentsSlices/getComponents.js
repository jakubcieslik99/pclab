import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosProtected from '../../api/axiosProtected'

const getComponents = createAsyncThunk('/components/getComponents', async (sendData, thunkAPI) => {
  try {
    const searching = `?searching=${sendData.searching}`
    const sorting = `&sorting=${sendData.sorting}`
    const filtering = `&filtering=${sendData.filtering}`
    const page = `&page=${sendData.page}`
    const limit = `&limit=${sendData.limit || 15}`

    const { data } = await axiosProtected.get(
      `/admin/components/getComponents${searching}${sorting}${filtering}${page}${limit}`
    )
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { getComponents }

export const getComponentsSlice = createSlice({
  name: 'getComponents',
  initialState: {
    loading: false,
    count: 0,
    components: [],
    error: false,
    errorMessage: '',
  },
  reducers: {
    errorReset: state => {
      state.error = false
    },
  },
  extraReducers: builder => {
    //getComponents
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

export const { errorReset } = getComponentsSlice.actions
export default getComponentsSlice.reducer
