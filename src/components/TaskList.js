import React, { useCallback, useContext, useEffect } from 'react';
import Task from './Task';
import TaskInput from './TaskInput';
import {
    useNavigate
} from "react-router-dom";
import AuthContext from '../Context/AuthProvider';
import axios from 'axios';

export default function TaskList() {
    const navigate = useNavigate();

    const [tasks, setTasks] = React.useState([]);

    const { auth: { currentUser, isAuth }, setAuth } = useContext(AuthContext)
    const token = localStorage.getItem('Token')

    const config = {
        headers: {
            Authorization: `Basic ${currentUser.tok}`
        }
    }

    const getTasks = useCallback(async () => {
        try {
            let response = await axios.get("https://first-node-js-app-r.herokuapp.com/api/todos", config);
            console.log(response)
            setTasks(response.data)
        }
        catch (err) {
            console.log(err)
        }
    }, [])

    useEffect(() => {
        getTasks()
    }, [])

    const activeTasks = tasks.filter(item => !item.isCompleted);
    const doneTasks = tasks.filter(item => item.isCompleted);

    const doneTask = (ID) => {
        try {
            const index = tasks.findIndex(item => item.ID === ID);
            setTasks(() => {
                tasks[index].isCompleted = true;
                return tasks.filter(item => item);
            })
            let response = axios.patch(`https://first-node-js-app-r.herokuapp.com/api/todos/${ID}/isCompleted`, null, config);
            console.log(response)
        }
        catch (err) {
            console.log(err)
        }
    };

    const editTask = (ID, newValue) => {
        try {
            if (!newValue.title || /^\s*$/.test(newValue.title)) {
                return;
            }
            let response = axios.patch(`https://first-node-js-app-r.herokuapp.com/api/todos/${ID}`,
                { title: newValue.title }
                , config);
            response.then(({ data }) => {
                console.log(data)
                setTasks(prev => prev.map(item => item.ID === ID ? data : item))
            })

        }
        catch (err) {
            console.log(err)
        }
    };

    const deleteTask = (ID) => {
        try {
            setTasks(tasks.filter(item => item.ID !== ID))
            let response = axios.delete(`https://first-node-js-app-r.herokuapp.com/api/todos/${ID}`, config);
            console.log(response)
        }
        catch (err) {
            console.log(err)
        }
    };

    const addNewTask = (task) => {
        try {
            if (!task.title || /^\s*$/.test(task.title)) {
                return;
            }

            let response = axios.post("https://first-node-js-app-r.herokuapp.com/api/todos",
                task,
                config
            )
            console.log(response)
            response.then(({ data }) => {
                setTasks([...tasks, data]);
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    const exit = () => {
        localStorage.removeItem('Token');
        setAuth({ currentUser: {}, isAuth: false })
        navigate('/Login')
    }


    return (
        //<>{isAuth ?
        <>{token ?
            <div className="App" >
                <div className='title'>
                    <h1 className="title__top" > What's the Plan for Today?</h1>
                    <button className='title exit__btn' onClick={() => exit()}></button>
                </div>
                {tasks.length ? (
                    <div>
                        {[...activeTasks, ...doneTasks].map((item) => {
                            return <Task doneTask={() => doneTask(item.ID)}
                                deleteTask={() => deleteTask(item.ID)}
                                task={item}
                                key={item.ID}
                                editTask={editTask} />

                        }
                        )}
                        <TaskInput
                            onSubmit={addNewTask}
                        />
                    </div>) : (<>
                        <h3 className='null-tasklist'>
                            Add your first task today
                        </h3>
                        <TaskInput
                            onSubmit={addNewTask} />
                    </>)
                }
            </div>
            : <div>
                <p>Authorization is not work</p>
            </div>
        }
        </>
    )
}