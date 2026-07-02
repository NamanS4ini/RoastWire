import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { cn } from '@/lib/utils'

interface UserAvaterProps {
  src?: string
  className?: string
}

const UserAvatar = ({
  src,
  className
}: UserAvaterProps) => {
    return (
        <>
            <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
                <AvatarImage src={src} alt="User Avatar" />
            </Avatar>
        </>
  )
}

export default UserAvatar