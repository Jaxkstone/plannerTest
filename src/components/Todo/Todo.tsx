import React from "react";
import {TodoInput} from "./TodoInput";
import TodoList from "./TodoList";
import { compose } from "redux";
import {connect} from "react-redux";
import {
    completedTodo,
    createTodo,
    deleteCompletedTodo,
    deleteTodo,
    deleteTodoAll,
    getMyTodos,
    ITodo
} from "../../redux/todos-reducer";

interface ITodoList {
    todos: ITodo[],
    getMyTodos(): any
    createTodo(): any
    deleteTodo(): any
    deleteTodoAll(): any
    completedTodo(): any
    deleteCompletedTodo(): any
}

const Todo: React.FC<ITodoList> = ({ todos, getMyTodos, createTodo, deleteTodo,
                                     deleteTodoAll, completedTodo, deleteCompletedTodo }) => {

    return (
        <>
            <TodoInput createTodo={createTodo}/>
            <TodoList todos={todos}
                      getMyTodos={getMyTodos}
                      deleteTodo={deleteTodo}
                      deleteTodoAll={deleteTodoAll}
                      completedTodo={completedTodo}
                      deleteCompletedTodo={deleteCompletedTodo}
            />
        </>
    )
}

const mapStateToProps = (state:any) => {
    return {
        todos: state.todos.todos,
    }
}

let TodoContainer: React.FC = compose<any>(
    connect(mapStateToProps,
        {getMyTodos, createTodo, deleteTodo, deleteTodoAll, completedTodo, deleteCompletedTodo})
)(Todo)

export default TodoContainer

