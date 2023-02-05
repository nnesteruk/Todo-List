import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTaskAction(state, action) {
      console.log(action);
      state.tasks.push({ ...action.payload });
    },

    removeTaskAction(state, action) {
      state.tasks = state.tasks.filter((item) => item.id !== action.payload);
    },

    updateTaskAction(state, action) {
      const current = [...state.tasks].find((item) => item.id === action.payload.id);
      current.title = action.payload.newTitle;
    },

    doneTaskAction(state, action) {
      const current = [...state.tasks].find((item) => item.id === action.payload);
      current.isCompleted = !current.isCompleted;
    },
  },
});

export const { addTaskAction, removeTaskAction, updateTaskAction, doneTaskAction } =
  taskSlice.actions;

export default taskSlice.reducer;
