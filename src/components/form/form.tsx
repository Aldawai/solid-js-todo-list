import { Component } from "solid-js";
import { Todo } from "../../types";
import { addTask, todos } from "../../state/todo";

import CSS from "./form.module.css";

interface PropType {
    todo: Todo;
}

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

export default { TaskForm };