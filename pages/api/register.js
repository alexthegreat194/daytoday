import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import jwt from 'jsonwebtoken';
import prisma from '../../utils/prisma';
import bcrypt from 'bcrypt';

const register = async (req, res) => {
    const { username, email, password } = req.body;
    // console.log(username, email, password);
    
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

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: passwordHash,
        }
    })
    .then(user => {
        const token = jwt.sign({ 
            username,
            id: user.id, 
        }, process.env.JWT_SECRET, { expiresIn: '10h' });
        res.json({ 
            success: true,
            token,
        });
    })
    .catch(err => {
        console.log(err);
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