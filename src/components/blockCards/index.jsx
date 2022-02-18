import React from 'react'
import { useDrag } from 'react-dnd'
import icon from '../../assets/svg/blockCardIcon.svg'
import { dragType } from '../../elements/lib/constants'
import './index.css'

export const BlockCards = ({ types = [] }) => {

	/* A components to render block card with drag feature
		@prop: type : type of the block (string)
		@prop: displayName : displayName of the block (string)
	*/
	const RenderCard = ({ type, displayName }) => {
		const [{ isDragging }, drag] = useDrag(() => ({
			type: dragType,
			item: { type },
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
				handlerId: monitor.getHandlerId()
			})
		}));

		const opacity = isDragging ? 0.4 : 1;

		return <div ref={drag} className="card" style={{ opacity }} >
			<img src={icon} alt={"icon"} />
			<div className="type">{displayName}</div>
		</div>
	}

	return (
		<div className="block-cards-wrapper" >
			{types.map(({ type, displayName }, index) => <RenderCard type={type} displayName={displayName} key={index} />)}
		</div>
	)
}
