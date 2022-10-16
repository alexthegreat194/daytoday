import prisma from '../../../utils/prisma'

export default async (req, res) => {
    if (req.method != 'POST') {
        return res.status(405).json({
            message: 'Method not allowed'
        })
    }

    const { taskId, userId, completed } = req.body;

    if (!taskId || !userId || completed === undefined) {
        console.log(req.body)
        return res.status(400).json({
            message: 'Missing body parameters'
        })
    }

    const task = await prisma.task.findFirst({
        where: {
            id: taskId,
            userId: userId
        }
    });

    if (!task) {
        return res.status(402).json({
            message: "Task does not exist"
        });
    }
    
    const updatedTask = await prisma.task.update({
        where: {
            id: taskId,
        },
        data: {
            completed: completed
        }
    });


    return res.status(200).json({
        message: "Updated task",
        task: updatedTask
    });
};