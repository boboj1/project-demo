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
				path: 'upload',
				Component: lazy(() => import('@/views/comp/upload')),
			},
			{
				path: 'canvas-base',
				Component: lazy(() => import('@/views/canvas/base')),
			},
			{
				path: 'ai-chat',
				Component: lazy(() => import('@/views/ai-chat')),
			},
		],
	},
])

export default router
