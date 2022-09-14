import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import cookieCutter from "cookie-cutter";
import { TokenContext } from "./_app";
import { useRouter } from "next/router";

export default function Login() {

    const [token, setToken] = useContext(TokenContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, password);

        const loginPost = axios.post('/api/login', {
            username,
            password
        });

        loginPost.then(res => {
            console.log(res);
            cookieCutter.set('token', res.data.token);
            setToken(res.data.token);
            router.push('/');
        })
        .catch(err => {
            console.log(err);
        });
        
        toast.promise(loginPost, {
            loading: 'logging in...',
            success: (res) => `logged in!`,
            error: (err) => `${err.response.data.message}`,
        });
    }

    return (
        <div className="flex">
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <label className="">Username/Email</label>
                <input type="text" onChange={(e) => setUsername(e.target.value)} />
                <label>Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
                <input type="submit"></input>
            </form>
        </div>
    )
}