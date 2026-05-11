import ServerSidebar from '@/components/server/ServerSidebar'
import { currentProfile } from '@/lib/current-user'
import { db } from '@/lib/db'
import { RedirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

const layout = async ({ children, params }: { children: React.ReactNode, params: { id: string } }) => {
    const profile = await currentProfile()
    const id = (await params).id
if (!profile) {
    return <RedirectToSignIn />;
    }
    const server = await db.server.findUnique({
        where: {
            id: id,
            Members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })
    if (!server) {
        return redirect("/");
    }

  return (
      <div className="h-full">
          <div className='hidden md:flex h-full w-60 z-20 flex-col inset-y-0 fixed'>
              <ServerSidebar serverId={id} />
          </div>
          <main className='h-full md:pl-60'>
          {children}
          </main>
      </div>
  )
}

export default layout