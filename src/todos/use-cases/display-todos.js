
import {} from '../models/todo.model';
import { createTodoHTML } from './';

let element;

/**
 * 
 * @param {String} elementId identificador del elemento
 * @param {Todo} toDos
 */
export const displayTodos = ( elementId, todos = [] ) => {
    
    if (!element)
        element = document.querySelector( elementId );

    if (!element) throw new Error (`No se enconctró el element ${elementId}`);
    //element html
    //purgar el contenido
    element.innerHTML = '';

    todos.forEach (todo => {
        element.append( createTodoHTML(todo) );
    });
}