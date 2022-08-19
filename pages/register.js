import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, password);

        const registerPost = axios.post('http://localhost:3000/api/register', {
            username,
            password,
            email
        });

        registerPost.then(res => {
            console.log(res);
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
        <div className="flex">
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <label>Username</label>
                <input type="text" onChange={(e) => setUsername(e.target.value)} />
                <label>Email</label>
                <input type="text" onChange={(e) => setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
                <input type="submit"></input>
            </form>
        </div>
    )
}