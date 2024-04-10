import { useState } from "react";
import { useReducer } from "react";

const initialState = [];

const TODOS_ACTIONS = {
  ADD_TASK: "add_task",
  DELETE_TASK: "delete_task",
  RESET_TODOS: "reset_todos",
  EDIT_TASK: "edit_task",
};

function reducer(state, action) {
  switch (action.type) {
    case TODOS_ACTIONS.ADD_TASK:
      return [
        ...state,
        {
          id: state.length + 1,
          name: action.payload,
        },
      ];
      case TODOS_ACTIONS.DELETE_TASK:
        return state.filter((d) => d.id !== action.payload);
        
        case TODOS_ACTIONS.EDIT_TASK:
      return [state, {name: action.payload}];
      
      
    case TODOS_ACTIONS.RESET_TODOS:
      return init(action.payload);

    default:
      return state;
  }
}

function init(initialState) {
  const preState = [...initialState, {id: '1', name: 'Learning to code'}]
  return preState;
}

const Todos = () => {
  const [Todos, dispatch] = useReducer(reducer, initialState, init);



  return (
    <div>
    <form>
      <h1>TODO List {Todos.length}</h1>
      Add new task
      <input type="text" placeholder="enter new task"
        onBlur= {(e) => 
        dispatch({ type: TODOS_ACTIONS.ADD_TASK, payload: e.target.value })}/>
        
      <button
        onClick={() =>
          dispatch({ type: TODOS_ACTIONS.RESET_TODOS, payload: initialState })
        }
        >
        Reset
      </button>
        </form>
      <hr />
      {Todos.map((Todos) => (
        <li key={Todos.id}>
          <input type="checkbox" />
          {Todos.name}
          <span>
            <button onClick={() =>
                dispatch({ type: TODOS_ACTIONS.EDIT_TASK, payload: ['']})
              }>Edit</button>
            <button
              onClick={() =>
                dispatch({ type: TODOS_ACTIONS.DELETE_TASK, payload: Todos.id })
              }
            >
              Delete
            </button>
          </span>
        </li>
      ))}
    </div>
  );
};

export default Todos;
