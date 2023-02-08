import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { taskApi } from '../redux/servises/taskApi';
import { doneTaskAction, removeTaskAction } from '../redux/task/slice';
import { TaskInput } from './TaskInput';

export const Task = ({ item }) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(null);

  const [update, {}] = taskApi.useUpdateTaskMutation();

  //!Через Redux-Thunk
  // const submitUpdate = (id, newTitle) => {
  //   const task = { id, newTitle };
  //   dispatch(updateTaskAction({ ...task }));
  //   setEdit(null);
  // };

  const submitUpdate = async (ID, newTitle) => {
    const task = { ID, newTitle };
    // console.log(`id: ${ID}, newTitle:${newTitle}`);
    await update({ ...task });
    setEdit(null);
  };

  // const doneTask = (id) => dispatch(doneTaskAction(id)); //!Через Redux-Thunk
  // const removeTask = (id) => dispatch(removeTaskAction(id)); //!Через Redux-Thunk

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

  const className = 'todo-list__task ' + (item.isCompleted ? ' task-done' : '');

  return (
    <div className={className}>
      <li onClick={() => doneTask(item.ID)} key={item.ID}>
        {item.title}
      </li>
      <div className="task__buttons">
        <p
          className="task__buttons-action"
          onClick={() =>
            setEdit({ ID: item.ID, title: item.title, isCompleted: item.isCompleted })
          }>
          🖉
        </p>
        <p className="task__buttons-action" onClick={() => removeTask(item.ID)}>
          ❌
        </p>
      </div>
    </div>
  );
};
