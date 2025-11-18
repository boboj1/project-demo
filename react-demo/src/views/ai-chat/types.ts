export interface ModelListItem {
	name: string
	model: string
}

export interface MessageItemProps {
	role: 'user' | 'assistant'
	content: string
	id: string
}
