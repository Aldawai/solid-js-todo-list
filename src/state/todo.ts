import { createStore } from "solid-js/store";
import { Task as Todo } from "../types";
import { createEffect } from "solid-js";

const localDatas:string = localStorage.getItem('todo') || '[]';

const [todos, setTodos] = createStore<Todo[]>(
    JSON.parse(localDatas)
);

createEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todos));
})

function addTask(title: string) {
    setTodos(
        [
            ...todos,
            {
                id: Math.random().toString(),
                title,
                done: false,
                children: []
            }
        ]
    );
}

function doneTask(id: string) {
    setTodos(
        todos.map((task) => {
            if (task.id == id) {
                return {
                    ...task,
                    done: !task.done,
                };
            }
            return task;
        })
    );
}


function removeDoneTasks() {
    setTodos(todos.filter(task => !task.done));
}

function removeTask(id: string) {
    setTodos(todos.filter(task => task.id != id));
}

function editTask(id: string, title: string, done?: boolean) {
    setTodos(
        todos.map(task => {
            if(task.id == id) {
                let newDatas = {
                    id: task.id,
                    title,
                    done: (done != undefined|| done != null)? done : task.done,
                    children: task.children
                };
                return newDatas;
            }else{
                return task;
            }
        })
    );
}

export {
    todos,
    addTask,
    doneTask,
    removeDoneTasks,
    removeTask,
    editTask
};