import { ableToCheckIn } from "../utils/checks";
import { requireUser } from "../utils/auth";

const Checkin = () => {

    return (
        <div>
            <h1>Checkin</h1>
        </div>
    )
}

export default Checkin;

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