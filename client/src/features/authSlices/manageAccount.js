import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosPublic from '../../api/axiosPublic'
import axiosProtected from '../../api/axiosProtected'

const registerAccount = createAsyncThunk('/auth/register', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosPublic.post(
      '/auth/register',
      {
        email: sendData.email,
        nick: sendData.nick,
        password: sendData.password,
        repassword: sendData.repassword,
        terms: sendData.terms,
      },
      { withCredentials: true },
    )
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
const login = createAsyncThunk('/auth/login', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosPublic.post(
      '/auth/login',
      { email: sendData.email, password: sendData.password },
      { withCredentials: true },
    )

    data?.userInfo && localStorage.setItem('userInfo', JSON.stringify(data.userInfo))
    data?.accessToken && localStorage.setItem('accessToken', JSON.stringify(data.accessToken))

    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

const updateAccount = createAsyncThunk('/auth/updateAccount', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosProtected.put('/auth/updateAccount', {
      email: sendData.email,
      nick: sendData.nick,
      password: sendData.password,
      newpassword: sendData.newpassword,
    })

    data?.userInfo && localStorage.setItem('userInfo', JSON.stringify(data.userInfo))
    data?.accessToken && localStorage.setItem('accessToken', JSON.stringify(data.accessToken))

    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

const deleteAccount = createAsyncThunk('/auth/deleteAccount', async (sendData, thunkAPI) => {
  try {
    const { data } = await axiosProtected.delete('/auth/deleteAccount', { id: sendData.id })
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

const logout = createAsyncThunk('/auth/logout', async (_sendData, thunkAPI) => {
  try {
    const { data } = await axiosPublic.get('/auth/logout', { withCredentials: true })
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { registerAccount, login, updateAccount, deleteAccount, logout }

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
    // register
    builder.addCase(registerAccount.pending, state => {
      state.loading = true
      state.success = false
      state.error = false
    })
    builder.addCase(registerAccount.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.successMessage = action.payload.message
    })
    builder.addCase(registerAccount.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
    // login
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
    // updateAccount
    builder.addCase(updateAccount.pending, state => {
      state.loading = true
      state.success = false
      state.error = false
    })
    builder.addCase(updateAccount.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.successMessage = action.payload.message
      state.userInfo = action.payload.userInfo
    })
    builder.addCase(updateAccount.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
      state.userInfo = null
    })
    // deleteAccount
    builder.addCase(deleteAccount.pending, state => {
      state.loading = true
      state.success = false
      state.error = false
    })
    builder.addCase(deleteAccount.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.successMessage = action.payload.message
    })
    builder.addCase(deleteAccount.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
    // logout
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
