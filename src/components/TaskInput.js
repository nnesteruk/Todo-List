import React from 'react'

export default function TaskInput({value, onChange, ...props }) {

    const [input, setInput] = React.useState(props.edit ? props.edit.title : '')
    const inputRef = React.useRef(null);

    React.useEffect(() => {
        inputRef.current.focus()
    })

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit({
            // ID: task.ID,
            title: input,
            // isCompleted: task.isCompleted,
        })
        setInput('');
    }
    return (
        <form className='task-form' onSubmit={handleSubmit}>
            {props.edit ? (<>
                <input value={input} onChange={handleChange} ref={inputRef} />
                <button>Update</button>
            </>) :
                (<>
                    <input value={input} onChange={handleChange} ref={inputRef} placeholder='Add a todo' />
                    <button>Add Todo</button>
                </>
                )}
        </form>
    )
}