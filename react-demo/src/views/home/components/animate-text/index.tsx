import style from './index.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { TextPlugin } from 'gsap/TextPlugin'
// gsap.registerPlugin(TextPlugin)

export default function AnimateText() {
	const container = useRef<HTMLDivElement>(null)

	const textList = [
		{ value: 1000, text: 'lorem1' },
		{ value: 2000, text: 'lorem2' },
		{ value: 3000, text: 'lorem3' },
	]

	useGSAP(
		() => {
			const tl = gsap.timeline()
			const numList = container.current?.querySelectorAll('.text-item-value')

			numList?.forEach(text => {
				tl.from(
					text,
					{
						innerText: 0,
						snap: {
							innerText: 1,
						},
						ease: 'power4.out',
						duration: 1.5,
					},
					0
				)
			})
		},
		{
			scope: container,
		}
	)

	return (
		<div className={style['animate-text']} ref={container}>
			{textList.map(item => (
				<div key={item.value} className="text-item">
					<div className="text-item-value">{item.value}</div>
					<div className="text-item-text">{item.text}</div>
				</div>
			))}
		</div>
	)
}
