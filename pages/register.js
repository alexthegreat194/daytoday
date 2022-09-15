import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import cookieCutter from "cookie-cutter";
import { TokenContext } from "./_app";
import Link from "next/link";

export default function Register() {

    const [token, setToken] = useContext(TokenContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, password);

        const registerPost = axios.post('/api/register', {
            username,
            password,
            email
        });

        registerPost.then(res => {
            console.log(res);
            cookieCutter.set('token', res.data.token);
            setToken(res.data.token);
        })
        .catch(err => {
            console.log(err);
        });
        
        toast.promise(registerPost, {
            loading: 'Creating Account...',
            success: (res) => `Account created!: ${res.data.token}`,
            error: (err) => `${err.response.data.message}`,
        });
    }

    return (
        <div className="flex w-full h-[80vh] justify-center items-center">
            <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                <h1 className='text-4xl font-bold self-center'>Register</h1>
                
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col">
                        <label className="text-lg font-light">Username</label>
                        <input className="bg-gray-100 text-xl px-3 py-2 w-[500px] shadow-inner rounded-md"  type="text" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg font-light">Email</label>
                        <input className="bg-gray-100 text-xl px-3 py-2 w-[500px] shadow-inner rounded-md" type="text" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="flex flex-col"> 
                        <label className="text-lg font-light">Password</label>
                        <input className="bg-gray-100 text-xl px-3 py-2 w-[500px] shadow-inner rounded-md" type="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                
                <div className="flex content-center gap-5">
                    <input className="text-white text-lg py-1 px-6 bg-red-500 rounded-lg hover:cursor-pointer" type="submit" value={"Register"}/>
                    <Link className="text-red-500 text-lg " href="/register">
                        <a className="text-red-500 text-lg align-middle text-center ">Already have an account?</a>
                    </Link>
                </div>
            </form>
        </div>
    )
}