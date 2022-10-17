import prisma  from "../../utils/prisma";
import jwt from 'jsonwebtoken';
import Cookies from "cookies";

const user = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({
            message: 'Method not allowed'
        });
    }

    const cookies = new Cookies(req, res);
    const token = cookies.get("token");

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Please login',
        });
    }

    await jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: 'Please login',
            });
        }
        
        // console.log(decoded);
        const foundUser = await prisma.user.findFirst({
            where: {
                id: decoded.id,
            },
            select: {
                id: true,
                username: true,
                email: true,
                lastLogin: true
            },
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: 'Error finding user',
            });
        });
        // console.log(foundUser);

        if (!foundUser) {
            return res.status(400).json({
                message: 'User not found'
            });
        }

        return res.json({
            success: true,
            user: foundUser,
        });
    });
}

export default user;