import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosProtected from '../../api/axiosProtected'

const createComponent = createAsyncThunk('/components/createComponent', async (sendData, thunkAPI) => {
  try {
    const formSendData = new FormData()
    formSendData.append('title', sendData.title)
    formSendData.append('type', sendData.type)
    formSendData.append('moboCompat', sendData.moboCompat)
    formSendData.append('cpuCompat', sendData.cpuCompat)
    formSendData.append('caseCompat', sendData.caseCompat)
    formSendData.append('ramCompat', sendData.ramCompat)
    formSendData.append('url', sendData.url)
    formSendData.append('price', sendData.price)
    formSendData.append('amount', sendData.amount)
    sendData.selectedFiles.forEach(selectedFile => formSendData.append('uploads', selectedFile))

    const { data } = await axiosProtected.post('/admin/components/createComponent', formSendData, {
      onUploadProgress: progressEvent => {
        const { loaded, total } = progressEvent
        const progress = Math.floor((loaded * 100) / total)
        if (progress < 100) thunkAPI.dispatch(uploading(progress))
      },
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
const updateComponent = createAsyncThunk('/components/updateComponent', async (sendData, thunkAPI) => {
  try {
    const formSendData = new FormData()
    formSendData.append('title', sendData.title)
    formSendData.append('type', sendData.type)
    formSendData.append('moboCompat', sendData.moboCompat)
    formSendData.append('cpuCompat', sendData.cpuCompat)
    formSendData.append('caseCompat', sendData.caseCompat)
    formSendData.append('ramCompat', sendData.ramCompat)
    formSendData.append('url', sendData.url)
    formSendData.append('price', sendData.price)
    formSendData.append('amount', sendData.amount)
    sendData.fetchedFiles.forEach(fetchedFile => formSendData.append('images', fetchedFile))
    sendData.selectedFiles.forEach(selectedFile => formSendData.append('uploads', selectedFile))

    const { data } = await axiosProtected.put(`/admin/components/updateComponent/${sendData.id}`, formSendData, {
      onUploadProgress: progressEvent => {
        const { loaded, total } = progressEvent
        const progress = Math.floor((loaded * 100) / total)
        if (progress < 100) thunkAPI.dispatch(uploading(progress))
      },
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export { createComponent, updateComponent }

const saveComponentSlice = createSlice({
  name: 'saveComponent',
  initialState: {
    loading: false,
    progress: 0,
    success: false,
    successMessage: '',
    componentSaved: null,
    error: false,
    errorMessage: '',
  },
  reducers: {
    uploading: (state, action) => {
      state.progress = action.payload
    },
    successReset: state => {
      state.success = false
      state.componentSaved = null
    },
    errorReset: state => {
      state.error = false
    },
  },
  extraReducers: builder => {
    // createComponent
    builder.addCase(createComponent.pending, state => {
      state.loading = true
      state.progress = 0
      state.success = false
      state.error = false
    })
    builder.addCase(createComponent.fulfilled, (state, action) => {
      state.loading = false
      state.progress = 0
      state.success = true
      state.successMessage = action.payload.message
      state.componentSaved = action.payload.component
    })
    builder.addCase(createComponent.rejected, (state, action) => {
      state.loading = false
      state.progress = 0
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
    // updateComponent
    builder.addCase(updateComponent.pending, state => {
      state.loading = true
      state.progress = 0
      state.success = false
      state.error = false
    })
    builder.addCase(updateComponent.fulfilled, (state, action) => {
      state.loading = false
      state.progress = 0
      state.success = true
      state.successMessage = action.payload.message
      state.componentSaved = action.payload.component
    })
    builder.addCase(updateComponent.rejected, (state, action) => {
      state.loading = false
      state.progress = 0
      if (action.payload) {
        state.error = true
        state.errorMessage = action.payload
      }
    })
  },
})

export const { uploading, errorReset, successReset } = saveComponentSlice.actions
export default saveComponentSlice.reducer
