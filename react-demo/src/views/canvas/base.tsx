import { useRef, useEffect } from 'react'

export default function CanvasBase() {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	function initCanvas() {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		// Draw something on the canvas
		ctx.fillStyle = 'blue'
		ctx.fillRect(0, 0, canvas.width, canvas.height)
	}

	useEffect(() => {
		initCanvas()
	}, [])

	return (
		<div>
			<canvas ref={canvasRef} id="base-canvas"></canvas>
		</div>
	)
}
