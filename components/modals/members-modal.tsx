"use client";
import { ServerWithMembersWithProfile } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useModalStore } from "@/hooks/use-modal-store";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../user-avatar";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useState } from "react";

const roleIconMap = {
  MEMBER: null,
  ADMIN: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  OWNER: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-green-500" />,
};

export const MembersModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModalStore();

  const [loadingId, setLoadingId] = useState<string>("");

  const isModalOpen = isOpen && type === "memebers";
  const { server } = data;

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle className="text-center">Manage Members</DialogTitle>
            <DialogDescription className="text-center text-zinc-300">
              {server?.Members?.length}{" "}
              {server?.Members?.length < 2 ? "Member" : "Members"}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="mt-8 max-h-105 pr-6">
            {server?.Members?.map((member) => (
              <div key={member.id} className="flex items-center gap-x-2 mb-6">
                <UserAvatar src={member.profile.imageURL} />
                <div className="flex flex-col">
                  <span className="text-sm flex text-center font-semibold">
                    {member.profile.name == "null null"
                      ? member.profile.email
                      : member.profile.name}
                    {roleIconMap[member.role]}
                  </span>
                  <span className="text-xs text-zinc-400">
                    {member.profile.email}
                  </span>
                </div>
                {server.profileId != member.profileId &&
                  loadingId != member.id && <div className="ml-auto text-sm text-zinc-400 cursor-pointer hover:text-zinc-200 transition">
                    Actions
                  </div>}
              </div>
            ))}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};
