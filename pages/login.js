import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, password);

        const loginPost = axios.post('http://localhost:3000/api/login', {
            username,
            password
        });

        loginPost.then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
        
        toast.promise(loginPost, {
            loading: 'Logging in...',
            success: (res) => `Logged in: ${res.data.token}`,
            error: 'Error logging in',
        });
    }

    return (
        <div className="flex">
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <label>Username/Email</label>
                <input type="text" onChange={(e) => setUsername(e.target.value)} />
                <label>Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
                <input type="submit"></input>
            </form>
        </div>
    )
}