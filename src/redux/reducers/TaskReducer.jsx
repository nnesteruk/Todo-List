const defaultState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  edit: null,
};

const ADD_TASK = 'ADD_TASK';
const DELETE_TASK = 'DELETE_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const DONE_TASK = 'DONE_TASK';

export const TaskReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case DELETE_TASK:
      return { ...state, tasks: state.tasks.filter((item) => item.id !== action.payload) };
    case UPDATE_TASK:
      return { ...state, tasks: action.payload };
    case DONE_TASK:
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
};

export const addTaskAction = (payload) => ({ type: ADD_TASK, payload });
export const removeTaskAction = (payload) => ({ type: DELETE_TASK, payload });
export const doneTaskAction = (payload) => ({ type: DONE_TASK, payload });
export const editTaskAction = (payload) => ({ type: UPDATE_TASK, payload });
