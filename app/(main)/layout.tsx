import NavigationSidebar from '@/components/navigation/NavigationSidebar'
import React from 'react'

const layout = async({children}: { children: React.ReactNode }) => {
  return (
      <div className='h-full'>
          <div className='hidden md:flex h-full w-18 z-30 flex-col fixed inset-y-0'>
              
          </div>
          <NavigationSidebar />
          <main className="md:pl-18 h-full">
          {children}
          </main>
      </div>
  )
}

export default layout