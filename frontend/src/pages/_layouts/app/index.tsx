import { Outlet } from 'react-router'

import { Header } from '@/components/header'

export function AppLayout() {
  return (
    <div className="px-4 max-w-[1180px] w-full mx-auto flex flex-col">
      <Header />
      <div className="max-w-[980px] w-full m-auto">
        <Outlet />
      </div>
    </div>
  )
}
