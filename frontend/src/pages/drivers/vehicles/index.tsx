import { Plus } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams, useSearchParams } from 'react-router'

import { getDriverVehicles } from '@/api/get-driver-vehicles'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from '@/hooks/use-toast'

import { CreateVehicleForm } from './components/create-vehicle-form'
import { DriverVehiclesTableLoading } from './components/driver-vehicles-table-loading'
import { DriverVehiclesTableRow } from './components/driver-vehicles-table-row'

export function DriverVehicles() {
  const [pagesCount, setPagesCount] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams()
  const { driverId } = useParams()

  const page = searchParams.get('page') ?? 1

  const {
    data: driverVehiclesResult,
    isLoading: isDriverVehiclesResultLoading,
    isError: isDriverVehiclesResultRequestError,
    error: driverVehiclesResultError,
  } = useQuery({
    queryKey: ['driver-vehicles'],
    queryFn: () =>
      getDriverVehicles({
        driverId: Number(driverId),
        limit: 5,
        page: Number(page),
      }),
  })

  useEffect(() => {
    if (isDriverVehiclesResultRequestError) {
      toast({
        title: driverVehiclesResultError.message,
        variant: 'destructive',
      })
    }
  }, [isDriverVehiclesResultRequestError, driverVehiclesResultError])

  useEffect(() => {
    if (driverVehiclesResult) {
      setPagesCount(Math.ceil(driverVehiclesResult?.meta?.totalPages))
    }
  }, [driverVehiclesResult])

  function handleSetPreviousPage() {
    const params = new URLSearchParams()

    if (Number(page) - 1 >= 1) {
      params.set('page', String(Number(page) - 1))

      setSearchParams(params)
    }
  }

  function handleSetNextPage() {
    const params = new URLSearchParams()

    if (Number(page) + 1 <= pagesCount) {
      params.set('page', String(Number(page) + 1))

      setSearchParams(params)
    }
  }

  function handleSetPage(page: number) {
    const params = new URLSearchParams()

    params.set('page', String(Number(page)))

    setSearchParams(params)
  }

  const doesShowFirstPaginationEllipsis = Number(page) > 2

  const doesShowLastPaginationEllipsis = Number(page) + 1 < pagesCount

  return (
    <>
      <Helmet title="Vehicles" />

      <div className="flex flex-col w-full h-full">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-extrabold">Driver vehicles</h1>

          <Dialog>
            <DialogTrigger asChild>
              <Button type="button" className="rounded-[6px]">
                <Plus weight="bold" size={20} />
                New
              </Button>
            </DialogTrigger>

            <CreateVehicleForm driverId={Number(driverId)} />
          </Dialog>
        </div>

        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Plate</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Capacity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isDriverVehiclesResultLoading ? (
              <DriverVehiclesTableLoading />
            ) : (
              driverVehiclesResult?.vehicles?.map((vehicle) => {
                return (
                  <DriverVehiclesTableRow
                    key={String(vehicle.id)}
                    vehicle={vehicle}
                  />
                )
              })
            )}
          </TableBody>
        </Table>

        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                data-disabled={Number(page) === 1}
                className="rounded-[6px] cursor-pointer data-[disabled=true]:cursor-not-allowed"
                onClick={handleSetPreviousPage}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                className="rounded-[6px] cursor-pointer"
                onClick={() => handleSetPage(1)}
                isActive={Number(page) === 1}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {doesShowFirstPaginationEllipsis && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {pagesCount > 1 &&
              Number(page) < pagesCount &&
              Array.from({ length: pagesCount })
                .fill(0)
                .map((_, index) => index + 1)
                .slice(
                  Number(page) - 1 === 1 ? 1 : Number(page) - 2,
                  Number(page) + 1 >= pagesCount
                    ? Number(page)
                    : Number(page) + 1,
                )
                .map((item) => {
                  return (
                    <PaginationItem key={item.toString()}>
                      <PaginationLink
                        isActive={Number(page) === item}
                        onClick={() => handleSetPage(item)}
                      >
                        {item}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}
            {doesShowLastPaginationEllipsis && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {pagesCount > 1 && (
              <PaginationItem>
                <PaginationLink
                  className="rounded-[6px] cursor-pointer"
                  onClick={() => handleSetPage(pagesCount)}
                  isActive={pagesCount === Number(page)}
                >
                  {pagesCount}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                data-disabled={pagesCount === Number(page)}
                className="rounded-[6px] cursor-pointer data-[disabled=true]:cursor-not-allowed"
                onClick={handleSetNextPage}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}
