import React, { useState, useMemo, useEffect } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'
import type { MenuProps } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router'
import { useAppLoading } from '@/hooks'
import Loading from '@/components/loading'

type MenuItem = Required<MenuProps>['items'][number]

const { Header, Sider, Content } = Layout

const BaseLayout: React.FC = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const [loading, setAppLoading] = useAppLoading()

	const [collapsed, setCollapsed] = useState(false)
	const [navList, setNavList] = useState<MenuItem[]>([
		{
			key: '/',
			label: '主页',
		},
		{
			key: 'components',
			label: '组件',
			children: [
				{
					key: '/todo-list',
					label: '待办事项',
				},
				{
					key: '/upload',
					label: '上传组件',
				},
			],
		},
		{
			key: 'canvas',
			label: 'canvas',
			children: [
				{
					key: '/canvas-base',
					label: '基础画布',
				},
			],
		},
		{
			key: '/about',
			label: '关于',
		},
	])

	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken()

	const menuItemClick: MenuProps['onClick'] = info => {
		const { key } = info
		navigate(key)
	}

	const getDefaultOpenKeys = () => {
		const find = (list: any[], parentKey?: string): string[] => {
			if (!list || !list.length) return []

			const keys: string[] = []

			for (let i = 0; i < list.length; i++) {
				const item = list[i]
				if (item.key === location.pathname) {
					if (parentKey) {
						keys.push(parentKey)
					}
					return keys
				}

				if (item.children && item.children.length) {
					const childKeys = find(item.children, item.key)

					if (childKeys.length) {
						if (parentKey) {
							keys.push(parentKey)
						}
						keys.push(...childKeys)
						return keys
					}
				}
			}

			return keys
		}

		return find(navList)
	}

	const defaultOpenKeys = useMemo(() => {
		return getDefaultOpenKeys()
	}, [location.pathname, navList])

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setAppLoading(!loading)
	// 	}, 1000)
	// }, [])

	return (
		<>
			{/* <Loading /> */}
			<Layout
				style={{
					height: '100%',
				}}
			>
				<Sider trigger={null} collapsible collapsed={collapsed}>
					<div className="demo-logo-vertical" />
					<Menu
						theme="dark"
						mode="inline"
						defaultSelectedKeys={[location.pathname]}
						defaultOpenKeys={defaultOpenKeys}
						items={navList}
						onClick={menuItemClick}
					/>
				</Sider>
				<Layout>
					<Header style={{ padding: 0, background: colorBgContainer }}>
						<Button
							type="text"
							icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
							onClick={() => setCollapsed(!collapsed)}
							style={{
								fontSize: '16px',
								width: 64,
								height: 64,
							}}
						/>
					</Header>
					<Content
						style={{
							margin: '24px 16px',
							padding: 24,
							minHeight: 280,
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}
					>
						<Outlet />
					</Content>
				</Layout>
			</Layout>
		</>
	)
}

export default BaseLayout
