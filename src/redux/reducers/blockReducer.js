import {
    clearBlockType, deleteBlockType, setBlockType, setCoordinateType,
    setSelectedBlockType, updateBlockIDType, updateBlockType
} from "../actions/actionTypes";

const updateHelper = (blocks, payload) => {
    const { id, newBlockConfig } = payload
    if (blocks[id] && blocks[id]['config'])
        blocks[id]['config'] = newBlockConfig;
    return blocks
}

const getInitalState = () => {
    if (localStorage.getItem('block')) {
        return JSON.parse(localStorage.getItem('block'))
    } else {
        return {
            blocks: [],
            latestBlock: null,
            selectedBlock: null,
            newCoordinates: { x: 0, y: 0 }
        }
    }
}

const blockReducer = (state = {
    ...getInitalState()
}, action) => {
    switch (action.type) {
        case setBlockType:
            state = {
                ...state,
                blocks: [...state.blocks, {
                    ...action.payload.blockConfig, "config": {
                        ...action.payload.blockConfig['config'],
                        ...state.newCoordinates
                    }
                }],
                latestBlock: state.blocks.length
            }
            break;
        case clearBlockType:
            state = {
                blocks: [],
                latestBlock: null
            }
            break;
        case updateBlockType:
            state = {
                ...state,
                blocks: [...updateHelper(state.blocks, action.payload)],
                latestBlock: null
            }
            break;
        case setCoordinateType:
            state = {
                ...state,
                newCoordinates: action.payload.newCoordinates
            }
            break;
        case updateBlockIDType:
            state = {
                ...state,
                latestBlock: state.selectedBlock
            }
            break;
        case deleteBlockType:
            state = {
                ...state,
                blocks: [...state.blocks.filter((_, id) => id !== state.selectedBlock)],
                selectedBlock: null
            }
            break;
        case setSelectedBlockType:
            state = {
                ...state,
                selectedBlock: action.payload
            }
            break;
        default:
            break;
    }
    return state;
};

export default blockReducer;