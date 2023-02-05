import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTaskAction } from '../redux/task/slice';

export const TaskInput = ({ submitUpdate, edit }) => {
  const [value, setValue] = useState(edit ? edit.title : '');
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const addTask = (task) => dispatch(addTaskAction(task));

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      submitUpdate(edit.id, value);
    } else if (value) {
      addTask({
        id: new Date().getTime(),
        title: value,
        isCompleted: false,
        userId: localStorage.getItem('token'),
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
