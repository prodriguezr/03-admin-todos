'use server';

import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const sleep = async (seconds: number = 0): Promise<unknown> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const toggleTodo = async (
  id: string,
  completed: boolean
): Promise<Todo> => {
  await sleep(3);
  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) throw `Todo with id ${id} is not found`;

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { completed },
  });

  revalidatePath('/dashboard/server-todos');

  return updatedTodo;
};

export const createTodo = async (description: string) => {
  try {
    const todo = await prisma.todo.create({
      data: { description },
    });

    revalidatePath('/dashboard/server-todos');

    return todo;
  } catch (error) {
    return { message: 'Error creating todo' };
  }
};

export const deleteCompletedTodos = async (): Promise<void> => {
  await prisma.todo.deleteMany({ where: { completed: true } });

  revalidatePath('/dashboard/server-todos');

  return;
};
