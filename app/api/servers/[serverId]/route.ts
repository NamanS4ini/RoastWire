import { currentProfile } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    params = await params;
    const body = await req.json();
    const { name, imageURL } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageURL,
      },
    });

    return new NextResponse(JSON.stringify(server), { status: 200 });
  } catch (error) {
    console.error("Error updating server:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}