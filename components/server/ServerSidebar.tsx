import { currentProfile } from '@/lib/current-user';
import { db } from '@/lib/db';
import { ChannelType } from '@/lib/generated/prisma/enums';
import { RedirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import ServerHeader from './ServerHeader';

interface ServerSidebarProps {
    serverId: string
}

const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
    const profile = await currentProfile()

    if (!profile) {
        return <RedirectToSignIn />;
    }
    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            Channels: {
                orderBy: {
                    createdAt: "asc"
                }
            },
            Members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: "asc"
                }
            }
        }
    })


    const textChannels = server?.Channels.filter(channel => channel.name === ChannelType.TEXT)
    const videoChannels = server?.Channels.filter(channel => channel.name === ChannelType.VIDEO)
    const audioChannels = server?.Channels.filter(channel => channel.name === ChannelType.AUDIO)
    const members = server?.Members.filter(member => member.profileId !== profile.id)
    if (!server) {
        return redirect("/");
    }
    const role = server.Members.find(member => member.profileId === profile.id)?.role
    if (!role) {
        return redirect("/");
    }
    return (
        <div className='flex flex-col h-full text-primary w-full dark:bg-[#252629] bg-[#f2f3f5]'>
            <ServerHeader server={server} role={role} />
        </div>
    )
}

export default ServerSidebar