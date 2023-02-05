import { createStore } from 'redux';
import { TaskReducer } from './reducers/TaskReducer';

export const store = createStore(TaskReducer);
