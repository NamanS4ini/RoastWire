import { currentProfile } from "@/lib/current-user";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InviteCodeProps {
  inviteCode: string;
}

export default async function InviteCode(params: InviteCodeProps) {
  const profile = await currentProfile();
  const { inviteCode } = await params;

  if (!profile) {
    return <RedirectToSignIn />;
  }
  if (!inviteCode) {
    return redirect("/");
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: inviteCode,
      Members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode: inviteCode,
    },
    data: {
      Members: {
        create:[ {
          profileId: profile.id,
          role: "MEMBER"
        }],
      },
    },
  });

  if(server) {
    return redirect(`/servers/${server.id}`);
  }
  
  return null;
}
