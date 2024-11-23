import { House } from '@phosphor-icons/react'
import { useNavigate } from 'react-router'

import { Button } from '@/components/ui/button'

export function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-7xl font-extrabold">404</h1>
      <p className="text-lg">
        Oops, the page you trying to access does not exists.
      </p>
      <Button className="mt-6 rounded-[6px]" onClick={() => navigate('/')}>
        <House />
        Home
      </Button>
    </div>
  )
}
