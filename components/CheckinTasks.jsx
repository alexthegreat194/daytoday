import Task from "./Task";
import { useState } from "react";
import Priority from "./Priority";

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
        <div className="text-xl h-[80vh] flex flex-col items-center justify-center gap-5">
            <h1 className="text-3xl font-bold">What do you want to do today?</h1>
            
            <div className="w-3/5 flex flex-col gap-5">
                <div className="flex flex-col shadow">
                    {tasks.map((task, i) => {

                        let roundedCorners = "";
                        if (i === 0) {
                            roundedCorners = " rounded-t-xl";
                        }
                        
                        return (
                        <div key={i} className={"flex justify-between items-center border p-4 w-full " + roundedCorners}>
                            <h3 className="">{task.title}</h3>
    
                            <div className="flex gap-10">
                                <Priority priority={task.priority} />
                                
                                <button onClick={() => deleteTask(i)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                                        className="w-8 h-8 text-red-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )})}
    
                    <form onSubmit={newTaskHandler} className="flex flex-col ">
                        <input className="w-full p-4 border" type="text" placeholder="Add a task" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required />
                        <button className="bg-blue-300 text-white rounded-b-xl p-2" type="submit">+ Task</button>
                    </form>
                </div>
    
                
                <div className="flex gap-10">
                    <button className="text-white bg-blue-300 hover:bg-blue-400 transition-colors rounded-xl px-5 py-2" onClick={increasePhase}>Done</button>
                    <button className="text-blue-300">Clear All</button>
                </div>
            </div>

        </div>
    )
}

export default CheckinTasks;