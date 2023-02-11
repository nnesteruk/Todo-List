import { useEffect, useRef, useState } from 'react';
import { taskApi } from '../redux/servises/taskApi';

export const TaskInput = ({ submitUpdate, edit }) => {
  const [value, setValue] = useState(edit ? edit.title : '');
  const inputRef = useRef(null);

  const [add, {}] = taskApi.useAddTaskMutation();
  const addTask = async (task) => {
    const response = await add(task);
    console.log(response);
    return response;
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      submitUpdate(edit.ID, value);
    } else if (value) {
      addTask({
        title: value,
      });
      setValue('');
    } else {
      throw new Error(alert('Поле пустое'));
    }
  };

  return (
    <form className="todo-list__form" onSubmit={handleSubmit}>
      {edit ? (
        <>
          <input ref={inputRef} value={value} onChange={(e) => handleChange(e)} />
          <button>Update Todo</button>
        </>
      ) : (
        <>
          <input
            ref={inputRef}
            value={value}
            placeholder="Add some task"
            onChange={(e) => handleChange(e)}
          />
          <button>Add Todo</button>
        </>
      )}
    </form>
  );
};
