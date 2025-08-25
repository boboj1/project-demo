import { useState, useCallback, useEffect, useRef, useContext } from 'react'
import { debounce } from 'lodash-es'
import { Button } from 'antd'
import { useDebounceFn } from '@/hooks'
import { ThemeContext } from '@/context'

export default function Home() {
	const [status, setStatus] = useState(true)
	const theme = useContext(ThemeContext)
	console.log('theme', theme)
	console.log('home render')

	return (
		<div>
			<Button onClick={() => setStatus(s => !s)}>Toggle</Button>
			{status && <List />}
		</div>
	)
}

function List() {
	const [count, setCount] = useState(0)
	const [num, setNum] = useState(0)

	console.log('list render')

	const handleClick = useDebounceFn(() => {
		setCount(c => c + 1)
		console.log('handleClick')
	}, 1000)

	return (
		<div>
			<span>{count}</span>
			<Button type="primary" onClick={handleClick}>
				点击
			</Button>
		</div>
	)
}
