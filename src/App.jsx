import React,{ useReducer } from "react";
import ToDoList from './ToDoList'
import { v4 as uuidv4 } from 'uuid';

const todosInitialState = {
  todos:[{ id:1, text: "finishing reading hooks chapter"},
  { id:2, text: "finish assignment"},
  { id:3, text: "read book"}
  ], 
  count: 0
  };
  
export const TodosContext=React.createContext();


export default function App() {

  function todosReducer(state,action){
    switch(action.type){
      case "add":
        const newToDo={id: uuidv4(), text: action.payload};
        const addedToDo=[...state.todos, newToDo];
        return {...state,todos:addedToDo}
      case 'edit': 
        const updatedToDo = {...action.payload}
        const updatedToDoIndex = state.todos.findIndex(t => t.id === action.payload.id)
        const updatedToDos = [
        ...state.todos.slice(0,updatedToDoIndex),
        updatedToDo,
        ...state.todos.slice(updatedToDoIndex + 1)
        ];
        console.log(state.count)
        return {...state, todos: updatedToDos}           
      case "delete":
        const filtertodos=state.todos.filter(todo=>(todo.id!==action.payload))
        return {...state,todos:filtertodos}
      default:
        return todosInitialState;
    }
  }
  const [state, dispatch]=useReducer(todosReducer, todosInitialState);

  
  
  return (
    
    <TodosContext.Provider value={{state,dispatch}}> 
    <ToDoList />
    </TodosContext.Provider> 
    
     
    
  )
}


