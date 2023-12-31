import { Todo } from '../todos/models/todo.model';

//estado global de la aplicación

const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = { //no exponer este state
    todos: [
        new Todo('Pan'),
        new Todo('Cangrejo'),
        new Todo('Mostaza'),
        new Todo('Pepinillos'),
        new Todo('Catsup'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    console.log(state);
    console.log('InitStore §');
}

const loadStore = () => {
    throw new Error ('Not implemented');
}

/**
 * 
 * @param {ObjectFilter} filter para obtener los toDos según su filtro
 */
const getTodos = (filter = Filters.All) => {
    //tres tipos de filtros
    switch (filter) {
        case Filters.All:
            return [...state.todos]; //arreglo
        case Filters.Completed:
            return state.todos.filter( todo => todo.done ); //regresa si la condición está en true
        case Filters.Completed:
            return state.todos.filter( todo => !todo.done );
        default:
            throw new Error(`El filtro ${filter} no es válido`);
    }
}

/**
 * 
 * @param {String} description del toDo a añadir
 */
const addTodo = ( description ) => {
    if (!description) throw new Error ('La descripción es necesaria');

    state.todos.push(new Todo(description));

}

/**
 * 
 * @param {String} todoId el Id del toDo para cambiar su estado
 */
const toggleTodo = ( todoId ) => {
    state.todos = state.todos.map( todo => {
        if ( todo.id === todoId ) { //id encontrado
            todo.done = !todo.done; //cambia al reves
        }
        return todo; //regresar la instancia
    } ); //barre cada uno de los elementos
}

/**
 * 
 * @param {String} todoId el ID del toDo para eliminar un toDo
 */
const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId ); //busca el id y elimina
}

const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => todo.done ); //busca el id y elimina    
}

/**
 * 
 * @param {Object Filters} newFilter para mandar el filtro (completado, pendiente o todos)
 */
const setFilter = ( newFilter = Filters.All ) => {
    if (Object.keys(newFilter).length === 0 ) throw new Error ('Filtro vacío');
    state.filter = newFilter;
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    initStore,
    loadStore,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter,
    getTodos,
}
