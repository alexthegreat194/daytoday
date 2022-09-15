
import { requireUser } from "../utils/auth";

const Dashboard = (props) => {
    return (
        <div>
            <h1>Dashboard</h1>
            <h1>{props.user.username}</h1>
        </div>
    )
}

export default Dashboard

export async function getServerSideProps(context) {return await requireUser(context);}

// const getServerSideProps = async (context) => requireUser(context);
// export { getServerSideProps };
