import { db } from '@/lib/db'
import { getProfile } from '@/lib/profile'
import { redirect } from 'next/navigation'
import { UserButton, SignOutButton } from '@clerk/nextjs'
import { InitialModal } from '@/components/modals/InitialModal'
import { ModeToggle } from '@/components/ui/themeButton'

const SetupPage = async () => {
  const profile = await getProfile()
  const server = await db.server.findFirst({
    where: {
      Members: {
        some: {
          profileId: profile.id,
        }
      }
    }
  })

  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return (
    <>
      <InitialModal />
    </>
  )
}

export default SetupPage