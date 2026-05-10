"use client"
import React from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import ActionTooltips from '../ActionTooltips'

interface NavigationItemProps {
    id: string
    name: string
    imageURL: string
}

const NavigationItem = ({ id, name, imageURL }: NavigationItemProps) => {
    const params = useParams();
    const router = useRouter();
    return (
        <ActionTooltips label={name} side='right' align='center'>
            <button className='relative group cursor-pointer'
                onClick={() => {
                    router.push(`/servers/${id}`)
                }}
            >
                <div className={cn('absolute left-0 top-1/2 -translate-y-1/2 bg-primary rounded-r-full transition-all w-1',
                    params?.id !== id && 'group-hover:h-5',
                    params?.id === id ? 'h-9' : 'h-2'
                )} />
                <div className={cn('relative group flex mx-3 h-12 w-12 rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden',
                    params?.id === id && 'bg-primary/10 text-primary rounded-[16px]',
                )}>
                    <Image src={imageURL} alt={name} fill sizes="90%" />
                </div>
            </button>
        </ActionTooltips>
    )
}

export default NavigationItem
