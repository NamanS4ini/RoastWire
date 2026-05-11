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
      <div>{children}</div>
  )
}

export default layout