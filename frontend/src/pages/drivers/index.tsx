import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router'

import { getDrivers } from '@/api/get-drivers'
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

import { DriversTableFilters } from './components/drivers-table-filters'
import { DriversTableLoading } from './components/drivers-table-loading'
import { DriversTableRow } from './components/drivers-table-row'

export function Drivers() {
  const [pagesCount, setPagesCount] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams()

  const companyId = searchParams.get('companyId')
  const page = searchParams.get('page') ?? 1

  const {
    data: driversResult,
    isLoading: isDriversResultLoading,
    isError: isDriversResultRequestError,
    error: driversResultError,
  } = useQuery({
    queryKey: ['drivers', companyId, page],
    queryFn: () =>
      getDrivers({
        companyId: companyId ? Number(companyId) : undefined,
        limit: 5,
        page: Number(page),
      }),
  })

  useEffect(() => {
    if (driversResult) {
      setPagesCount(Math.ceil(driversResult?.meta?.count / 5))
    }
  }, [driversResult])

  useEffect(() => {
    if (isDriversResultRequestError) {
      toast({
        title: driversResultError.message,
        variant: 'destructive',
      })
    }
  }, [isDriversResultRequestError, driversResultError])

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
      <Helmet title="Drivers" />
      <div className="flex flex-col w-full h-full">
        <h1 className="text-4xl font-extrabold mb-6">Drivers</h1>

        <DriversTableFilters />
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Company Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isDriversResultLoading ? (
              <DriversTableLoading />
            ) : (
              driversResult?.drivers.map((driver) => {
                return (
                  <DriversTableRow key={driver.firstName} driver={driver} />
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
