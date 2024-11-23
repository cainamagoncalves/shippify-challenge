import { TableCellSkeletonLoading } from '@/components/table-cell-skeleton-loading'
import { TableRow } from '@/components/ui/table'

export function DriverVehiclesTableLoading() {
  return Array.from({ length: 5 }).map((_, index) => {
    return (
      <TableRow key={String(index)}>
        <TableCellSkeletonLoading />
        <TableCellSkeletonLoading />
        <TableCellSkeletonLoading />
        <TableCellSkeletonLoading />
      </TableRow>
    )
  })
}
