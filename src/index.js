import React from 'react'
import ReactDOM from "react-dom";
import Home from './containers/Home'
import "regenerator-runtime/runtime.js"; // import global regenerator runtime for async 

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';

function App() {
    return (
        <>
            <Home />
        </>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'));