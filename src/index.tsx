import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import MainApp from "./App";

ReactDOM.render(<MainApp />, document.getElementById('root'));


serviceWorker.unregister();
