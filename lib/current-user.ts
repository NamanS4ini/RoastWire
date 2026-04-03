import { auth } from "@clerk/nextjs/server";
import { db } from "./db";


export const currentProfile = async () => {
    const { userId } = await auth();
    if (!userId) return null;
    return await db.profile.findUnique({
        where: {
            userId
        }
    });
}