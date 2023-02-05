import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks.push({ ...action.payload });
    },

    removeTask(state, action) {
      state.tasks = state.tasks.filter((item) => item.id !== action.payload);
    },

    updateTask(state, action) {
      const copy = [...state.tasks];
      const current = copy.find((item) => item === action.payload);
      current.title = action.payload;
    },

    doneTask(state, action) {
      const copy = [...state.tasks];
      const current = copy.find((item) => item === action.payload);
      current.isCompleted = !current.isCompleted;
    },
  },
});

export const { addTask, removeTask, updateTask, doneTask } = taskSlice.actions;

export default taskSlice.reducer;

// const ADD_TASK = 'ADD_TASK';
// const DELETE_TASK = 'DELETE_TASK';
// const UPDATE_TASK = 'UPDATE_TASK';
// const DONE_TASK = 'DONE_TASK';

// export const TaskReducer = (state = defaultState, action) => {
//   switch (action.type) {
//     case ADD_TASK:
//       return { ...state, tasks: [...state.tasks, action.payload] };
//     case DELETE_TASK:
//       return { ...state, tasks: state.tasks.filter((item) => item.id !== action.payload) };
//     case UPDATE_TASK:
//       return { ...state, tasks: action.payload };
//     case DONE_TASK:
//       return { ...state, tasks: action.payload };
//     default:
//       return state;
//   }
// };

// export const addTaskAction = (payload) => ({ type: ADD_TASK, payload });
// export const removeTaskAction = (payload) => ({ type: DELETE_TASK, payload });
// export const doneTaskAction = (payload) => ({ type: DONE_TASK, payload });
// export const editTaskAction = (payload) => ({ type: UPDATE_TASK, payload });
