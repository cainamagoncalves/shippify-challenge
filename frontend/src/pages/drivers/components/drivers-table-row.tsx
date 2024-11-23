import { DotsThree } from '@phosphor-icons/react'

import { Driver } from '@/api/_types/driver'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TableCell, TableRow } from '@/components/ui/table'

import { DriversTableRowActions } from './drivers-table-row-actions'

interface DriversTableRowProps {
  driver: Driver
}

function getNameInitials(name: string) {
  return name
    .split(' ')
    .map((word) => {
      return word.charAt(0)
    })
    .join('')
}

export function DriversTableRow({ driver }: DriversTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <Avatar className="size-8">
          <AvatarImage src={driver.avatarUrl ?? ''} />
          <AvatarFallback className="text-xs">
            {getNameInitials(`${driver.firstName} ${driver.lastName ?? ''}`)}
          </AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell>{driver.companyId}</TableCell>
      <TableCell>{driver.firstName}</TableCell>
      <TableCell>{driver.phone}</TableCell>
      <TableCell>{driver.email}</TableCell>
      <TableCell>{driver.status}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-[6px]">
              <DotsThree size={32} />
            </Button>
          </DropdownMenuTrigger>
          <DriversTableRowActions driverId={driver.id} />
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
