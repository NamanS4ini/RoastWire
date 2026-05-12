"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog"
import { useModalStore } from "@/hooks/use-modal-store"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Copy, CopyCheck, RefreshCcw } from "lucide-react"
import { useOrigin } from "@/hooks/use-origin"
import { useState } from "react"
import axios from "axios"

export const InviteModal = () => {
    const {onOpen, isOpen, onClose, type, data } = useModalStore()
    const origin = useOrigin()
    const isModalOpen = isOpen && type === "invite"
    const { server } = data

    const inviteURL = `${origin}/invite/${server?.inviteCode}`
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(inviteURL)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const onNew = async () => {
        setIsLoading(true)
        try {
            const res = await axios.patch(`/api/servers/${server?.id}/invite`)
            onOpen("invite", {server: res.data})
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div>
            <Dialog open={isModalOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle>Invite People</DialogTitle>
                    </DialogHeader>
                    <div className="p-6">
                        <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-300">
                            Invite Link
                        </Label>
                        <div className="flex items-center mt-2 gap-x-2">
                            <Input
                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-primary focus-visible:ring-offset-0"
                                value={inviteURL}
                                readOnly
                            />
                            <Button onClick={handleCopy} size="icon" className="cursor-pointer" variant={"outline"}>
                                {copied ? (
                                    <CopyCheck className="h-4 w-4" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        <Button variant="secondary" size={"sm"} className="w-full cursor-pointer mt-4" onClick={onNew} disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <RefreshCcw className="ml-2 h-4 w-4 animate-spin" />
                                </>
                            ) : (
                                <>
                                    Generate New Link
                                    <RefreshCcw className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}