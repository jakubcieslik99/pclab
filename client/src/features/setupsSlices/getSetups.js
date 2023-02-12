import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosPublic from '../../api/axiosPublic'

const getSetups = createAsyncThunk('/setups/getSetups', async (sendData, thunkAPI) => {
  try {
    const controller = new AbortController()
    thunkAPI.signal.addEventListener('abort', () => controller.abort())

    const searching = `?searching=${sendData.searching}`
    const sorting = `&sorting=${sendData.sorting}`
    const priceFrom = `&priceFrom=${sendData.priceFrom}`
    const priceTo = `&priceTo=${sendData.priceTo}`
    const page = `&page=${sendData.page}`
    const limit = `&limit=${sendData.limit || 12}`

    const { data } = await axiosPublic.get(`/setups/getSetups${searching}${sorting}${priceFrom}${priceTo}${page}${limit}`, {
      signal: controller.signal,
    })
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

const getHomeScreenSetups = createAsyncThunk('/setups/getHomeScreenSetups', async (_sendData, thunkAPI) => {
  try {
    const controller = new AbortController()
    thunkAPI.signal.addEventListener('abort', () => controller.abort())

    const sortingTopRated = '?sorting=best_rating'
    const sortingMostPopular = '?sorting=most_popular'
    const limit = '&limit=4'

    const { data: dataTopRated } = await axiosPublic.get(`/setups/getSetups${sortingTopRated}${limit}`, {
      signal: controller.signal,
    })
    const { data: dataMostPopular } = await axiosPublic.get(`/setups/getSetups${sortingMostPopular}${limit}`, {
      signal: controller.signal,
    })

    return { dataTopRated: dataTopRated.setups, dataMostPopular: dataMostPopular.setups }
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { getSetups, getHomeScreenSetups }

export const getSetupsSlice = createSlice({
  name: 'getSetups',
  initialState: {
    loading: false,
    count: 0,
    setups: [],
    topRatedSetups: [],
    mostPopularSetups: [],
    error: false,
    errorMessage: '',
  },
  reducers: {
    errorReset: state => {
      state.error = false
    },
    /*getSetupsReset: state => {
      state.count = 0
      state.setups = []
    },
    getHomeScreenSetupsReset: state => {
      state.topRatedSetups = []
      state.mostPopularSetups = []
    },*/
    addLike: (state, action) => {
      for (let setup of state.setups) {
        if (setup._id === action.payload) {
          setup.likes += 1
          break
        }
      }
      for (let setup of state.topRatedSetups) {
        if (setup._id === action.payload) {
          setup.likes += 1
          break
        }
      }
      for (let setup of state.mostPopularSetups) {
        if (setup._id === action.payload) {
          setup.likes += 1
          break
        }
      }
    },
    removeLike: (state, action) => {
      for (let setup of state.setups) {
        if (setup._id === action.payload) {
          setup.likes -= 1
          break
        }
      }
      for (let setup of state.topRatedSetups) {
        if (setup._id === action.payload) {
          setup.likes -= 1
          break
        }
      }
      for (let setup of state.mostPopularSetups) {
        if (setup._id === action.payload) {
          setup.likes -= 1
          break
        }
      }
    },
  },
  extraReducers: builder => {
    //getSetups
    builder.addCase(getSetups.pending, state => {
      state.loading = true
      state.error = false
    })
    builder.addCase(getSetups.fulfilled, (state, action) => {
      state.loading = false
      state.count = action.payload.count
      state.setups = action.payload.setups
    })
    builder.addCase(getSetups.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
    //getHomeScreenSetups
    builder.addCase(getHomeScreenSetups.pending, state => {
      state.loading = true
      state.error = false
    })
    builder.addCase(getHomeScreenSetups.fulfilled, (state, action) => {
      state.loading = false
      state.topRatedSetups = action.payload.dataTopRated
      state.mostPopularSetups = action.payload.dataMostPopular
    })
    builder.addCase(getHomeScreenSetups.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { errorReset, addLike, removeLike } = getSetupsSlice.actions
export default getSetupsSlice.reducer
