
import { requireUser } from "../utils/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import { ableToCheckIn } from "../utils/checks";
import Task from "../components/Task";
import Dropdown from "../components/Dropdown";
import Divider from "../components/Divider";
import { toast } from "react-hot-toast";

const Dashboard = (props) => {
    
    const [tasks, setTasks] = useState([])
    const [subTasks, setSubTasks] = useState([])

    const sortTasks = (givenTasks) => {
        let checkedTasks = givenTasks.filter(task => task.completed && !task.isSubtask);
        let uncheckedTasks = givenTasks.filter(task => !task.completed && !task.isSubtask);

        //bandaid fix to sort both checkedTasks and uncheckedTask by priority
        checkedTasks.sort((a, b) => b.priority - a.priority);
        uncheckedTasks.sort((a, b) => b.priority - a.priority);

        let subTasks = givenTasks.filter(task => task.isSubtask);
        let checkedSubTasks = subTasks.filter(task => task.completed);
        let uncheckedSubTasks = subTasks.filter(task => !task.completed);

        //bandaid fix to sort both checkedTasks and uncheckedTask by priority
        checkedSubTasks.sort((a, b) => b.priority - a.priority);
        uncheckedSubTasks.sort((a, b) => b.priority - a.priority);

        let sortedTasks = [...uncheckedTasks, ...checkedTasks];
        let sortedSubTasks = [...uncheckedSubTasks, ...checkedSubTasks];

        // console.log({sortedTasks, sortedSubTasks});

        return { sortedTasks, sortedSubTasks };
    }

    const getTasks = () => {
        axios.get('/api/tasks', {
            params: {
                userId: props.user.id,
            },
        })
        .then(res => {
            // console.log(res.data);
            let { sortedTasks, sortedSubTasks } = sortTasks(res.data);
            setTasks(sortedTasks);
            setSubTasks(sortedSubTasks);
        })
        .catch(err => console.log(err));    
    }

    const deleteTask = (id) => {
        console.log('delete task', id);
        
        axios.post('/api/tasks/delete', {
            taskId: id,
            userId: props.user.id
        })
            .then((res) => {
                getTasks();
            })
            .catch(err => console.log(err.response.data));
    };

    const checkTask = (id, checked) => {
        console.log('check task', id, checked);
        axios.post('/api/tasks/checked', {
            taskId: id,
            userId: props.user.id,
            completed: checked
        })
            .then((res) => {
                console.log(res.data);
                getTasks();
            })
            .catch(err => console.log(err.response.data));
    };

    const changeStatus = (id, status) => {
        console.log('status change', id, status)
        axios.post('/api/tasks/status', {
            taskId: id,
            userId: props.user.id,
            status: status
        })
            .then((res) => {
                console.log(res.data);
                getTasks();
            })
            .catch(err => console.log(err.response.data));
    }

    const confirmDelete = (id) => {
        toast((t) => {

            const handleConfirm = () => {
                deleteTask(id);
                toast.dismiss(t.id)
            }

            return (
                <div className="flex justify-center items-center gap-5">
                    <h3 className="font-bold">Delete Task?</h3> 
                    <div className="">
                        <button onClick={handleConfirm} className="text-white bg-red-400 hover:bg-red-500 transition-colors rounded-xl px-5 py-2">Confirm</button>
                        {/* <button className="text-white bg-blue-300 hover:bg-blue-400 transition-colors rounded-xl px-5 py-2" >Cancel</button> */}
                    </div>
                </div>
            )
        },
        {
            duration: 5000,
        })
    }

    useEffect(() => {
        getTasks();
    }, []);

    const [taskTitle, setTaskTitle] = useState('');
    const [subtaskTitle, setSubtaskTitle] = useState('');
    
    const handleNewTask = (e, isSubtask) => {
        e.preventDefault();

        let title = isSubtask ? subtaskTitle : taskTitle;

        if (!title) {
            return;
        }
        console.log('new task', title);
        axios.post('/api/tasks', {
            title: title,
            userId: props.user.id,
            isSubtask: isSubtask
        })
            .then((res) => {
                if (isSubtask) {
                    setSubtaskTitle('');
                } else {
                    setTaskTitle('');
                }
                getTasks();
            })
            .catch(err => console.log(err.response.data));
        
    };

    return (
        <>

        <div className="flex justify-center border p-10">
            <h1 className="text-3xl font-thin">Welcome Back <span className="font-bold">{props.user.username}</span></h1>
        </div>        


        <div className="w-1/2">
            <div className="m-5">
                <h1 className="text-2xl font-semibold my-3">Tasks</h1>
                <div>
                    {tasks.map((task) => {
                        return (
                            <Task
                                task={task}
                                key={task.id} 
                                onDelete={() => confirmDelete(task.id)}
                                onCheckBoxClick={() => checkTask(task.id, !task.completed)}
                                onStatusChange={changeStatus}
                            />
                        )
                    })}
                </div>
    
                <div>
                    <form onSubmit={(e) => handleNewTask(e, false)}  className="flex flex-col ">
                        <input className="w-full p-4 border" type="text" placeholder="New Task" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} required/>
                        <button className="bg-blue-300 text-white rounded-b-xl p-2" type="submit">+ Task </button>
                    </form>
                </div>
            </div>

            {/* <Divider /> */}
    
            <div className="m-5">
                <h1 className="text-2xl font-semibold  my-3">Subtasks</h1>
                <div>
                    {subTasks.map((task) => {
                        return (
                            <Task
                                task={task}
                                key={task.id} 
                                onDelete={() => confirmDelete(task.id)}
                                onCheckBoxClick={() => checkTask(task.id, !task.completed)}
                                onStatusChange={changeStatus}
                            />
                        )
                    })}
                </div>
                <div>
                    <form onSubmit={(e) => handleNewTask(e, true)} className="flex flex-col">
                        <input className="w-full p-4 border" type="text" placeholder="New Subtask" value={subtaskTitle} onChange={e => setSubtaskTitle(e.target.value)} required/>
                        <button className="bg-red-300 text-white rounded-b-xl p-2" type="submit">New Subtask +</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Dashboard

export async function getServerSideProps(context) {
    const props = await requireUser(context);

    const user = props.props.user;
    if (!user) {
        return props;
    }

    const valid = ableToCheckIn(user.lastLogin);
    // console.log(valid);

    if (valid) {
        return {
            redirect: {
                destination: '/checkin',
                permanent: false,
            },
        }
    }
    
    return props;
}

// const getServerSideProps = async (context) => requireUser(context);
// export { getServerSideProps };
