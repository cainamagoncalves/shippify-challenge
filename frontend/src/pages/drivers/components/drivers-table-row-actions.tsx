import { useNavigate } from 'react-router'

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

interface DriversTableRowActionsProps {
  driverId: number
}
export function DriversTableRowActions({
  driverId,
}: DriversTableRowActionsProps) {
  const navigate = useNavigate()

  return (
    <DropdownMenuContent className="rounded-xl">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        onClick={() => navigate(`/driver/${driverId}/vehicles`)}
        className="cursor-pointer rounded-[6px]"
      >
        View vehicles
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}
