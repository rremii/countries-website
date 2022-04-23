import ReactDOM from "react-dom";
import reportWebVitals from './reportWebVitals';
import './index.css';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import store from './Redux/ReduxStore'
import App from "./App";
import * as React from "react";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
