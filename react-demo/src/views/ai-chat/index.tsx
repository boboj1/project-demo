import { Input, Form, Select, message } from 'antd'
import { useState, useRef, useEffect } from 'react'
import SubmitButton from '@/components/SubmitButton'
import { getModels, sendMessage } from './service'
import { ModelListItem, MessageItemProps } from './types'

function MessageItem({ role, content }: MessageItemProps) {
	return (
		<div className="my-[8px] flex">
			{role === 'assistant' ? (
				<>
					<div className="w-[40px] h-[40px] rounded-full bg-[#f0f0f0] text-center leading-[40px] text-[16px]">
						R
					</div>
					<pre className="max-w-[50%] ml-[8px] bg-[#f0f0f0] p-[8px] rounded-[8px] break-words whitespace-pre-wrap break-all">
						{content}
					</pre>
				</>
			) : (
				<>
					<pre className="max-w-[50%] ml-[8px] bg-[#007bff] text-white p-[8px] rounded-[8px] ml-auto mr-[8px] break-words whitespace-pre-wrap break-all">
						{content}
					</pre>
					<div className="w-[40px] h-[40px] rounded-full bg-[#007bff] text-center leading-[40px] text-[16px] text-white">
						U
					</div>
				</>
			)}
		</div>
	)
}

function LoadingItem() {
	return (
		<div className="my-[8px] flex">
			<div className="w-[40px] h-[40px] rounded-full bg-[#f0f0f0] text-center leading-[40px] text-[16px]">
				R
			</div>
			<div className="max-w-[50%] ml-[8px] bg-[#f0f0f0] p-[8px] rounded-[8px]">
				<div className="w-[20px] h-[20px] rounded-full bg-[#007bff] animate-bounce"></div>
			</div>
		</div>
	)
}

export default function AiChat() {
	const messageListRef = useRef<HTMLDivElement>(null)
	const [form] = Form.useForm<{ inputValue: string }>()
	const [loading, setLoading] = useState<boolean>(false)
	const [messageList, setMessageList] = useState<MessageItemProps[]>([])
	const [model, setModel] = useState<string>('')
	const [modelList, setModelList] = useState<ModelListItem[]>([])

	const onFinishHandler = async () => {
		const inputValue = form.getFieldValue('inputValue')
		setLoading(true)
		// 发送消息给模型
		const sendMessageItem: MessageItemProps = {
			role: 'user',
			content: inputValue,
			id: Date.now().toString(),
		}
		setMessageList([...messageList, sendMessageItem])
		form.setFieldValue('inputValue', '')

		const res = await sendMessage(model, [...messageList, sendMessageItem])
		if (res?.code === 0) {
			setMessageList(prev => [...prev, res.data])
		} else {
			message.error('发送消息失败')
		}
		setLoading(false)
	}

	const getModelsHandler = async () => {
		const res = await getModels()
		if (res?.code === 0) {
			const { defaultModel, models } = res.data
			setModel(defaultModel)
			setModelList(models)
		} else {
			message.error('获取模型列表失败')
		}
	}

	useEffect(() => {
		// 滚动到最后一条消息
		if (messageListRef.current && messageListRef.current.children.length > 0) {
			messageListRef.current.children[
				messageListRef.current.children.length - 1
			].scrollIntoView()
		}
	})

	useEffect(() => {
		// 获取模型列表
		getModelsHandler()
	}, [])

	return (
		<div className="w-full h-full">
			<h1 className="text-center font-600 text-3xl">
				本地模型测试
				{model && (
					<Select
						className="w-[140px]"
						style={{ marginLeft: '16px' }}
						fieldNames={{ label: 'name', value: 'model' }}
						options={modelList}
						placeholder="请选择模型"
						defaultValue={model}
						onChange={setModel}
					/>
				)}
			</h1>
			<div style={{ height: 'calc(100% - 36px)' }}>
				<div
					style={{
						height: 'calc(100% - 32px)',
					}}
					className="overflow-auto"
					ref={messageListRef}
				>
					{messageList.map(item => (
						<MessageItem key={item.id} {...item} />
					))}
					{loading && <LoadingItem />}
				</div>
				<div className="flex">
					<Form
						form={form}
						onFinish={onFinishHandler}
						autoComplete="off"
						className="flex w-full"
					>
						<Form.Item
							name="inputValue"
							rules={[{ required: true }]}
							noStyle
							validateStatus="success"
						>
							<Input className="flex-1" placeholder="请输入" />
						</Form.Item>
						<Form.Item noStyle>
							<SubmitButton className="ml-[8px]" form={form}>
								发送
							</SubmitButton>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	)
}
