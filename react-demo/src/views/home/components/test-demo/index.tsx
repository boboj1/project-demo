import { useState } from 'react'
import { useImmer } from 'use-immer'

export default function TestDemo() {
	const [userInfo, setUserInfo] = useImmer({
		name: 'aaa',
		info: {
			age: 18,
		},
	})
	const [books, setBooks] = useImmer([
		{
			id: 1,
			name: 'book1',
		},
		{
			id: 2,
			name: 'book2',
		},
	])

	const changeUserAge = () => {
		// 生成一个新的对象，避免直接修改 state 中的对象
		setUserInfo(draft => {
			draft.info.age += 1
		})
	}

	const addBook = () => {
		// 不能直接push，要生成一个新的数组
		setBooks(draft => {
			draft.push({
				id: books.length + 1,
				name: 'book' + (books.length + 1),
			})
		})
	}

	return (
		<div>
			<div>当前用户年龄：{userInfo.info.age}</div>
			<button onClick={changeUserAge}>改变年龄</button>

			<div>
				{books.map(item => (
					<div key={item.id}>{item.name}</div>
				))}
			</div>
			<button onClick={addBook}>添加一本书</button>
		</div>
	)
}
