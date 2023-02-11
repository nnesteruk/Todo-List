import React, { useState } from 'react';
import { taskApi } from '../redux/servises/taskApi';
import { TaskInput } from './TaskInput';

export const Task = ({ item }) => {
  const { ID, title, isCompleted } = item;
  const [edit, setEdit] = useState(null);

  const [update, {}] = taskApi.useUpdateTaskMutation();

  const submitUpdate = async (ID, newTitle) => {
    const task = { ID, newTitle };
    await update({ ...task });
    setEdit(null);
  };
  const [done, {}] = taskApi.useDoneTaskMutation();
  const doneTask = async (id) => {
    const response = await done(id);
    console.log(response);
    return response;
  };

  const [remove, {}] = taskApi.useRemoveTaskMutation();
  const removeTask = async (id) => {
    const response = await remove(id);
    console.log(response);
    return response;
  };

  if (edit) {
    return <TaskInput submitUpdate={submitUpdate} edit={edit} />;
  }

  const className = 'todo-list__task ' + (isCompleted ? ' task-done' : '');

  return (
    <div className={className}>
      <li onClick={() => doneTask(ID)} key={ID}>
        {title}
      </li>
      <div className="task__buttons">
        <p
          className="task__buttons-action"
          onClick={() => setEdit({ ID: ID, title: title, isCompleted: isCompleted })}>
          🖉
        </p>
        <p className="task__buttons-action" onClick={() => removeTask(ID)}>
          ❌
        </p>
      </div>
    </div>
  );
};
