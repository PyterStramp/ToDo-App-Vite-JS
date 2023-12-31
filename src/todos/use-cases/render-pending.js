import todoStore, { Filters } from "../../store/todo.store";

let element;
/**
 * 
 * @param {String} elementId El lugar donde se quiere que se graben los pendientes
 */
export const renderPending = ( elementId ) => {

    if ( !element )
        element = document.querySelector( elementId );
    if ( !element )
        throw new Error(`No se encontró el elemento ${ elementId }`);
    element.innerHTML = todoStore.getTodos( Filters.Pending ).length;
}