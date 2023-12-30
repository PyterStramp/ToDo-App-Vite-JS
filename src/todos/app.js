
import html from './app.html?raw';
//es necesario el raw para importar en crudo

/**
 * 
 * @param {String} elementId, renderiza la aplicación
 */
export const App = (elementId) => {
    
    //cuando la función app() se llama
    //función anónima
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
    })();
}