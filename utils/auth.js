const bcrypt = require('bcrypt');
const axios = require('axios');
import prisma from './prisma';
import jwt from 'jsonwebtoken';
import Cookies from "cookies";


export const generateHash = async (password) => {
    return bcrypt.hash(password, 10);
}

export const compareHash = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
}

export const requireUser = async (context) => {
    const cookies = new Cookies(context.req);
    const token = cookies.get("token");

    const redirectReturn = {
        redirect: {
            permanent: false,
            destination: "/login",
        },
        props:{},
    };

    // console.log('found token:', token);
    if (!token) {
        return redirectReturn;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const foundUser = await prisma.user.findFirst({
            where: {
                id: decoded.id,
            },
            select: {
                id: true,
                username: true,
                email: true,
            },
        });

        if (!foundUser) {
            return redirectReturn;
        }

        return {
            props:{
                user: foundUser,
            },
        };

    } catch (error) {
        return redirectReturn
    }
}