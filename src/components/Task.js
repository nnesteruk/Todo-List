import React from 'react';
import '../index.css';
import TaskInput from './TaskInput';

export default function Task({ task, ...props }) {
    const [edit, setEdit] = React.useState({
        // ID: null,
        title: '',
        isCompleted: false,
    })

    const submitUpdate = (value) => {
        props.editTask(edit.ID, value)
        setEdit({
            // ID: null,
            title: '',
            isCompleted: false,
        })
    }


    const ActionBtn = () => (
        <div>{
            !task.isCompleted ?
                <div className='Buttons'>
                    <p className="action-btn" onClick={() =>
                        setEdit({ ID: task.ID, title: task.title, isCompleted: task.isCompleted, })}>🖉</p>
                    {/* setEdit({ title: task.title })}>🖉</p> */}
                    <p className='action-btn' onClick={props.doneTask}>✅</p>
                </div>
                : <p className="action-btn" onClick={props.deleteTask}>❌</p>
        }
        </div>
    );

    const className = 'task ' + (task.isCompleted ? 'task-done' : '');

    if (edit.ID) {
        return <TaskInput edit={edit} onSubmit={submitUpdate} />
    }

    return (
        <div className={className} >
            <p>{task.title}</p>
            <ActionBtn />
        </div>
    )
}