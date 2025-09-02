import { setLoading } from '@/redux/loadingSlice'
import { useAppDispatch, useAppSelector } from './index'
import { useCallback } from 'react'

export const useAppLoading = () => {
	const dispatch = useAppDispatch()
	const loading = useAppSelector(state => state.loading.loading)

	const setAppLoading = useCallback((loading: boolean) => {
		dispatch(setLoading(loading))
	}, [])

	return [loading, setAppLoading] as const
}
