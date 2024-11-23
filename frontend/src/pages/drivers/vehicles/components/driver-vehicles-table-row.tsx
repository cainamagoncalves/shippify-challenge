import { Vehicle } from '@/api/_types/vehicle'
import { TableCell, TableRow } from '@/components/ui/table'

interface DriverVehiclesTableRowProps {
  vehicle: Vehicle
}

export function DriverVehiclesTableRow({
  vehicle,
}: DriverVehiclesTableRowProps) {
  return (
    <TableRow>
      <TableCell>{vehicle.plate}</TableCell>
      <TableCell>{vehicle.model}</TableCell>
      <TableCell>{vehicle.type}</TableCell>
      <TableCell>{vehicle.capacity}</TableCell>
    </TableRow>
  )
}
