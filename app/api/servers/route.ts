import { v4 as uuidv4 } from "uuid";
import { currentProfile } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { MemberRole } from "@/lib/generated/prisma/enums";

export async function POST(request: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { name, imageURL } = await request.json();
    if (!name || typeof name !== "string" || name.trim().length < 3) {
      return new NextResponse(
        "Invalid server name. It must be at least 3 characters long.",
        { status: 400 },
      );
    }
    const newServer = await db.server.create({
      data: {
        name: name.trim(),
        imageURL,
        inviteCode: uuidv4(),
        profileId: profile.id,
        Channels: {
          create: [
            {
              name: "general",
              profileId: profile.id,
            },
          ],
        },
        Members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.OWNER,
            },
          ],
        },
      },
    });
    return new NextResponse(JSON.stringify(newServer), { status: 201 });
  } catch (error) {
    console.log("[Server POST]: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
