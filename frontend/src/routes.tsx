import { createBrowserRouter } from 'react-router'

import { AppLayout } from './pages/_layouts/app'
import { NotFound } from './pages/404'
import { Drivers } from './pages/drivers'
import { DriverVehicles } from './pages/drivers/vehicles'
import { Home } from './pages/home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/drivers', element: <Drivers /> },
      { path: '/driver/:driverId/vehicles', element: <DriverVehicles /> },
    ],
  },
])
