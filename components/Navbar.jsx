import Link from "next/link";
import cookieCutter from "cookie-cutter";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TokenContext } from "../pages/_app";
import toast from "react-hot-toast";
import { getCookie, deleteCookie } from "cookies-next";

const Navbar = () => {

    const [token, setToken] = useContext(TokenContext);
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(token));
    
    useEffect(() => {
        console.log("token has changed:", token);

        //get user info
        axios.get('/api/user')
            .then((res) => {
                setUser(res.data.user)
                // toast('found user data');
                setIsLoggedIn(true);
            })
            .catch((err) => {
                console.log(err);
                setIsLoggedIn(false);
            })
    }, [token]);

    const logout = () => {
        deleteCookie('token');
        setToken(null);
        setIsLoggedIn(false);
        setUser(null);
        toast('logged out');
    }

    const rightNav = () => {
        if (isLoggedIn) {
            return (
                <>
                    <h1>{user.username}</h1>
                    <button onClick={logout}>Logout</button>
                </>
            );
        } else {
            return (
                <>
                    <Link href="/login">
                        <a>Login</a>
                    </Link>
                    <Link href="/register">
                        <a>Register</a>
                    </Link>
                </>
            );
        }
    };

    return (
        <div className="flex justify-between p-3 px-4 bg-gray-50">
            <div className="flex gap-4 items-center px-2">
                <h1 className="font-bold text-2xl">
                    <span className="text-red-500">Day</span>
                    <span className="">To</span>
                    <span className="text-blue-500">Day</span>
                </h1>
                <Link href="/" className="font-bold">Home</Link>
                <Link href="/secondary" className="font-bold">Secondary</Link>
                <Link href="/locked" className="font-bold">Locked</Link>
            </div>
            <div className="flex gap-4 items-center px-2">
                {rightNav()}
            </div>
        </div>
    )
}

export default Navbar;