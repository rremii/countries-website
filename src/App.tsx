import './App.sass';
import Nav from "./components/Nav/Nav";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import {useSelector} from "react-redux";
import * as React from "react";
import Main from './components/Main/Main';
import Info from "./components/Info/Info";
import Header from "./components/Header/Header";
import {RootState} from "./Redux/ReduxStore";
import {FC} from "react";

function  App() {
    let isLight = useSelector((state: RootState) => state.MainReducer.isLight)

    return (
        <div className={isLight ? "App light" : 'App'}>
            <Header/>
            <Routes>

                <Route path='/' element={<>
                    <Nav/>
                    <Main/>
                </>}/>
                <Route path='/info' element={<Info/>}/>
            </Routes>

        </div>
    );
}

export default App;
