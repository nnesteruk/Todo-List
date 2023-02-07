import { configureStore } from '@reduxjs/toolkit';
import { taskApi } from './servises/taskApi';
import taskReducer from './task/slice';

export const store = configureStore({
  reducer: {
    task: taskReducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(taskApi.middleware);
  },
});
