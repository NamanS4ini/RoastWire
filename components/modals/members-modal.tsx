"use client"
import { ServerWithMembersWithProfile } from "@/types"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog"
import { useModalStore } from "@/hooks/use-modal-store"
import { ScrollArea } from "../ui/scroll-area"
import UserAvatar from "../user-avatar"

export const MembersModal = () => {
    const { onOpen, isOpen, onClose, type, data } = useModalStore()
    const isModalOpen = isOpen && type === "memebers"
    const { server } = data as { server: ServerWithMembersWithProfile }

    return (
        <div>
            <Dialog open={isModalOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle className="text-center">Manage Members</DialogTitle>
                        <DialogDescription
                            className="text-center text-zinc-300"
                        >
                            {server?.Members?.length} {server?.Members?.length < 2 ? "Member" : "Member"}
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="mt-8 max-h-105 pr-6">
                        {server?.Members.map((member) => (
                            <div key={member.id} className="flex items-center gap-x-2 mb-6">
                            <UserAvatar src={member.profile.imageURL} />
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">{member.profile.name}</span>
                                <span className="text-xs text-zinc-400">{member.role}</span>
                            </div>
                            </div>
                        ))}

                    </ScrollArea>

                </DialogContent>
            </Dialog>
        </div>
    )
}