import { currentProfile } from '@/lib/current-user'
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { db } from '@/lib/db';
import NavigationAction from './NavigationAction';

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
    <div className='space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3'>
      <NavigationAction />
    </div>
  )
}

export default NavigationSidebar