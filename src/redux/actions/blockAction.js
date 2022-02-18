import {
    clearBlockType, setBlockType, updateBlockType, setCoordinateType,
    updateBlockIDType, deleteBlockType, setSelectedBlockType
} from "./actionTypes";

export function setBlock(payload) {
    return (dispatch) => {
        dispatch({
            type: setBlockType,
            payload: payload
        });

    }
}

export function clearBlock(payload) {
    return (dispatch) => {
        dispatch({
            type: clearBlockType,
            payload: payload
        });

    }
}

export function updateBlock(payload) {
    return (dispatch) => {
        dispatch({
            type: updateBlockType,
            payload: payload
        });

    }
}

export function setNewCoordinate(payload) {
    return (dispatch) => {
        dispatch({
            type: setCoordinateType,
            payload: payload
        });

    }
}

export function updateLatestBlockId(payload) {
    return (dispatch) => {
        dispatch({
            type: updateBlockIDType,
            payload: payload
        });

    }
}

export function deleteBlock(payload) {

    return (dispatch, getState) => {
        const { block } = getState()
        // if user press delete or backspace and if modal is open so we will prevent that.
        if (block['latestBlock'] !== null)
            return
        dispatch({
            type: deleteBlockType,
            payload: payload
        });

    }
}

export function setSelectedBlock(payload) {
    return (dispatch) => {
        dispatch({
            type: setSelectedBlockType,
            payload: payload
        });

    }
}