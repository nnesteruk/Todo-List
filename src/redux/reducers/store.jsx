import { createStore } from 'redux';
import { TaskReducer } from './TaskReducer';

export const store = createStore(TaskReducer);
