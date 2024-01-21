import prisma from '@/lib/prisma';
import { NewTodo, TodosGrid } from '@/todos';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: "Todo's List",
  description: 'SEO Title',
};

export default async function ServerTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } });

  return (
    <>
      <span className='text-3xl mb-30'>Server Actions</span>
      <div>
        <div className='w-full px-3 mx-5 mb-5'>
          <NewTodo />
        </div>

        <TodosGrid todos={todos} />
      </div>
    </>
  );
}
