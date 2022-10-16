import prisma from '../../../utils/prisma'

export default async (req, res) => {
    if (req.method != 'POST') {
        return res.status(405).json({
            message: 'Method not allowed'
        })
    }

    const { taskId, userId } = req.body;

    if (!taskId || !userId) {
        return res.status(401).json({
            message: 'No TaskId or UserId'
        })
    }

    const task = await prisma.task.findFirst({
        where: {
            id: taskId
        }
    });

    if (task.userId != userId) {
        return res.status(402).json({
            message: "User does not own Task"
        });
    }

    const deletedTask = await prisma.task.delete({
        where: {
            id: taskId
        }
    });

    return res.status(200).json({
        message: "Deleted task",
        task: deletedTask
    });
};