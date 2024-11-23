import { ArrowRight, CheckCircle, City, Tag } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router'

import { getCompanies } from '@/api/get-companies'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { useToast } from '@/hooks/use-toast'
import { useCarousel } from '@/hooks/useCarousel'

import { CardLoading } from './components/card-loading'

export function Home() {
  const [savedTotalPages, setSavedTotalPages] = useState(1)

  const { currentCarouselPage, setCarouselApi } = useCarousel()
  const { toast } = useToast()
  const navigate = useNavigate()

  const {
    data: companiesResult,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['companies', currentCarouselPage],
    queryFn: () => getCompanies({ limit: 6, page: currentCarouselPage }),
    enabled: currentCarouselPage > 0,
  })

  useEffect(() => {
    if (isError) {
      toast({
        title: error.message,
        variant: 'destructive',
      })
    }
  }, [isError, error, toast])

  useEffect(() => {
    if (companiesResult?.meta?.totalPages) {
      setSavedTotalPages(companiesResult.meta.totalPages)
    }
  }, [companiesResult])

  return (
    <div>
      <Helmet title="Home" />
      <h1 className="bold text-5xl text-primary">
        Olá,{' '}
        <span className="text-foreground bold text-4xl">
          escolha a empresa <br /> para visualizar os motoristas
        </span>
      </h1>

      <main className="flex flex-col h-full w-full justify-center items-center mt-20">
        {isLoading ? (
          <div className="grid grid-cols-3 gap-3 p-6">
            {Array.from({ length: 6 }).map((_, index) => {
              return <CardLoading key={String(index)} />
            })}
          </div>
        ) : (
          <Carousel setApi={setCarouselApi}>
            <CarouselContent>
              {Array.from({ length: savedTotalPages })?.map((_, index) => {
                return (
                  <CarouselItem
                    key={index.toString()}
                    className="grid grid-cols-3 gap-3 p-6"
                  >
                    {companiesResult?.companies?.map((company) => {
                      return (
                        <Card
                          key={company.id.toString()}
                          className="hover:ring-2 ring-primary transition-all cursor-pointer self-start"
                          onClick={() =>
                            navigate(
                              `/drivers?companyName=${company.name}&companyId=${company.id}`,
                            )
                          }
                        >
                          <CardHeader className="font-bold text-2xl">
                            {company.name}
                          </CardHeader>
                          <CardDescription></CardDescription>

                          <CardContent className="flex flex-col">
                            <span className="flex items-center gap-2">
                              <City /> {company.city}
                            </span>
                            <span className="flex items-center gap-2">
                              <Tag />
                              {company.planType}
                            </span>
                            <span className="flex items-center gap-2">
                              <CheckCircle />
                              {company.status}
                            </span>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}

        <Button
          variant="ghost"
          className="rounded-[6px]"
          onClick={() => navigate(`/drivers`)}
        >
          Pular essa etapa
          <ArrowRight />
        </Button>
      </main>
    </div>
  )
}
