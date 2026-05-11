import { Server, Member, Profile } from "./lib/generated/prisma/browser";
export type ServerWithMembersWithProfile = Server & {
  Members: (Member & {
    profile: Profile;
  })[];
};
