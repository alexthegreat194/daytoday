import prisma from '../../utils/prisma';

export default async (req, res) => {
    if (req.method != 'POST') {
        return res.status(405).json({
            message: 'Method not allowed'
        })
    }

    const { userId, tasks, subTasks } = req.body;

    if (!userId || !tasks || !subTasks) {
        return res.status(401).json({
            message: 'Missing body parameters'
        })
    }

    const formattedTasks = tasks.map((task) => {
        return {
            title: task.title,
            priority: task.priority,
            userId: userId,
            isSubtask: false
        }
    });

    const formattedSubTasks = subTasks.map((task) => {
        return {
            title: task.title,
            priority: task.priority,
            userId: userId,
            isSubtask: true
        }
    });

    const createdTasks = await prisma.task.createMany({
        data: formattedTasks
    });

    const createdSubTasks = await prisma.task.createMany({
        data: formattedSubTasks
    });

    console.log(createdTasks, createdSubTasks);

    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            lastLogin: new Date(Date.now())
        }
    });

    return res.status(200).json({
        message: "Created tasks",
        tasks: createdTasks,
        subTasks: createdSubTasks,
        user
    });
}