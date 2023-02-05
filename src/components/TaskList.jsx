import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addTaskAction,
  doneTaskAction,
  removeTaskAction,
  updateTaskAction,
} from '../redux/task/slice';
import { Task } from './Task';
import { TaskInput } from './TaskInput';

export const TaskList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  console.log(tasks);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  const activeTasks = tasks.filter((item) => !item.isCompleted);

  const doneTasks = tasks.filter((item) => item.isCompleted);

  const doneTask = (id) => {
    dispatch(doneTaskAction(id));
  };

  const removeTask = (id) => dispatch(removeTaskAction(id));

  const addTask = (task) => {
    dispatch(addTaskAction(task));
  };

  const editTask = (id, newTitle) => {
    const current = { id, newTitle };
    dispatch(updateTaskAction({ ...current }));
  };

  const exit = () => {
    navigate('/');
    localStorage.clear();
  };

  return (
    <div className="todo-list">
      <div className="todo-list__title">
        <h1 className="todo-list__title-text">What's the Plan for Today?</h1>
        <button className="todo-list__title-button" onClick={() => exit()}>
          Exit
        </button>
      </div>
      <div>
        {tasks.length ? (
          [...activeTasks, ...doneTasks].map((item) => {
            return (
              <Task
                item={item}
                key={item.id}
                doneTask={doneTask}
                removeTask={removeTask}
                editTask={editTask}
              />
            );
          })
        ) : (
          <p className="todo-list__null">Add your first task</p>
        )}
      </div>
      <TaskInput addTask={addTask} />
    </div>
  );
};
