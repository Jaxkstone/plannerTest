import React, {useState} from "react";

interface todoInputProps {
    createTodo(todo: string): void
}

export const TodoInput: React.FC<todoInputProps> = ({createTodo}) => {

    const [todo, setTodo] = useState('');

    const todoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo(e.currentTarget.value)
    };

    const addValueTodo = () => {
        createTodo(todo);
        setTodo('')
    };

    const kyeDownCreateTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && todo.length > 0){
            createTodo(todo);
            setTodo('')
        }
    }

    return (
            <div className="input-field todo-label">
                <input value={todo} id="todo" type="text" className="validate" onKeyDown={(e) => kyeDownCreateTodo(e)} onChange={todoChange}/>
                <label htmlFor="todo">Todo</label>
                <button className="waves-effect waves-light btn-small" disabled={todo.length === 0} onClick={addValueTodo}>
                    <i className="material-icons right">add_circle_outline</i>add
                </button>
            </div>
    )
};