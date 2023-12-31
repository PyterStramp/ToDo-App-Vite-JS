
import todoStore from '../store/todo.store';
import html from './app.html?raw';
import {displayTodos} from './use-cases';

const ElementIDs = {
    TodoList: '.todo-list',
}
//es necesario el raw para importar en crudo

/**
 * 
 * @param {String} elementId, renderiza la aplicación
 */
export const App = (elementId) => {
    
    const renderTodos = () => {
        //llamar todos los todos
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        displayTodos( ElementIDs.TodoList, todos );

    }
    //cuando la función app() se llama
    //función anónima
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        renderTodos();
    })();
}