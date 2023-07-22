import { Component, createSignal, Show } from "solid-js";
import { Task as Todo } from "../../types";
import { addTask, editTask, todos } from "../../state/todo";

import CSS from "./modal.module.css";
import GLOBALCSS from "../../global.module.css";

interface PropType {
    todo: Todo;

}

const Modal: Component<any> = ({ todo, setModal }) => {
	let title: HTMLInputElement | undefined;
	let status: HTMLInputElement | undefined;

	let [done, setDone] = createSignal<boolean>((status ? status.checked: false));
	let [error, setError] = createSignal<boolean>(false);

	function handleCLose(){
		setModal({ status: false, todo: undefined});
	}

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if ((!title && !status) || !title.value ||title.value.replaceAll(" ", "") == "") {
			setError(true);
			title.focus();
			return;
		}

		editTask(todo.id, title.value, status.checked);
		
		handleCLose();
	}

	function handleChange(){
		setDone(status.checked);
	}

    return (
        <div class={CSS.modalContainer}>
        	<div class={CSS.modal}>
	        	<header class={CSS.header}>
	        		<h2 class={CSS.title}>Edit "{ todo.title }"</h2>
	        		<svg onClick={handleCLose} class={CSS.closer} height="20" width="20">
	        			<path d="M1 1L 19 19M1 19L19 1" stroke-width="2" stroke="black"/>
	        		</svg>
	        	</header>
	        	<form class={CSS.form} onSubmit={handleSubmit}>
	        		<label for='done'>
	        			<span>Status</span>
	        			<div class={GLOBALCSS.checkboxContainer}>
	        				<input type='checkbox' onChange={handleChange} checked={todo.done} class={GLOBALCSS.checkbox} ref={status} id='done' value={todo.done} />
	        			<span>{ done()? "Done" : "Undone" }</span>
	        			</div>
	        		</label>
	        		<label for='title'>
	        			<span>Title</span>
	        			<input type='text' class={error()? CSS.inputError : CSS.input} ref={title} id='title' value={todo.title} />
	        			<Show when={error()}>
	        				<span class={CSS.textError}>Provide task title</span>
	        			</Show>
	        		</label>
	        		<button type='submit' class={GLOBALCSS.primaryBtn}>Save</button>
	        	</form>
	        </div>
        </div>
    );
};

export default Modal;