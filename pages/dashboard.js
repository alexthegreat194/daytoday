
import { requireUser } from "../utils/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import { ableToCheckIn } from "../utils/checks";

const Dashboard = (props) => {
    
    const [tasks, setTasks] = useState([])
    const [subTasks, setSubTasks] = useState([])

    const sortTasks = (givenTasks) => {
        let checkedTasks = givenTasks.filter(task => task.completed && !task.isSubtask);
        let uncheckedTasks = givenTasks.filter(task => !task.completed && !task.isSubtask);

        let subTasks = givenTasks.filter(task => task.isSubtask);
        let checkedSubTasks = subTasks.filter(task => task.completed);
        let uncheckedSubTasks = subTasks.filter(task => !task.completed);

        let sortedTasks = [...uncheckedTasks, ...checkedTasks];
        let sortedSubTasks = [...uncheckedSubTasks, ...checkedSubTasks];

        console.log({sortedTasks, sortedSubTasks});

        return { sortedTasks, sortedSubTasks };
    }

    const getTasks = () => {
        axios.get('/api/tasks', {
            params: {
                userId: props.user.id,
            },
        })
        .then(res => {
            console.log(res.data);
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
        axios.post('/api/tasks/checked', {
            taskId: id,
            userId: props.user.id,
            completed: checked
        })
            .then((res) => {
                getTasks();
            })
            .catch(err => console.log(err.response.data));
    };

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
        <div>
            <h1>Dashboard</h1>
            <h1>{props.user.username}</h1>
            <h1>{props.user.email}</h1>
        </div>

        <div>
            <h1>Tasks</h1>
            <div>
                {tasks.map((task) => {
                    return (
                        <div key={task.id} className="flex gap-5">
                            <input type="checkbox" value={task.completed} onClick={() => checkTask(task.id, !task.completed)}/>
                            <h1>{task.title}</h1>
                            <h1>{task.priority}</h1>
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                        </div>
                    )
                })}
            </div>
            <br />
            <div>
                <h3>Task title</h3>
                <form onSubmit={(e) => handleNewTask(e, false)}>
                    <label>Title</label>
                    <input type="text" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} required/>
                    <button type="submit">New Task +</button>
                </form>
            </div>
        </div>

        <div>
            <h1>SubTasks</h1>
            <div>
                {subTasks.map((task) => {
                    return (
                        <div key={task.id} className="flex gap-5">
                            <input type="checkbox" value={task.completed} onClick={() => checkTask(task.id, !task.completed)}/>
                            <h1>{task.title}</h1>
                            <h1>{task.priority}</h1>
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                        </div>
                    )
                })}
            </div>
            <br />
            <div>
                <h3>Subtask</h3>
                <form onSubmit={(e) => handleNewTask(e, true)}>
                    <label>Title</label>
                    <input type="text" value={subtaskTitle} onChange={e => setSubtaskTitle(e.target.value)} required/>
                    <button type="submit">New Subtask +</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default Dashboard

export async function getServerSideProps(context) {
    const props = await requireUser(context);

    const user = props.props.user;
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
