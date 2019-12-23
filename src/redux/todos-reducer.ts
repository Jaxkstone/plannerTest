import {todoApi} from "../api/api";
import {deleteObjectArray, deleteObjectArrayCompleted, updateObjectArray} from "../utils/oblect-helpers";


const TODO_LIST_API = 'TODO_LIST_API';
const CREATE_NEW_TODO = 'CREATE_NEW_TODO';
const DELETE_TODO = 'DELETE_TODO';
const DELETE_TODO_ALL = 'DELETE_TODO_ALL';
const COMPLETED_TODO = 'COMPLETED_TODO';
const DELETE_COMPLETED_TODO = 'DELETE_COMPLETED_TODO';
const TOGGLE_IS_FETCHING_COMPLETE = 'TOGGLE_IS_FETCHING_COMPLETE';

export interface ITodo {
    _id: number
    text: string
    completed: boolean
}

export interface InitialState {
    todos: ITodo[]
    isFetchingComplete: boolean
}

const initialState:InitialState = {
    todos: [],
    isFetchingComplete: false
};

const todosReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case CREATE_NEW_TODO:
            return {
                ...state,
                todos: [ action.data, ...state.todos ]
            };

        case TODO_LIST_API:
            return {
                ...state,
                todos: action.todos
            }

        case DELETE_TODO:
            return {
                ...state,
                todos: deleteObjectArray({
                    items: state.todos,
                    keyName: '_id',
                    keyValue: action.id
                })
            }

        case DELETE_TODO_ALL:
            return {
                ...state,
                todos: action.todos
            }

        case DELETE_COMPLETED_TODO:
            return {
                ...state,
                todos: deleteObjectArrayCompleted({
                    items: state.todos,
                    keyName: 'completed',
                })
            }

        case COMPLETED_TODO:
            return {
                ...state,
                todos: updateObjectArray({
                    items: state.todos,
                    keyName: '_id',
                    keyValue: action.id,
                    newObjProps: {completed: action.completed}
                }),
            }

        case TOGGLE_IS_FETCHING_COMPLETE:
            return {
                ...state, isFetchingComplete: action.isFetchingComplete
            }

        default:
            return state;
    }
};

const addMyTodo = (data:ITodo) => ({type: CREATE_NEW_TODO, data});
const getTodoListApi = (todos:any) => ({type: TODO_LIST_API, todos})
const deleteTodoAC = (id:number) => ({type: DELETE_TODO, id})
const deleteTodoAllAC = (todos:any[]) => ({type: DELETE_TODO_ALL, todos})
const deleteCompletedTodoAC = () => ({type: DELETE_COMPLETED_TODO})
const completedTodoApi = (id:number, completed:boolean) => ({type: COMPLETED_TODO, id, completed})
const toggleIsFetchingComplete = (isFetchingComplete:boolean) => ({type: TOGGLE_IS_FETCHING_COMPLETE, isFetchingComplete})

export const completedTodo = (id:number, completed:boolean) => async (dispatch:any) => {
    dispatch(toggleIsFetchingComplete(true))
    await todoApi.toggleCompleted(id, completed)
    dispatch(completedTodoApi(id, completed))
    dispatch(toggleIsFetchingComplete(false))
}

export const deleteCompletedTodo = (ids:number[]) => async (dispatch:any) => {
    await todoApi.deleteTodoCompleted(ids)
    dispatch(deleteCompletedTodoAC())
}

export const deleteTodo = (id:number) => async (dispatch:any) => {
    await todoApi.deleteTodoApi(id);
    dispatch(deleteTodoAC(id))
}

export const deleteTodoAll = () => async (dispatch:any) => {
    const {data} = await todoApi.deleteTodoAll();
    dispatch(deleteTodoAllAC(data))
}


export const createTodo = (text:string, completed = false ) => async (dispatch:any) => {
    const {data} = await todoApi.addTodoApi(text, completed)
    dispatch(addMyTodo(data))
}

export const getMyTodos = () => async (dispatch:any) => {
    let {data} = await todoApi.getTodos();
    data.reverse()
    dispatch(getTodoListApi(data))
};

export default todosReducer