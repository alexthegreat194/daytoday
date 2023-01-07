import { useState } from "react";
import Priority from "./Priority";
import Dropdown from "./Dropdown";

const Task = ({task, onCheckBoxClick, onDelete, onStatusChange}) => {

    const [isChecked, setIsChecked] = useState(task.completed); 

    return (
        <div className="flex justify-between border p-5">
            <div className="flex gap-5 items-center">
                <input className="scale-150	" type="checkbox" defaultChecked={task.completed} onClick={onCheckBoxClick}/>
                <h3 className="text-lg">{task.title}</h3>
            </div>

            <div className="flex gap-5 items-center">
                <Dropdown onDropdownChange={(status) => onStatusChange(task.id, status)} startingStatus={task.priority} />
                <button onClick={onDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                        className="w-8 h-8 text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Task