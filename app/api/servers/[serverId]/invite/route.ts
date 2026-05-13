import { currentProfile } from "@/lib/current-user";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ serverId: string }> },
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { serverId } = await params;
    if (!serverId || typeof serverId !== "string") {
      return new NextResponse("Invalid server ID", { status: 400 });
    }
    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });
    if (!server) {
      return new NextResponse(
        "Server not found or you don't have permission to update it",
        { status: 404 },
      );
    }
    return new NextResponse(JSON.stringify(server), { status: 200 });
  } catch (error) {
    console.log("[Server Invite PATCH]: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
