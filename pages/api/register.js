import jwt from 'jsonwebtoken';

const register = (req, res) => {
    const { username, email, password } = req.body;
    
    if (req.method !== 'POST') {
        res.status(405).json({
            message: 'Method not allowed'
        });
    }
    
    if (username === '' || email === '' || password === '') {
        res.status(400).json({
            success: false,
            message: 'Please fill out all fields',
        });
    } else {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ 
            success: true,
            token,
        });
    }
}

export default register;