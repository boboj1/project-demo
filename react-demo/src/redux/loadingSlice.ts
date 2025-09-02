import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
	loading: boolean
}

const initialState: InitialState = {
	loading: true,
}

export const loadingSlice = createSlice({
	name: 'loading',
	initialState,
	reducers: {
		setLoading: (state, { payload }) => {
			state.loading = payload
		},
	},
})

export const { setLoading } = loadingSlice.actions
export default loadingSlice.reducer
