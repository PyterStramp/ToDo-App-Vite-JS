
import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw';
import { renderPending, displayTodos} from './use-cases';

const ElementIDs = {
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}
//es necesario el raw para importar en crudo

/**
 * 
 * @param {String} elementId, renderiza la aplicación
 */
export const App = (elementId) => {
    
    const updatePendingCount = () => {
        renderPending( ElementIDs.PendingCountLabel );
    }

    const renderTodos = () => {
        //llamar todos los todos
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        displayTodos( ElementIDs.TodoList, todos );
        updatePendingCount();
    }

    //cuando la función app() se llama
    //función anónima
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        renderTodos();
    })();

    //referencias html
    
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUl = document.querySelector(ElementIDs.TodoList);
    const clearCompletedButton = document.querySelector(ElementIDs.ClearCompleted);
    const filtersLIs = document.querySelectorAll( ElementIDs.TodoFilters );

    //listeners
    newDescriptionInput.addEventListener('keyup', ( event ) => {
        if ( event.keyCode !== 13 ) return; //no continuo si no es enter
        if ( event.target.value.trim().lenght === 0 ) return; //trim quita los espacios

        todoStore.addTodo( event.target.value );
        console.log(todoStore.getTodos());
        renderTodos();
        event.target.value = '';
    });

    todoListUl.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');//el padre más cercano
        todoStore.toggleTodo( element.getAttribute('data-id') );
        renderTodos();
    });

    todoListUl.addEventListener('click', (event) => {
        const destroyElement = event.target.className ==='destroy';
        const element = event.target.closest('[data-id]');
        if (!element ||!destroyElement ) return;

        todoStore.deleteTodo( element.getAttribute('data-id') );
        renderTodos();
    });

    clearCompletedButton.addEventListener('click',( event ) => {
        todoStore.deleteCompleted();
        renderTodos();
    });

    filtersLIs.forEach( element => {

        element.addEventListener('click', (element) => {
            filtersLIs.forEach( elm => elm.classList.remove('selected') );
            element.target.classList.add('selected');

            switch ( element.target.text ) {
                case 'Todos':
                    todoStore.setFilter( Filters.All );
                    break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending );
                    break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed );
                    break;
                default:
                    throw new Error('Falló al seleccionar los filtros');    
            }
            renderTodos();
        });
    });

}