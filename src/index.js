import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Provider } from 'react-redux'
import { store } from './Redux/store'
import CreateList from './js/createList'
import RenderCard from './js/renderList'

ReactDOM.render(
    
    <Provider store={store}>
        <div className="bodyContainer">
            <RenderCard/>
        </div>
        <div id="modal"></div>
    </Provider>, 
document.getElementById('root'));
