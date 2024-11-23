import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

import { Skeleton } from './ui/skeleton'
import { TableCell } from './ui/table'
export function TableCellSkeletonLoading({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <TableCell>
      <Skeleton
        className={cn('bg-zinc-700 h-4 rounded-[6px]', className)}
        {...rest}
      />
    </TableCell>
  )
}
