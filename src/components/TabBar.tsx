'use client';

import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar = ({ tabOptions = [1, 2, 3], currentTab = 1 }: Props) => {
  const [selected, setSelected] = useState(currentTab);

  const router = useRouter();

  const onToggleSelected = (tab: number) => {
    setSelected(tab);

    setCookie('selectedTab', tab.toString());

    router.refresh();
  };

  return (
    <div
      className={`grid w-full space-x-2 rounded-xl bg-gray-200 p-2 ${
        'grid-cols-' + tabOptions.length.toString()
      }`}
    >
      {tabOptions.map((element) => (
        <div key={element.toString()}>
          <input
            type='radio'
            checked={selected === element}
            onChange={() => {}}
            id={element.toString()}
            className='peer hidden'
          />
          <label
            onClick={() => onToggleSelected(element)}
            className='transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'
          >
            {element}
          </label>
        </div>
      ))}
    </div>
  );
};
