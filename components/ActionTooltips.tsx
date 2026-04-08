"use client"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

interface ActionTooltipProps {
    label: string,
    children: React.ReactNode
    side?: "top" | "bottom" | "left" | "right",
    align?: "start" | "center" | "end"
}

const ActionTooltips = ({ label, children, side, align }: ActionTooltipProps) => {
    return (

        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align}>
                    <p>{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default ActionTooltips