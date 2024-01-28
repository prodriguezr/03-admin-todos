import { TabBar } from '@/components';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: "Cookie's Page",
  description: 'SEO Title',
};

export default function CookiesPage() {
  const cookiesStore = cookies();
  const currentTab = Number(cookiesStore.get('selectedTab')?.value ?? '1');

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
      <div className='flex flex-col'>
        <span className='text-3xl mb-4'>Tabs</span>
        <TabBar tabOptions={[1, 2, 3, 4, 5]} currentTab={currentTab} />
      </div>
    </div>
  );
}
