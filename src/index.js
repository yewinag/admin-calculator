import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react'
import ReactDOM from "react-dom";
import Home from './containers/Home'
import './styles/index.scss';

function App() {
    return (
        <>
            <Home />
        </>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'));