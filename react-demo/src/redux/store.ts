import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from './userInfoSlice'
import loadingReducer from './loadingSlice'

export const store = configureStore({
	reducer: {
		userInfo: userInfoReducer,
		loading: loadingReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
