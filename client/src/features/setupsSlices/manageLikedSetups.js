import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosProtected from '../../api/axiosProtected'

const getLikedSetups = createAsyncThunk('/setups/getLikedSetups', async (_sendData, thunkAPI) => {
  try {
    const { data } = await axiosProtected.get(`/setups/getLikedSetups`)
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

const likeSetup = createAsyncThunk('/setups/likeSetup', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosProtected.post(`/setups/likeSetup/${sendData.id}`)
    return { ...data, id: sendData.id }
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

const unlikeSetup = createAsyncThunk('/setups/unlikeSetup', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosProtected.delete(`/setups/unlikeSetup/${sendData.id}`)
    return { ...data, id: sendData.id }
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { getLikedSetups, likeSetup, unlikeSetup }

const manageLikedSetupsSlice = createSlice({
  name: 'manageLikedSetups',
  initialState: {
    loading: false,
    likedSetups: [],
    like: '',
    unlike: '',
    error: false,
    errorMessage: '',
  },
  reducers: {
    errorReset: state => {
      state.error = false
    },
    /*likedSetupsReset: state => {
      state.likedSetups = []
    },*/
    likeUnlikeReset: state => {
      state.like = ''
      state.unlike = ''
    },
  },
  extraReducers: builder => {
    //getLikedSetups
    builder.addCase(getLikedSetups.pending, state => {
      state.loading = true
      state.error = false
    })
    builder.addCase(getLikedSetups.fulfilled, (state, action) => {
      state.loading = false
      state.likedSetups = action.payload.likedSetups
    })
    builder.addCase(getLikedSetups.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
    //likeSetup
    builder.addCase(likeSetup.pending, state => {
      state.loading = true
      state.error = false
    })
    builder.addCase(likeSetup.fulfilled, (state, action) => {
      state.loading = false
      state.likedSetups = action.payload.likedSetups
      state.like = action.payload.id
    })
    builder.addCase(likeSetup.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
    //unlikeSetup
    builder.addCase(unlikeSetup.pending, state => {
      state.loading = true
      state.error = false
    })
    builder.addCase(unlikeSetup.fulfilled, (state, action) => {
      state.loading = false
      state.likedSetups = action.payload.likedSetups
      state.unlike = action.payload.id
    })
    builder.addCase(unlikeSetup.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { successReset, errorReset, likeUnlikeReset } = manageLikedSetupsSlice.actions
export default manageLikedSetupsSlice.reducer
