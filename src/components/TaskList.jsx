import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTasks } from '../redux/task/AsyncActions';
import { Task } from './Task';
import { TaskInput } from './TaskInput';

export const TaskList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  console.log(tasks);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const activeTasks = tasks.filter((item) => !item.isCompleted);

  const doneTasks = tasks.filter((item) => item.isCompleted);

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
            return <Task item={item} key={item.id} />;
          })
        ) : (
          <p className="todo-list__null">Add your first task</p>
        )}
      </div>
      <TaskInput />
    </div>
  );
};
