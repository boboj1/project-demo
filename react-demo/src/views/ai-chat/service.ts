import { ModelListItem, MessageItemProps } from './types'
import { message } from 'antd'

const API_URL = 'http://localhost:3000/ai'

interface ResponseResult<T> {
	code: number
	data: T
}

export async function getModels() {
	try {
		const response = await fetch(`${API_URL}/models`)
		const data = (await response.json()) as ResponseResult<{
			defaultModel: string
			models: ModelListItem[]
		}>
		return data
	} catch (error) {
		console.error('Error fetching models:', error)
		message.error('获取模型列表失败')
	}
}

export async function sendMessage(model: string, messages: MessageItemProps[]) {
	try {
		const response = await fetch(`${API_URL}/chat`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ model, messages }),
		})
		const data = (await response.json()) as ResponseResult<{
			role: 'assistant'
			content: string
			id: string
		}>
		return data
	} catch (error) {
		console.error('Error sending message:', error)
		message.error('发送消息失败')
	}
}
