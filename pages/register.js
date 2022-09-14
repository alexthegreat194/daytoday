import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import cookieCutter from "cookie-cutter";
import { TokenContext } from "./_app";

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