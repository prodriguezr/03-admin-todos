'use client';

import { Todo } from '@prisma/client';

import styles from './TodoItem.module.css';
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';
import { startTransition, useOptimistic } from 'react';

interface Props {
  todo: Todo;
  // TODO: Acciones que quiero llamar
  toggleTodo: (id: string, completed: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  const [todoOp, toggleOp] = useOptimistic(
    todo,
    (state, newCompletedValue: boolean) => ({
      ...state,
      completed: newCompletedValue,
    })
  );

  const onToggleTodo = async () => {
    try {
      startTransition(() => toggleOp(!todoOp.completed));
      await toggleTodo(todoOp.id, !todoOp.completed);
    } catch (error) {
      startTransition(() => toggleOp(!todoOp.completed));
    }
  };

  return (
    <div className={todoOp.completed ? styles.todoDone : styles.todoPending}>
      <div className='flex flex-col sm:flex-row justify-start items-center gap-4'>
        <div
          //onClick={() => toggleTodo(todo.id, !todo.completed)}
          onClick={onToggleTodo}
          className={`
            flex p-2 rounded-md cursor-pointer
            hover:bg-opacity-60
            ${todoOp.completed ? 'bg-blue-100' : 'bg-red-100'}
          `}
        >
          {todoOp.completed ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>

        <div className='text-center sm:text-left'>{todoOp.description}</div>
      </div>
    </div>
  );
};
