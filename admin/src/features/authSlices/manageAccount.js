import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosPublic from '../../api/axiosPublic'

const login = createAsyncThunk('/auth/login', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosPublic.post(
      `/admin/auth/login`,
      {
        email: sendData.email,
        password: sendData.password,
      },
      { withCredentials: true }
    )

    data?.userInfo && localStorage.setItem('userInfo', JSON.stringify(data.userInfo))
    data?.accessToken && localStorage.setItem('accessToken', JSON.stringify(data.accessToken))

    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

const logout = createAsyncThunk('/auth/logout', async (_sendData, thunkAPI) => {
  try {
    const { data } = await axiosPublic.get(`/admin/auth/logout`, { withCredentials: true })
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { login, logout }

const userInfo = localStorage.getItem('userInfo')

export const manageAccountSlice = createSlice({
  name: 'manageAccount',
  initialState: {
    loading: false,
    success: false,
    successMessage: '',
    userInfo: userInfo ? JSON.parse(userInfo) : null,
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
    userInfoReset: state => {
      state.userInfo = null
      localStorage.removeItem('userInfo')
      localStorage.removeItem('accessToken')
    },
  },
  extraReducers: builder => {
    //login
    builder.addCase(login.pending, state => {
      state.loading = true
      state.success = false
      state.error = false
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.successMessage = action.payload.message
      state.userInfo = action.payload.userInfo
    })
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
      state.userInfo = null
    })
    //logout
    builder.addCase(logout.pending, state => {
      state.loading = true
      state.success = false
      state.error = false
    })
    builder.addCase(logout.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { successReset, errorReset, messageReset, userInfoReset } = manageAccountSlice.actions
export default manageAccountSlice.reducer
