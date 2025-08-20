import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUserInfo = createAsyncThunk('userInfo/fetchUserInfo', async (_, { dispatch }) => {
  const response = await fetch('/api/userInfo')
  const data = await response.json()
  dispatch(setUserInfo(data.data))
})

interface InitialState {
  userInfo: {
    userName: string
    age: number | null
  }
}

const initialState: InitialState = {
  userInfo: {
    userName: '',
    age: null,
  },
}

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload
    },
  },
})

export const { setUserInfo } = userInfoSlice.actions

export default userInfoSlice.reducer
