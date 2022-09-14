import { getCookie } from "cookies-next";
import Cookies from "cookies";
import { useRouter } from "next/router";
import { requireUser } from "../utils/auth";


const locked = (props) => {
    return (
        <div>
            <h1>Locked</h1>
            <h1>{props.user.username}</h1>
        </div>
    )
}

export default locked;

// make sure that the user has a token before they can access the page
// if they do not have a token, redirect them to the login page
// if they do have a token, render the page


export async function getServerSideProps(context) {return requireUser(context);}