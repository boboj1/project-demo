import { Button, Form, type FormInstance } from 'antd'
import { useState, useEffect, memo } from 'react'

interface SubmitButtonProps {
	form: FormInstance
	className?: string
	disabled?: boolean
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
	form,
	children,
	className,
	disabled,
}) => {
	const [submittable, setSubmittable] = useState<boolean>(false)
	const values = Form.useWatch([], form)

	useEffect(() => {
		form
			.validateFields({ validateOnly: true })
			.then(() => setSubmittable(true))
			.catch(() => setSubmittable(false))
	}, [form, values])

	return (
		<Button
			className={className}
			type="primary"
			htmlType="submit"
			disabled={disabled || !submittable}
		>
			{children}
		</Button>
	)
}

export default memo(SubmitButton)
