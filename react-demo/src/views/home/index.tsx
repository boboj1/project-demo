import React, { useState, useCallback, useEffect, useRef, useContext } from 'react'
import { ThemeContext } from '@/context'
import style from './index.module.scss'
import AnimateScroll from './components/animate-scroll'
import AnimateText from './components/animate-text'

export default function Home() {
	return (
		<div className={style['home-container']}>
			<AnimateText />
			<AnimateScroll />
		</div>
	)
}
