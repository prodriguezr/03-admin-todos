import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import * as yup from 'yup';

export async function GET({ url }: Request) {
  const { searchParams } = new URL(url);
  const take = Number(searchParams.get('take') ?? '10');
  const skip = Number(searchParams.get('skip') ?? '0');

  if (isNaN(+take)) {
    return NextResponse.json(
      { message: 'take must be a number' },
      { status: 400 }
    );
  }

  if (isNaN(+skip)) {
    return NextResponse.json(
      { message: 'skip must be a number' },
      { status: 400 }
    );
  }

  const data = await prisma.todo.findMany({ take, skip });

  return NextResponse.json({
    data,
    count: data.length,
  });
}

const postSchema = yup.object({
  description: yup.string().required(),
  completed: yup.boolean().optional().default(false),
});

export async function POST(req: Request) {
  try {
    const { completed, description } = await postSchema.validate(
      await req.json()
    );

    const todo = await prisma.todo.create({
      data: { completed, description },
    });

    return NextResponse.json({ data: todo });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    await prisma.todo.deleteMany({ where: { completed: true } });

    return NextResponse.json({
      message: "Todo's completed deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
