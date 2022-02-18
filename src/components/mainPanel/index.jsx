import React, { useEffect, useState } from 'react'
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { dragType } from '../../elements/lib/constants';
import { deleteBlock, setBlock, setNewCoordinate, setSelectedBlock, updateLatestBlockId } from '../../redux/actions/blockAction';
import { ItemModal } from '../modal';
import { Widget } from '../widgets';
import './index.css'

export const MainPanel = () => {

	const [blockData, setBlockData] = useState(null)

	const latestBlock = useSelector(state => state.block.latestBlock);
	const selectedBlock = useSelector(state => state.block.selectedBlock);
	const blocks = useSelector(state => state.block.blocks);

	const dispatch = useDispatch()

	const addEvents = () => {
		/* added eventlistesner to window
			@Enter: when user press enter it will open edit modal
			@Delete || Backspace: when user press Backspace or delete selcted block will get deleted.
		*/
		window.addEventListener('keydown', function (e) {
			switch (e.key) {
				case "Enter":
					dispatch(updateLatestBlockId())
					break;
				case "Backspace":
				case "Delete":
					dispatch(deleteBlock())
					setSelectedBlock(null)
					break;
				default:
					break;
			}
		})
	}

	useEffect(() => {
		addEvents()
	}, [])

	useEffect(() => {
		// fetching latest block data from redux
		if (blocks && blocks.length)
			setBlockData([...blocks])
		else
			setBlockData(null)
	}, [blocks, latestBlock])

	/* updating redux with new widget coordinate
		@params: itemOffset : object conating x and y property
	*/
	const setCorrectOffset = itemOffset => {
		let newCoordinates = { x: itemOffset.x, y: (itemOffset.y-40) }
		dispatch(setNewCoordinate({ newCoordinates }))
	}

	/* when new block get droped we will add that widget to redux
		@params: item : object containg props of draged block.
	*/
	const handleOnDrop = item => {
		const { type } = item;
		let blockConfig = {
			type,
			config: { x: 0, y: 0 }
		}
		dispatch(setBlock({ blockConfig }))
	}

	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		accept: dragType,
		drop: (item) => handleOnDrop(item),
		hover: (_, monitor) => {
			let offset = { ...monitor.getClientOffset() };
			if (offset && offset.x && offset.y) {
				setCorrectOffset(offset)
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop()
		})
	}));


	const isActive = canDrop && isOver;

	let className = ""
	if (isActive) {
		className = "isActive";
	} else if (canDrop) {
		className = "canDrop";
	} else {
		className = ""
	}


	return (
		<div ref={drop} id={"main-panel-wrapper"} className={`main-panel-wrapper ${className}`}>
			<div className="help-text">
				{isActive ? "Release to drop" : "Drag a block here"}
			</div>
			<ItemModal blockKey={latestBlock} />
			{blockData && blockData.map((_, index) => <Widget isActive={selectedBlock === index} key={index} index={index} />)}
		</div>
	)
}
