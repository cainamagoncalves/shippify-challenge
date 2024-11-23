import { TableCellSkeletonLoading } from '@/components/table-cell-skeleton-loading'
import { TableRow } from '@/components/ui/table'

export function DriversTableLoading() {
  return Array.from({ length: 5 }).map((_, index) => {
    return (
      <TableRow key={String(index)}>
        <TableCellSkeletonLoading className="rounded-full size-6" />
        <TableCellSkeletonLoading />
        <TableCellSkeletonLoading />
        <TableCellSkeletonLoading />
        <TableCellSkeletonLoading />
        <TableCellSkeletonLoading />
        <TableCellSkeletonLoading />
      </TableRow>
    )
  })
}
