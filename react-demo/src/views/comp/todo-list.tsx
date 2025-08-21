import { Input, List, Checkbox, Button, Space } from 'antd'
import { useState, useRef } from 'react'
import { useImmer } from 'use-immer'
import { nanoid } from 'nanoid'
import { debounce } from 'lodash-es'
import { DeleteFilled, EditFilled } from '@ant-design/icons'

interface TodoAddProps {
	addHandler: (keyword: string) => void
}

interface TodoItem {
	id: string
	content: string
	status: 'active' | 'completed'
}

interface TodoPanelProps {
	todoList: TodoItem[]
	selectItems: string[]
	selectItemsHandler: (id: string) => void
}

function TodoAdd({ addHandler }: TodoAddProps) {
	const [keyword, setKeyword] = useState('')

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setKeyword(value)
	}

	const enterHandler = () => {
		if (!keyword.trim()) return
		addHandler(keyword)
		setKeyword('')
	}

	const clearHandler = () => {
		setKeyword('')
	}

	return (
		<Input
			value={keyword}
			placeholder="请输入代办事项"
			allowClear
			onClear={clearHandler}
			onChange={changeHandler}
			onPressEnter={enterHandler}
		/>
	)
}

function TodoPanel({ todoList, selectItems, selectItemsHandler }: TodoPanelProps) {
	return (
		<List
			style={{
				marginTop: '12px',
			}}
			bordered
			dataSource={todoList}
			rowKey="id"
			renderItem={item => (
				<List.Item style={{ width: '100%' }}>
					<div
						style={{
							width: '100%',
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<Checkbox
							checked={selectItems.includes(item.id)}
							style={{
								marginRight: '8px',
							}}
							onChange={() => selectItemsHandler(item.id)}
						/>
						<span>{item.content}</span>
						<Space
							style={{
								marginLeft: 'auto',
							}}
						>
							<Button type="primary" icon={<EditFilled />} />
							<Button danger icon={<DeleteFilled />} />
						</Space>
					</div>
				</List.Item>
			)}
		/>
	)
}

export default function TodoList() {
	const [todoList, setTodoList] = useImmer<TodoItem[]>([])
	const [selectItems, setSelectItems] = useImmer<string[]>([])

	const addHandler = (keyword: string) => {
		if (!keyword.trim()) return
		setTodoList(draft => {
			draft.push({
				id: nanoid(8),
				content: keyword,
				status: 'active',
			})
		})
	}

	const selectItemsHandler = (id: string) => {
		setSelectItems(draft => {
			if (draft.includes(id)) {
				draft.splice(draft.indexOf(id), 1)
			} else {
				draft.push(id)
			}
		})
	}

	return (
		<div>
			<h1 style={{ marginBottom: '16px' }}>代办事项列表</h1>
			<TodoAdd addHandler={addHandler} />
			<TodoPanel todoList={todoList} selectItems={selectItems} selectItemsHandler={selectItemsHandler} />
		</div>
	)
}
