import { createSlice } from '@reduxjs/toolkit';
import { getTasks } from './AsyncActions';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  isLoading: false,
  error: '',
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTaskAction(state, action) {
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

  extraReducers: {
    [getTasks.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getTasks.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload;
    },
    [getTasks.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { addTaskAction, removeTaskAction, updateTaskAction, doneTaskAction } =
  taskSlice.actions;

export default taskSlice.reducer;
