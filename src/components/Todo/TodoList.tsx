import React, {useMemo} from "react";
import {ITodo} from "../../redux/todos-reducer";

interface todoListProps {
    todos: ITodo[]
    getMyTodos: () => (dispatch: any) => Promise<any>
    deleteTodo: (id: number) => any
    deleteTodoAll: () => any
    deleteCompletedTodo: (idCompleted: number[]) => any
    completedTodo: (id: number, completed: boolean) => any
}

const TodoList: React.FC<todoListProps> = ({todos, getMyTodos, deleteTodo, deleteTodoAll, completedTodo, deleteCompletedTodo}) => {

    useMemo(() => {
        getMyTodos()
    }, [getMyTodos]);

    if (todos.length === 0) {
        return <p className={'center'}>TodoList пуст</p>
    }

    const removeTodo = (e: React.MouseEvent, id: number) => {
        e.preventDefault()
        deleteTodo(id)
    }

    const todoCompletedIds = todos
        .filter(todo => todo.completed)
        .map(todo => todo._id)


    return (
        <>
            <div className={'button'}>
                <button className="waves-effect waves-light btn-small red"
                        disabled={todoCompletedIds.length === 0}
                        onClick={() => {
                            deleteCompletedTodo(todoCompletedIds)
                        }
                        }>
                    <i className="material-icons white-text">delete</i>delete completed
                </button>

                <button className="waves-effect waves-light btn-small red"
                        onClick={() => deleteTodoAll()}
                >
                    <i className="material-icons white-text">delete</i>delete all
                </button>
            </div>

            <ul className={'todoList'}>
                {todos.map(todo => {
                    return <li key={todo._id} className={'todoItem'}>
                        <label>
                            <input type="checkbox"
                               className="filled-in"
                               checked={todo.completed}
                               onChange={() => completedTodo(todo._id, !todo.completed)}
                            />
                            <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
                            <i className="material-icons red-text"
                               onClick={(e) => removeTodo(e, todo._id)}
                            >delete</i>
                        </label>
                    </li>
                })}
            </ul>
        </>
    )
};


export default TodoList;