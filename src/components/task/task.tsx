import { Component, onMount } from "solid-js";
import { Task as Todo } from "../../types";
import { doneTask, removeTask, editTask, addTask, todos } from "../../state/todo";

import CSS from "./task.module.css";
import CSS from "../form.module.css";

interface PropType {
    todo: Todo;
    modal: any;
}

const Task: Component<PropType> = ({ todo, modal }) => {
	let checkBox: HTMLInputElement | undefined;
	let title: HTMLSpanElement | undefined;
	let row: HTMLDivElement | undefined;

	function handleCheckBoxChange() {
		doneTask(todo.id)
	}

	const handleRemove = () => {
		removeTask(todo.id);
	};

	const Edit = () => {
		modal();
	};

	const handleEdit = () => {
		if(title) {
			title.setAttribute('contenteditable', 'true');
			title.focus();
			const setVal = (value: string)=>{
				editTask(todo.id, value);
			};
			title.addEventListener('keydown', (e: KeyboardEvent) => {
				if( e.key == "Enter" && title) {
					setVal(title.innerText);
					title.setAttribute('contenteditable', 'false');
				}
			});
	
			title.addEventListener('blur', (e: FocusEvent) => {
				if(title){
					setVal(title.innerText);
					title.setAttribute('contenteditable', 'false');
				}
			});
		}
	};

    return (
        <div ref={row} class={CSS.row}>
			<div class={CSS.checkboxContainer}>
				<input type="checkbox" class={CSS.checkbox} id={todo.id} checked={todo.done} ref={checkBox} onChange={handleCheckBoxChange} />
			</div>
        	<span ref={title} class={CSS.span}>{ todo.title }</span>
        	<button onClick={Edit} class={CSS.edit}>Edit</button>
        	<button onClick={handleRemove} class={CSS.remove}>Remove</button>
        </div>
    );
};




const TaskForm: Component<PropType> = () => {
	let input: HTMLInputElement | undefined;

	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();

		if (input == null || input.value.replaceAll(" ", "") == "") {
			input.value = "";
			input.focus();
			return;
		}

		addTask(input.value);

		input.value = "";
		input.focus();
	}

    return (
        <form onSubmit={handleSubmit} class={CSS.form}>
        	<input type="text" class={CSS.input} ref={input} placeholder="What is the task ?"/>
        	<button type="submit" class={CSS.button}>Add Task</button>
        </form>
    );
};

export default { Task, TaskForm };