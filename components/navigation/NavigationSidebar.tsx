import { currentProfile } from '@/lib/current-user'
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import NavigationAction from './NavigationAction';
import { Separator } from '../ui/separator';

const NavigationSidebar = async () => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect('/');
  }
  const server = await db.server.findMany({
    where: {
      Members: {
        some: {
          profileId: profile.id,
        }
      },
    },
  });
  return (
    <div className='space-y-4 flex flex-col items-center h-full text-primary dark:bg-[#1E1F22] py-3'>
      <NavigationAction />
      <Separator className='h-0.5 bg-zinc-300 dark:bg-zinc-700 rounded-md w-10!' />
      {server.map((server) => (
        <div key={server.id} className='relative group flex items-center cursor-pointer'>
        </div>
      ))}

    </div>
  )
}

export default NavigationSidebar