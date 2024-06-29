import { Request, Response } from 'express';
import prisma from '../models';

export const createTask = async (req: Request, res: Response) => {
  const { title, description, status } = req.body;
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  const task = await prisma.task.create({
    data: {
      title,
      description,
      status,
      userId,
    },
  });
  res.status(201).json(task);
};

export const getTasks = async (req: Request, res: Response) => {
  const { search, status, sort, page = 1, limit = 10 } = req.query;
  const userId = req.user?.userId;
  const pageNumber = parseInt(page as string, 10);
  const pageSize = parseInt(limit as string, 10);

  const tasks = await prisma.task.findMany({
    where: {
      userId,
      AND: [
        search
          ? { title: { contains: search as string, mode: 'insensitive' } }
          : {},
        status ? { status: status as string } : {},
      ],
    },
    orderBy: sort ? { status: sort as 'asc' | 'desc' } : undefined,
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
  });

  const totalTasks = await prisma.task.count({
    where: {
      userId,
      AND: [
        search
          ? { title: { contains: search as string, mode: 'insensitive' } }
          : {},
        status ? { status: status as string } : {},
      ],
    },
  });

  res.json({
    tasks,
    totalTasks,
    totalPages: Math.ceil(totalTasks / pageSize),
    currentPage: pageNumber,
  });
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const task = await prisma.task.update({
    where: { id: parseInt(id) },
    data: { title, description, status },
  });
  res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.task.delete({ where: { id: parseInt(id) } });
  res.sendStatus(204);
};
