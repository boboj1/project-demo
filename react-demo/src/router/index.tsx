import { createBrowserRouter } from 'react-router'
import { lazy } from 'react'
import BaseLayout from '@/layout/base'
import Home from '@/views/home'

const router = createBrowserRouter([
	{
		path: '/',
		Component: BaseLayout,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'todo-list',
				Component: lazy(() => import('@/views/comp/todo-list')),
			},
			{
				path: 'canvas-base',
				Component: lazy(() => import('@/views/canvas/base')),
			},
			{
				path: 'about',
				Component: lazy(() => import('@/views/about')),
			},
		],
	},
])

export default router
