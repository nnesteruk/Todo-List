import { Login } from './components/Authorization/Login';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './scss/components/app.scss';
import { Registration } from './components/Authorization/Registration';
import { TaskList } from './components/TaskList';
import { PrivateRoute } from './hoc/PrivateRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/Todo-List" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route
        path="/todo"
        element={
          <PrivateRoute>
            <TaskList />
          </PrivateRoute>
        }
      />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
