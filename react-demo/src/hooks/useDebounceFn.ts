import { useRef, useEffect, useCallback } from 'react'

export function useDebounceFn<T extends (...args: any[]) => any>(fn: T, delay?: number) {
	const timerRef = useRef<number | null>()
	const funcRef = useRef<Function>()

	useEffect(() => {
		funcRef.current = fn

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current)
			}
		}
	}, [fn])

	const debounceFn = useCallback(
		function (this: any, ...args: any[]) {
			if (timerRef.current) {
				clearTimeout(timerRef.current)
			}

			timerRef.current = setTimeout(() => {
				funcRef.current?.apply(this, args)
				timerRef.current = null
			}, delay)
		},
		[delay]
	)

	useEffect(() => {
		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current)
			}
		}
	}, [])

	return debounceFn
}
