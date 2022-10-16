
import { requireUser } from "../utils/auth";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = (props) => {
    
    const [tasks, setTasks] = useState([])

    const sortTasks = (givenTasks) => {
        let checkedTasks = givenTasks.filter(task => task.completed);
        let uncheckedTasks = givenTasks.filter(task => !task.completed);

        return [...uncheckedTasks, ...checkedTasks];
    }

    const getTasks = () => {
        axios.get('/api/tasks', {
            params: {
                userId: props.user.id,
            },
        })
        .then(res => {
            console.log(res.data);
            setTasks(sortTasks(res.data));
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
    const handleNewTask = (e) => {
        e.preventDefault();
        if (!taskTitle) {
            return;
        }
        console.log('new task', taskTitle);
        axios.post('/api/tasks', {
            title: taskTitle,
            userId: props.user.id,
        })
            .then((res) => {
                setTaskTitle('');
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
                <h3>Task</h3>
                <form onSubmit={handleNewTask}>
                    <label>Title</label>
                    <input type="text" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} required/>
                    <button type="submit">New Task +</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default Dashboard

export async function getServerSideProps(context) {
    const props = await requireUser(context);

    return props;
}

// const getServerSideProps = async (context) => requireUser(context);
// export { getServerSideProps };
