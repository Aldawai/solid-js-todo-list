import type { Component } from 'solid-js';
import { createSignal, Show, For } from 'solid-js';
import Task from './components/task/task'; 
import TaskForm from './components/form/form';
import Modal from './components/modal/modal';
import { todos, removeDoneTasks } from './state/todo';

import type { Task as Todo } from './types';

import logo from './logo.svg';
import CSS from './global.module.css';

interface modal {
	status: boolean;
	todo: Todo | undefined;
}

const App: Component = () => {

  const [modal, setModal] = createSignal<modal>({status: false, todo: undefined});

  return (
  	<>
    <main class={CSS.main}>
      <h1 class={CSS.title}>Task list</h1>
      <TaskForm></TaskForm>
      <section class={CSS.tasksList}>
      	<For each={todos}>
	      	{task => {
	      	  return (
	      		<Task todo={task} setModal={setModal}></Task>
	      	  );
	      	}}
	      </For>
      </section>
      <button class={CSS.primaryBtn} onClick={removeDoneTasks}>Remove all done Tasks</button>
    </main>
    <Show when={modal().status}>
    	<Modal todo={modal().todo} setModal={setModal}></Modal>
    </Show>
    </>
  );
};

export default App;
