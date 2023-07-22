import type { Component } from 'solid-js';
import { createSignal, Show, For } from 'solid-js';
import { Task } from './components/task/task'; 
import TaskForm from './components/form/form';
import { Modal } from './components/modal/modal';
import { todos, removeDoneTasks } from './state/todo';

import logo from './logo.svg';
import CSS from './global.module.css';

const App: Component = () => {

	const [modal, setModal] = createSignal(false);

  function modalFunc() {
    setModal(true);
  }

  return (
  	<>
    <main class={CSS.main}>
    <h1 class={CSS.title}>Task list</h1>
      <TaskForm></TaskForm>
      <section class={CSS.tasksList}>
      	<For each={todos}>
	      	{task => {
	      	  return (
	      		<Task todo={task} modal={modalFunc}></Task>
	      	  );
	      	}}
	      </For>
      </section>
      <button class={CSS.primaryBtn} onClick={removeDoneTasks}>Remove all done Tasks</button>
    </main>
    <Show when={modal()}>
    	<Modal></Modal>
    </Show>
    </>
  );
};

export default App;
