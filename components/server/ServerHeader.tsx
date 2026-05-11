import { MemberRole } from '@/lib/generated/prisma/enums';
import { ServerWithMembersWithProfile } from '@/types';
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from 'lucide-react';

interface ServerHeaderProps {
    server: ServerWithMembersWithProfile;
    role: MemberRole;
}

const ServerHeader = ({ server, role }: ServerHeaderProps) => {
    const isOwner = role === MemberRole.OWNER
    const isAdmin = isOwner || role === MemberRole.ADMIN
    const isModerator = isAdmin || role === MemberRole.MODERATOR
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className='focus:outline-none' asChild>
                <button className='w-full text-lg font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition'>
                    {server.name}
                    <ChevronDown className='h-5 w-5 ml-auto' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className='w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-0.5'>
                {isModerator && (
                    <DropdownMenuItem
                        className='text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer'>
                        Invite People
                        <UserPlus className='h-4 w-4 ml-auto text-indigo-600 dark:text-indigo-400' />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem
                        className=' px-3 py-2 text-sm cursor-pointer'>
                        Server Settings
                        <Settings className='h-4 w-4 ml-auto' />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem
                        className=' px-3 py-2 text-sm cursor-pointer'>
                        Manage Members
                        <Users className='h-4 w-4 ml-auto' />
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuItem
                        className=' px-3 py-2 text-sm cursor-pointer'>
                        Create Channel
                        <PlusCircle className='h-4 w-4 ml-auto' />
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuSeparator />
                )}
                {isOwner && (
                    <DropdownMenuItem
                        className='group px-3 py-2 text-sm cursor-pointer text-red-600 dark:text-red-400 transition-colors duration-150 hover:bg-red-600! hover:text-white! focus:bg-red-600! focus:text-white!'>
                        Delete Server
                        <Trash className='h-4 w-4 ml-auto text-red-500 group-hover:text-white group-focus:text-white' />
                    </DropdownMenuItem>
                )}
                {!isOwner && (
                    <DropdownMenuItem
                        className='group px-3 py-2 text-sm cursor-pointer text-red-600 dark:text-red-400 transition-colors duration-150 hover:bg-red-600! hover:text-white! focus:bg-red-600! focus:text-white!'>
                        Leave Server
                        <LogOut className='h-4 w-4 ml-auto text-red-500 group-hover:text-white group-focus:text-white' />
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ServerHeader