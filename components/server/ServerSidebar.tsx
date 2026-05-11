import { currentProfile } from '@/lib/current-user';
import { db } from '@/lib/db';
import { RedirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

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


    

    if (!server) {
        return redirect("/");
    }
    return (
        <div>ServerSidebar</div>
    )
}

export default ServerSidebar