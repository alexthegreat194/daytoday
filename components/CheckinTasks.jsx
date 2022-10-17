import Task from "./Task";
import { useState } from "react";

const CheckinTasks = ({ tasksState, increasePhase }) => {
    const { tasks, setTasks } = tasksState;
    const [taskTitle, setTaskTitle] = useState("");

    const newTaskHandler = (e) => {
        e.preventDefault();
        setTasks([...tasks, { title: taskTitle, priority: 0 }]);
        setTaskTitle("");
    }

    const deleteTask = (index) => {
        let newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    }

    return (
        <div>
            <h1>Tasks</h1>
            {tasks.map((task, i) => (
                <div key={i} className="flex gap-5">
                    <h3>{task.title}</h3>
                    <h3>{task.priority}</h3>
                    <button onClick={() => deleteTask(i)}>Delete</button>
                </div>
            ))}

            <form onSubmit={newTaskHandler}>
                <input type="text" placeholder="Add a task" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required />
                <button type="submit">Add</button>
            </form>

            <button onClick={increasePhase}>Done</button>
        </div>
    )
}

export default CheckinTasks;