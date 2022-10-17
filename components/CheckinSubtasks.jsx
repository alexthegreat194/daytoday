import { useState } from "react";

const CheckinSubtasks = ({ tasksState, increasePhase }) => {

    const { subTasks, setSubTasks } = tasksState;
    const [taskTitle, setTaskTitle] = useState("");

    const newTaskHandler = (e) => {
        e.preventDefault();
        setSubTasks([...subTasks, { title: taskTitle, priority: 0 }]);
        setTaskTitle("");
    }

    const deleteTask = (index) => {
        let newTasks = [...subTasks];
        newTasks.splice(index, 1);
        setSubTasks(newTasks);
    }

    return (
        <div>
            <h1>Subtasks</h1>
            {subTasks.map((task, i) => (
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

export default CheckinSubtasks;