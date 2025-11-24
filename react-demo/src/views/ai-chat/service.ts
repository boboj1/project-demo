import { ModelListItem, MessageItemProps } from './types'
import { message } from 'antd'

export const API_URL = 'http://localhost:3000/ai'

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
