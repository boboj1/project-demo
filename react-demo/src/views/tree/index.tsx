import { useState } from 'react'
import { initialTravelPlan } from './tree-data'

interface Place {
	id: number
	title: string
	childIds: number[]
}

type PlacesById = {
	[id: number]: Place
}

export default function TravelPlan() {
	const [plan, setPlan] = useState<PlacesById>(initialTravelPlan)

	function handleComplete(parentId: number, childId: number): void {
		const parent: Place = plan[parentId]
		// 创建一个其父级地点的新版本
		// 但不包括子级 ID。
		const nextParent: Place = {
			...parent,
			childIds: parent.childIds.filter((id: number) => id !== childId),
		}
		// 更新根 state 对象...
		setPlan({
			...plan,
			// ...以便它拥有更新的父级。
			[parentId]: nextParent,
		})
	}

	const root = plan[0]
	const planetIds = root.childIds
	return (
		<>
			<h2>Places to visit</h2>
			<ol>
				{planetIds.map(id => (
					<PlaceTree key={id} id={id} parentId={0} placesById={plan} onComplete={handleComplete} />
				))}
			</ol>
		</>
	)
}

interface PlaceTreeProps {
	id: number
	parentId: number
	placesById: PlacesById
	onComplete: (parentId: number, childId: number) => void
}

function PlaceTree({ id, parentId, placesById, onComplete }: PlaceTreeProps) {
	const place = placesById[id]
	const childIds = place.childIds
	return (
		<li>
			{place.title}
			<button
				onClick={() => {
					onComplete(parentId, id)
				}}
			>
				Complete
			</button>
			{childIds.length > 0 && (
				<ol>
					{childIds.map(childId => (
						<PlaceTree key={childId} id={childId} parentId={id} placesById={placesById} onComplete={onComplete} />
					))}
				</ol>
			)}
		</li>
	)
}
