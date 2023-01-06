import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import cookieCutter from "cookie-cutter";
import { TokenContext } from "./_app";
import { useRouter } from "next/router";
import Link from "next/link";

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
            router.push('/dashboard');
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
        <div className="flex w-full h-[80vh] justify-center items-center">
            <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                <h1 className='text-4xl font-bold self-center'>Login</h1>

                <div className="flex flex-col gap-5">
                    <div className="flex flex-col">
                        <label className="text-lg font-light">Username/Email</label>
                        <input className="bg-gray-100 text-xl px-3 py-2 w-[500px] shadow-inner rounded-md" type="text" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg font-light">Password</label>
                        <input className="bg-gray-100 text-xl px-3 py-2 w-[500px] shadow-inner rounded-md" type="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div> 
                
                <div className="flex content-center gap-5">
                    <input className="text-white text-lg py-1 px-6 bg-red-500 rounded-lg hover:cursor-pointer" type="submit" value={"Login"}/>
                    <Link className="text-red-500 text-lg " href="/register">
                        <a className="text-red-500 text-lg align-middle text-center ">Don&apos;t have an account?</a>
                    </Link>
                </div>
                
            </form>
        </div>
    )
}