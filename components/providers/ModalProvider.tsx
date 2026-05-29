"use client"
import { useEffect, useState } from 'react'
import { CreateServerModal } from '../modals/create-server-modal'
import { InviteModal } from '../modals/invite-modal'
import { Edit } from 'lucide-react'
import { EditServerModal } from '../modals/edit-server-modal'
const ModalProvider = () => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])
    if (!mounted) {
        return null
    }
    return (
        <>
            <CreateServerModal />
        <InviteModal />
        <EditServerModal />
        </>
    )
}

export default ModalProvider