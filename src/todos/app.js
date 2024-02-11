import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPending } from './uses-cases';

// Clases Keywords

const Keywords = {
    BtnDestroy: "destroy",
    DeletedCompleted: "clear-completed",
    Filter: {
        All: "All",
        Completed: "Completed",
        Pending: "Pending",
    },
}

const ElementIds = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    CleaerCompleted: '.clear-completed', 
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}

/**
 * 
 * @param {String} elementId 
 */
export const App = ( elementId ) => {

    const displayTodo = () => {
        const todos = todoStore.getTodo( todoStore.getCurrentFilter());
        renderTodos( ElementIds.TodoList, todos );
        updatePendingCount();
    }

    const updatePendingCount = () =>{
        renderPending(ElementIds.PendingCountLabel);
    }

    // Cuando la función App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        displayTodo();
    })();

    // Referencias HTML 
    const newDescriptionInput = document.querySelector(ElementIds.NewTodoInput);
    const todoListUL = document.querySelector(ElementIds.TodoList);
    const clearCompletedButton = document.querySelector(ElementIds.CleaerCompleted);
    const filtersLIs = document.querySelectorAll(ElementIds.TodoFilters);

    //Listeners

    newDescriptionInput.addEventListener('keyup', (event) =>{
        if( event.keyCode !== 13) return;
        if( event.target.value.trim().length === 0) return;

        todoStore.addTodo( event.target.value );
        displayTodo();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) =>{
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo( element.getAttribute('data-id') );
        displayTodo();
    });

    todoListUL.addEventListener('click', (event) =>{
        const element = event.target.closest('[data-id]');
        if(!element) return;
        if( event.target.className === Keywords.BtnDestroy)
            todoStore.deleteTodo( element.getAttribute('data-id'));
            displayTodo();
    });

    clearCompletedButton.addEventListener('click', (event) =>{
        todoStore.deleteCompleted();
        displayTodo();

        // let todoDeleteCompleted;

        // if( event.target.className === Keywords.DeletedCompleted )
        //     todoDeleteCompleted = todoStore.getTodo(Keywords.Filter.Completed);
        //     if(!todoDeleteCompleted) throw new Error("You do not have any tasks completed.")

        //     todoDeleteCompleted.forEach( todo => {
        //         todoStore.deleteTodo( todo.id );
        //     });
        //     displayTodo(); 
    });

    filtersLIs.forEach( element => {
        element.addEventListener('click', (event) =>{
            filtersLIs.forEach( el => el.classList.remove('selected'));
            event.target.classList.add('selected');

            switch ( event.target.text ) {
                case 'Todos':
                    todoStore.setFilter( Filters.All );
                break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending );
                break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed );
                break;
            }

            displayTodo();

        });
    });
}