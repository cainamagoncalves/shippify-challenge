import { ArrowRight } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useSearchParams } from 'react-router'

import { getCompanies } from '@/api/get-companies'
import { Button } from '@/components/ui/button'
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

import { CompaniesTableLoading } from './components/companies-table-loading'
import { CompaniesTableRow } from './components/companies-table-row'

export function Home() {
  const [pagesCount, setPagesCount] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams()

  const page = searchParams.get('page') ?? 1

  const navigate = useNavigate()

  const {
    data: companiesResult,
    error: companiesResultError,
    isError: isCompaniesResultRequestError,
    isLoading: isCompaniesResultLoading,
  } = useQuery({
    queryKey: ['companies', page],
    queryFn: () => getCompanies({ limit: 5, page: Number(page) }),
  })

  useEffect(() => {
    if (companiesResultError) {
      toast({
        title: companiesResultError.message,
        variant: 'destructive',
      })
    }
  }, [isCompaniesResultRequestError, companiesResultError])

  useEffect(() => {
    if (companiesResult) {
      setPagesCount(Math.ceil(companiesResult?.meta?.totalPages))
    }
  }, [companiesResult])

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
    <div>
      <Helmet title="Home" />
      <h1 className="font-extrabold text-5xl text-primary">
        Olá,{' '}
        <span className="text-foreground bold text-4xl">
          escolha a empresa <br /> para visualizar os motoristas
        </span>
      </h1>

      <main className="flex flex-col h-full w-full justify-center items-center mt-20">
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isCompaniesResultLoading ? (
              <CompaniesTableLoading />
            ) : (
              companiesResult?.companies.map((company) => {
                return (
                  <CompaniesTableRow key={company.name} company={company} />
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

        <Button
          variant="ghost"
          className="rounded-[6px] mt-6 self-end"
          onClick={() => navigate(`/drivers`)}
        >
          Pular essa etapa
          <ArrowRight />
        </Button>
      </main>
    </div>
  )
}
