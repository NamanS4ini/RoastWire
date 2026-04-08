import { Plus } from 'lucide-react'
import ActionTooltips from '../ActionTooltips'
import { ModeToggle } from '../ui/themeButton'
const NavigationAction = () => {
    return (
        <div className='flex flex-col items-center h-full'>
            <ActionTooltips label='Add a Server' side='right' align='center'>
                <button className='group flex items-center cursor-pointer'>
                    <div className='flex mx-3 h-12 w-12 rounded-[24px] group-hover:rounded-xl transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500 dark:group-hover:bg-emerald-500'>
                        < Plus className='group-hover:text-white transition text-emerald-500' size={25} />
                    </div>
                </button>
            </ActionTooltips>






            
            <button className='pt-5'>
                <ModeToggle />
            </button>
        </div>
    )
}

export default NavigationAction