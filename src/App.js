import React from 'react';
import { Provider } from "react-redux";
import store from "./store";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { HomePage } from './pages/home';

import 'antd/dist/antd.css';
import './assets/css/style.css'

const App = () => {

	return (
		<div className="App">
			<Provider store={store}>
				<DndProvider backend={HTML5Backend}>
					{/* entery point of the app */}
					<HomePage />
				</DndProvider>
			</Provider>
		</div>
	);
}

export default App;
