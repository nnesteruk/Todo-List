import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { doneTaskAction, removeTaskAction, updateTaskAction } from '../redux/task/slice';
import { TaskInput } from './TaskInput';

export const Task = ({ item }) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(null);

  const submitUpdate = (id, newTitle) => {
    const task = { id, newTitle };
    dispatch(updateTaskAction({ ...task }));
    setEdit(null);
  };
  const doneTask = (id) => dispatch(doneTaskAction(id));
  const removeTask = (id) => dispatch(removeTaskAction(id));

  if (edit) {
    return <TaskInput submitUpdate={submitUpdate} edit={edit} />;
  }

  const className = 'todo-list__task ' + (item.isCompleted ? ' task-done' : '');

  return (
    <div className={className}>
      <li onClick={() => doneTask(item.id)} key={item.id}>
        {item.title}
      </li>
      <div className="task__buttons">
        <p
          className="task__buttons-action"
          onClick={() =>
            setEdit({ id: item.id, title: item.title, isCompleted: item.isCompleted })
          }>
          🖉
        </p>
        <p className="task__buttons-action" onClick={() => removeTask(item.id)}>
          ❌
        </p>
      </div>
    </div>
  );
};
