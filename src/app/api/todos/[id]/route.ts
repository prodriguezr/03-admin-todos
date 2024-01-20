import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';
import { NextResponse } from 'next/server';
import * as yup from 'yup';

interface Segments {
  params: {
    id: string;
  };
}

const getTodo = async (id: string): Promise<Todo | null> => {
  return await prisma.todo.findFirst({ where: { id } });
};

export async function GET(req: Request, { params }: Segments) {
  const id = params.id;

  const todo = await getTodo(id);

  if (!todo) {
    return NextResponse.json(
      {
        message: `Todo with id '${id}' is not found`,
      },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: todo });
}

const putSchema = yup.object({
  completed: yup.boolean().optional(),
  description: yup.string().optional(),
});

export async function PUT(req: Request, { params }: Segments) {
  const id = params.id;

  const todo = await getTodo(id);

  if (!todo) {
    return NextResponse.json(
      {
        message: `Todo with id '${id}' is not found`,
      },
      { status: 404 }
    );
  }

  try {
    const { completed, description } = await putSchema.validate(
      await req.json()
    );

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { completed, description },
    });

    return NextResponse.json({ data: updatedTodo });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
