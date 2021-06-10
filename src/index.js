import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react'
import ReactDOM from "react-dom";
import Home from './containers/Home'

function App() {
    return (
        <div>
            <Home />
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'));