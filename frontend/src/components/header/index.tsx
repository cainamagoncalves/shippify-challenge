import { Link, useLocation, useNavigate } from 'react-router'

export function Header() {
  const navigate = useNavigate()

  const location = useLocation()

  const isActivePageHome = location.pathname === '/'
  const isActivePageDrivers = location.pathname === '/drivers'

  return (
    <div className="w-full flex justify-between py-12">
      <span
        className="cursor-pointer font-extrabold hover:opacity-90 transition-all"
        onClick={() => navigate('/')}
      >
        Shippify
      </span>

      <div className="flex items-center gap-3">
        <Link
          to="/"
          data-active={isActivePageHome}
          className="transition-all data-[active=true]:after:block data-[active=true]:after:bg-primary data-[active=true]:after:w-full data-[active=true]:after:content-[''] after:h-[0.5px] opacity-80 data-[active=true]:opacity-100 hover:opacity-90"
        >
          Home
        </Link>
        <Link
          to="/drivers"
          data-active={isActivePageDrivers}
          className="transition-all data-[active=true]:after:block data-[active=true]:after:bg-primary data-[active=true]:after:w-full data-[active=true]:after:content-[''] after:h-[0.5px] opacity-80 data-[active=true]:opacity-100 hover:opacity-90"
        >
          Drivers
        </Link>
      </div>
    </div>
  )
}
