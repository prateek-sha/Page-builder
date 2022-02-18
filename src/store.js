import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { saveState } from "./redux/persist";
import throttle from 'lodash.throttle';

import block from './redux/reducers/blockReducer'

const store = createStore(combineReducers({ block }),
    composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(throttle(() => {
    saveState("block", store.getState().block);
}, 1000));

export default store