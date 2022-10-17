import { useState } from "react";

const Task = ({task, onCheckBoxClick, onDelete}) => {

    const [isChecked, setIsChecked] = useState(task.completed); 

    return (
        <div className="flex gap-5">
            <input type="checkbox" defaultChecked={task.completed} onClick={onCheckBoxClick}/>
            <h1>{task.title}</h1>
            <h1>{task.priority}</h1>
            <button onClick={onDelete}>Delete</button>
        </div>
    )
}

export default Task