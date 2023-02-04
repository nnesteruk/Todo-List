import React, { useState } from 'react';
import { TaskInput } from './TaskInput';

export const Task = ({ item, doneTask, removeTask, editTask }) => {
  const [edit, setEdit] = useState(null);

  const submitUpdate = (id, newTitle) => {
    editTask(id, newTitle);
    setEdit(null);
  };

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
