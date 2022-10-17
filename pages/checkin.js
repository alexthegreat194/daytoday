import { ableToCheckIn } from "../utils/checks";
import { requireUser } from "../utils/auth";
import { useEffect, useState } from "react";
import CheckinTasks from "../components/CheckinTasks";
import CheckinSubtasks from "../components/CheckinSubtasks";
import axios from "axios";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";

export default function (props) {
    const [tasks, setTasks] = useState([])
    const [subTasks, setSubTasks] = useState([])
    const [phase, setPhase] = useState(0);
    const router = useRouter();

    if (phase === 0) {
        return (
            <CheckinTasks 
                tasksState={{tasks, setTasks}} 
                increasePhase={() => setPhase(1)} 
            />
        );
    } else if (phase === 1) {
        return (
            <CheckinSubtasks 
                tasksState={{subTasks, setSubTasks}} 
                increasePhase={() => setPhase(2)} 
            />
        );
    } else {

        axios.post('/api/checkin', {
            userId: props.user.id,
            tasks: tasks,
            subTasks: subTasks
        })
            .then((res) => {
                console.log(res.data);
                router.push('/dashboard');
            })
            .catch(err => console.log(err.response.data));

        return (
            <div>
                <h1>Redirecting</h1>
            
                <h1>Tasks</h1>
                {tasks.map((task, i) => {
                    return (
                        <div key={i}>
                            <h2>{task.title}</h2>
                        </div>
                    )
                })}

                <br />

                <h1>Subtasks</h1>
                {subTasks.map((task, i) => {
                    return (
                        <div key={i}>
                            <h2>{task.title}</h2>
                        </div>
                    )
                })}

                <button onClick={() => setPhase(0)}>Reset</button>
            </div>
        );
    }
}


export async function getServerSideProps(context) {
    const props = await requireUser(context);

    const user = props.props.user;
    const valid = ableToCheckIn(user.lastLogin);
    // console.log(valid);

    if (!valid) {
        return {
            redirect: {
                permanent: false,
                destination: "/dashboard",
            },
            props:{},
        };
    }

    return props;
}