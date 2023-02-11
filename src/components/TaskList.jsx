import { useNavigate } from 'react-router-dom';
import { taskApi } from '../redux/servises/taskApi';
import { Task } from './Task';
import { TaskInput } from './TaskInput';

export const TaskList = () => {
  const navigate = useNavigate();

  const { data: tasks, isSuccess, error } = taskApi.useGetTasksQuery('');

  const activeTasks = isSuccess && tasks.filter((item) => !item.isCompleted);
  const doneTasks = isSuccess && tasks.filter((item) => item.isCompleted);

  const exit = () => {
    navigate('/');
    localStorage.clear();
  };

  return (
    <div className="todo-list">
      {error && <h1>Error...</h1>}
      <div className="todo-list__title">
        <h1 className="todo-list__title-text">What's the Plan for Today?</h1>
        <button className="todo-list__title-button" onClick={() => exit()}>
          Exit
        </button>
      </div>
      <div>
        {tasks ? (
          [...activeTasks, ...doneTasks].map((item) => <Task item={item} key={item.ID} />)
        ) : (
          <p className="todo-list__null">Add your first task</p>
        )}
      </div>
      <TaskInput />
    </div>
  );
};
