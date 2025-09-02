import style from './index.module.scss'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { SplitText } from 'gsap/SplitText'
import { useAppSelector } from '@/hooks'

export default function Loading() {
	const loadingRef = useRef<HTMLDivElement>(null)
	const loading = useAppSelector(state => state.loading.loading)

	useGSAP(
		() => {
			const tl = gsap.timeline()
			const loadingText = loadingRef.current?.querySelector('.loading-text')
			const texts = new SplitText(loadingText!, { type: 'chars' })
			if (loading) {
				// 定义loading开始的动画
				tl.from(loadingRef.current, {
					yPercent: -100,
				}).from(
					texts.chars,
					{
						y: '-100px',
						opacity: 0,
						stagger: 0.1,
					},
					'-=0.5'
				)
			} else {
				// 定义loading结束的动画
				tl.to(texts.chars, {
					y: '-100px',
					opacity: 0,
					stagger: 0.1,
				}).to(
					loadingRef.current,
					{
						yPercent: -100,
					},
					'-=0.5'
				)
			}
		},
		{ scope: loadingRef, dependencies: [loading] }
	)
	return (
		<div className={style.loading} ref={loadingRef}>
			<div className="loading-text">Loading...</div>
		</div>
	)
}
