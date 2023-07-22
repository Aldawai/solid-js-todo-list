import { Component, onMount } from "solid-js";
import { Task as Todo } from "../../types";
import { doneTask, removeTask, editTask, addTask, todos } from "../../state/todo";

import CSS from "./task.module.css";

interface PropType {
    todo: Todo;
    modal: any;
}

const Task: Component<PropType> = ({ todo, setModal }) => {
	function handleCheckBoxChange() {
		doneTask(todo.id)
	}

	const handleRemove = () => {
		removeTask(todo.id);
	};

	const Edit = () => {
		setModal({status: true, todo: todo});
	};

    return (
        <div class={CSS.row}>
			<div class={CSS.checkboxContainer}>
				<input
					type="checkbox"
					class={CSS.checkbox}
					id={todo.id}
					checked={todo.done}
					onChange={handleCheckBoxChange}
				/>
			</div>
        	<span title={todo.title} class={CSS.span}>{ todo.title }</span>
        	<button onClick={Edit} class={CSS.edit}>Edit</button>
        	<button onClick={handleRemove} title='remove' class={CSS.remove}>
        		<svg class={CSS.closer} height="20" width="20">
	        		<path d="M1 1L 19 19M1 19L19 1" stroke-width="2" stroke="black"/>
	        	</svg>
        	</button>
        </div>
    );
};

export default Task;