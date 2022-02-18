import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedBlock, updateBlock } from '../../redux/actions/blockAction';
import './index.css'

export const Widget = ({ index, isActive }) => {

	const [config, setConfig] = useState(null)
	const [type, setType] = useState(null)
	const [coordinate, setCoordinate] = useState({ x: 0, y: 0 })
	const [value, setvalue] = useState()

	const blocks = useSelector(state => state.block.blocks);
	const dispatch = useDispatch()

	useEffect(() => {
		// fetching latest data from redux
		if (blocks && blocks[index]) {
			const { type, config } = blocks[index]
			setConfig({ ...config })
			setvalue(config.text || "No Text")
			setCoordinate({ x: config.x, y: config.y })
			setType(type)
		}
	}, [blocks])

	const handleChange = event => {
		let value = event.target.value
		if (value) {
			setvalue(value)
		} else setvalue("")
	}

	/* This function will take care of the coordinate while moving thhe block inside view
		@params: event : Drag event object
	*/
	const handleOnStop = ({ layerX, layerY }) => {
		dispatch(updateBlock({
			id: index, newBlockConfig: {
				...config, x: layerX, y: layerY
			}
		}))
		return true
	};

	const callback = (id) => {
		dispatch(setSelectedBlock(id))
	}

	const getExtraStyle = () => {
		let extraStyle = {};
		const { fontSize, fontWeight } = config
		if (fontSize)
			Object.assign(extraStyle, { fontSize })
		if (fontWeight)
			Object.assign(extraStyle, { fontWeight })
		return extraStyle
	}

	const getView = () => {
		switch (type) {
			case "input":
				return <input value={value} onChange={handleChange} className="widget-input" style={{ ...getExtraStyle() }} />
			case "button":
				return <button className="widget-button" style={{ ...getExtraStyle() }} >{value}</button>
			case "label":
				return <label className="widget-label" style={{ ...getExtraStyle() }} >{value}</label>
			default:
				return <></>
		}
	}

	if (config && type)
		return (
			<Draggable onStop={handleOnStop} position={{ ...coordinate }}>
				<div onClick={() => callback(index)} className={"widget-item " + (isActive ? 'widget-active' : 'widget-inactive')}>
					{getView()}
				</div>
			</Draggable>
		)

	return <></>
}
