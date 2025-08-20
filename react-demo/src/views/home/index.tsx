import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'

export default function Home() {
	const [count, setCount] = useState(0)
	const listRef = useRef(null)

	return (
		<div>
			<h1>Home</h1>

			<List ref={listRef} />
		</div>
	)
}

const List = forwardRef((props, ref) => {
	useImperativeHandle(ref, () => ({
		scrollToTop: () => {
			console.log('scrollToTop called')
		},
	}))

	return (
		<ul>
			<li>Item 1</li>
			<li>Item 2</li>
			<li>Item 3</li>
		</ul>
	)
})
