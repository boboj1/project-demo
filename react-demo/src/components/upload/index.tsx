import style from './index.module.scss'
import { useCallback, useRef } from 'react'
import { useImmer } from 'use-immer'
import { DeleteOutlined } from '@ant-design/icons'

interface UploadProps {
	accept?: string
	multiple?: boolean
	name?: string
}

export default function Upload({
	accept = '*',
	multiple = false,
	name,
}: UploadProps) {
	const inputRef = useRef<HTMLInputElement | null>(null)
	const [fileList, setFileList] = useImmer<File[]>([])

	const handleFileChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const files = e.target.files
			if (files) {
				const newFiles = Array.from(files)
				newFiles.forEach(newFile => {
					if (!fileList.find(file => file.name === newFile.name)) {
						setFileList(state => {
							state.push(newFile)
						})
					}
				})

				console.log(files)
			}
		},
		[]
	)

	const handleClick = () => {
		inputRef.current?.click()
	}

	const uploadRequest = () => {}

	return (
		<div className={style['upload']}>
			<div className="upload-container" onClick={handleClick}>
				<input
					style={{ display: 'none' }}
					ref={inputRef}
					type="file"
					name={name}
					accept={accept}
					multiple={multiple}
					onChange={handleFileChange}
				/>
			</div>
			<div className="file-list">
				{fileList.map(file => (
					<div key={file.name} className="file-item">
						<span className="file-name">{file.name}</span>
						<DeleteOutlined className="delete-icon" />
					</div>
				))}
			</div>
		</div>
	)
}
