import React, {useEffect} from 'react';
import './App.scss';
import {BrowserRouter, Route, Redirect, withRouter} from "react-router-dom";
import {connect, Provider} from "react-redux";
import store from "./redux/store";
import Navbar from "./components/Navbar/Navbar";
import Preloader from "./components/Preloader/Preloader";
import { compose } from 'redux';
import {initializeApp} from "./redux/app-reducer";
import CalendarContainer from "./components/Calendar/Calendar";
import TodoContainer from "./components/Todo/Todo";

interface IInitialize {
    initialized: boolean
    initializeApp(): void
}

const App: React.FC<IInitialize> = ( {initialized, initializeApp} ) => {

    useEffect(() => {
        initializeApp()
    }, [initialized, initializeApp]);

    if(!initialized){
        return <Preloader/>
    }

    return (
        <div className="app-wrapper">
            <Navbar/>
            <Route path={'/'} render={ () => <Redirect to={'/todo'}/> }/>
            <Route path={'/todo'} render={ () => <TodoContainer/> } />
            <Route path={'/calendar'} render={ () => <CalendarContainer/> } />
        </div>
    );
}

const mapStateToProps = (state:any) => ({
    initialized: state.app.initializedApp
});

const AppContainer: React.FC = compose<any>(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App);


const MainApp: React.FC = () => {

    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    );
}


export default MainApp
