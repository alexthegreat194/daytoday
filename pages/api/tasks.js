
import prisma from "../../utils/prisma";

const post = async (req, res) => {
    const { title, userId, isSubtask } = req.body;

    if (!title || !userId || isSubtask === undefined) {
        return res.status(400).json({
            message: "Missing body parameters"
        });
    }

    const task = await prisma.task.create({
        data: {
            title,
            userId,
            isSubtask,
        },
    });

    res.json(task);
};

const get = async (req, res) => {
    const { userId } = req.query;
    // console.log("Body: ", req.query);

    if (!userId) {
        return res.status(400).json({
            message: 'Missing userId',
        });
    }

    const tasks = await prisma.task.findMany({
        where: {
            userId
        },
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            message: 'Error finding tasks',
        });
    });

    return res.json(tasks);
};

export default async (req, res) => {
    if (req.method === 'POST') {
        return await post(req, res);
    }
    if (req.method === 'GET') {
        return await get(req, res);
    }
    return res.status(405).json({
        message: 'Method not allowed'
    });
}