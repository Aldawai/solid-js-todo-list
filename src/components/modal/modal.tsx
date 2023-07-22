import { Component } from "solid-js";
import { Task as Todo } from "../../types";
import { addTask, todos } from "../../state/todo";

import CSS from "./modal.module.css";

interface PropType {
    todo: Todo;
}

const Modal: Component<PropType> = () => {
	// let input: HTMLInputElement | undefined;

    return (
        <div class={CSS.modalContainer}>
        	<div class={CSS.modal}>
	        	<header class={CSS.header}>
	        		<h2 class={CSS.title}>Title</h2>
	        		<svg class={CSS.closer} height="20" width="20">
	        			<path d="M1 1L 19 19M1 19L19 1" stroke-width="2" stroke="black"/>
	        		</svg>
	        	</header>
	        	<form></form>
	        </div>
        </div>
    );
};

export default { Modal };