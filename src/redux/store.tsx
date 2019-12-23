import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import appReducer from "./app-reducer";
import calendarReducer from "./calendar-reducer";
import todosReducer from "./todos-reducer";

const reducers = combineReducers({
    app: appReducer,
    calendar: calendarReducer,
    todos: todosReducer
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));


export default store;