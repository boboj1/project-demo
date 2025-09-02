import style from './index.module.scss'

export default function AnimateScroll() {
	return (
		<div className={style['scroll-container']}>
			<div className="scroll-item-wrapper">
				<div className="scroll-card" style={{ backgroundColor: 'red' }}></div>
				<div className="scroll-card"></div>
			</div>
			<div className="scroll-item-wrapper">
				<div className="scroll-card"></div>
				<div className="scroll-card"></div>
			</div>
			<div className="scroll-item-wrapper">
				<div className="scroll-card"></div>
				<div className="scroll-card"></div>
			</div>
			<div className="scroll-item-wrapper">
				<div className="scroll-card"></div>
				<div className="scroll-card"></div>
			</div>
		</div>
	)
}
