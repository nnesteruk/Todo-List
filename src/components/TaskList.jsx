import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addTaskAction,
  doneTaskAction,
  editTaskAction,
  removeTaskAction,
} from '../redux/reducers/TaskReducer';
import { Task } from './Task';
import { TaskInput } from './TaskInput';

export const TaskList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  console.log(tasks);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // const [tasks, setTasks] = useState([
  //   { id: 1, title: 'TODO task', isCompleted: false },
  //   { id: 2, title: '11 task', isCompleted: true },
  // ]);

  const activeTasks = tasks.filter((item) => !item.isCompleted);

  const doneTasks = tasks.filter((item) => item.isCompleted);

  const doneTask = (id) => {
    const copy = [...tasks];
    const current = copy.find((item) => item.id === id);
    current.isCompleted = !current.isCompleted;
    // setTasks(copy);
    dispatch(doneTaskAction(copy));
  };

  const removeTask = (id) => dispatch(removeTaskAction(id));
  // const removeTask = (id) => setTasks(tasks.filter((item) => item.id !== id));

  const addTask = (task) => {
    // setTasks([...tasks, task]);
    dispatch(addTaskAction(task));
  };

  const editTask = (id, newTitle) => {
    const copy = [...tasks];
    const current = copy.find((item) => item.id === id);
    current.title = newTitle;
    // setTasks(copy);
    dispatch(editTaskAction(copy));
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
