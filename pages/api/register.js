import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import jwt from 'jsonwebtoken';
import prisma from '../../utils/prisma';

const register = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    
    if (req.method !== 'POST') {
        return res.status(405).json({
            message: 'Method not allowed'
        });
    }
    
    if (username === '' || email === '' || password === '') {
        return res.status(400).json({
            success: false,
            message: 'Please fill out all fields',
        });
    }

    const user = await prisma.user.create({
        data: {
            username,
            email,
            password,
        }
    })
    .then(user => {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ 
            success: true,
            token,
        });
    })
    .catch(err => {
        // console.table(err);
        if (err.code == 'P2002') {
            res.status(400).json({
                success: false,
                message: `${err.meta.target[0]} already exists`,
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Error creating user',
            });
        }
    });

}

export default register;