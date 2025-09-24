interface UploadRequestConfig {
	onprogress: (percent: number) => void
}

export function uploadRequest(
	url: string,
	data: FormData,
	config: UploadRequestConfig
) {
	const { onprogress } = config || {}
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest()

		xhr.upload.onprogress = e => {
			const percent = Math.floor((e.loaded / e.total) * 100)
			onprogress && onprogress(percent)
		}

		xhr.addEventListener('readystatechange', e => {
			if (xhr.readyState === 4) {
				console.log(xhr.response)
			}
		})

		xhr.open('post', url)

		xhr.send(data)
	})
}
