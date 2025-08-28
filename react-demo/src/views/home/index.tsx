import React, { useState, useCallback, useEffect, useRef, useContext } from 'react'
import { debounce } from 'lodash-es'
import { Button } from 'antd'
import { useDebounceFn } from '@/hooks'
import { ThemeContext } from '@/context'

export default function Home() {
	const [status, setStatus] = useState(true)
	const theme = useContext(ThemeContext)
	console.log('theme', theme)
	console.log('home render')

	const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		console.log(e)
		console.log('Button clicked')
	}

	return (
		<div>
			<button onClick={clickHandler}>click</button>
		</div>
	)
}
