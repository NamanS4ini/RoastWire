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

export const MembersModal = () => {
    const {onOpen, isOpen, onClose, type, data } = useModalStore()
    const isModalOpen = isOpen && type === "memebers"
    const { server } = data as {server : ServerWithMembersWithProfile}

    return (
        <div>
            <Dialog open={isModalOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle>Manage Members</DialogTitle>
                    </DialogHeader>
                    <DialogDescription
                    >
                        {server?.Members?.length} {server?.Members?.length < 2 ?"Member" : "Member"}
                    </DialogDescription>
                    
                </DialogContent>
            </Dialog>
        </div>
    )
}