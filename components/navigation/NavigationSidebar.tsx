import { currentProfile } from '@/lib/current-user'
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import NavigationAction from './NavigationAction';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import NavigationItem from './NavigationItem';
import { ModeToggle } from '../ui/themeButton';
import { UserButton } from '@clerk/nextjs';

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
      <ScrollArea className='w-full flex-1'>
        {
          server.map((server) => (
            <div key={server.id} className='w-full h-12 rounded-md flex items-center justify-center text-sm font-medium mt-5 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors'>
              <NavigationItem id={server.id} name={server.name} imageURL={server.imageURL} />
            </div>
          ))
        }
      </ScrollArea>
      <div className='pb-3 mt-auto  flex items-center flex-col gap-y-4'>
        <ModeToggle />
        <UserButton afterSwitchSessionUrl='/'
          appearance={{
              elements: {
                avatarBox: "h-[48px] w-[48px]"
              }
            }}
        />
      </div>

    </div>
  )
}

export default NavigationSidebar