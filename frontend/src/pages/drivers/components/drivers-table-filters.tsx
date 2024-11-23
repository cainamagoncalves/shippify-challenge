import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass, X } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router'
import { z } from 'zod'

import { getCompanies } from '@/api/get-companies'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const driversTableFiltersSchema = z.object({
  companyId: z.string(),
})

type DriversTableFiltersSchema = z.infer<typeof driversTableFiltersSchema>

export function DriversTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filteredCompany, setFilteredCompany] = useState(
    () => searchParams.get('companyName') ?? '',
  )
  const [filteredCompanyDebounced, setFilteredCompanyDebounced] = useState('')

  const companyId = searchParams.get('companyId')

  const { data: companiesResult } = useQuery({
    queryKey: ['companies', filteredCompanyDebounced],
    queryFn: () =>
      getCompanies({
        limit: 5,
        page: 1,
        name: filteredCompanyDebounced,
      }),
  })

  useEffect(() => {
    const debounce = setTimeout(() => {
      setFilteredCompanyDebounced(filteredCompany)
    }, 1000)

    return () => clearTimeout(debounce)
  }, [filteredCompany])

  const form = useForm<DriversTableFiltersSchema>({
    resolver: zodResolver(driversTableFiltersSchema),
  })

  useEffect(() => {
    if (companyId && companiesResult) {
      form.setValue('companyId', companyId)
    }
  }, [companyId, form, companiesResult])

  function handleSubmitFilters(values: DriversTableFiltersSchema) {
    const params = new URLSearchParams()

    if (values.companyId) {
      params.set('companyId', values.companyId)
    } else {
      params.delete('companyId')
    }

    setSearchParams(params)
  }

  function handleClearFilters() {
    const params = new URLSearchParams()

    params.delete('companyId')

    form.reset({
      companyId: '',
    })

    setSearchParams(params)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitFilters)}
        className="flex items-center gap-3 justify-between overflow-auto"
      >
        <FormField
          control={form.control}
          name="companyId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-[250px] rounded-[6px]">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>

                  <SelectContent>
                    <Input
                      className="w-full border-t-0 border-x-0 ring-none focus-visible:ring-0"
                      placeholder="Search a company..."
                      onChange={(event) => {
                        setFilteredCompany(event.target.value)
                      }}
                      value={filteredCompany}
                    />
                    {companiesResult?.companies?.map((company) => {
                      return (
                        <SelectItem
                          autoFocus={false}
                          key={String(company.id)}
                          value={String(company.id)}
                        >
                          {company.name}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex gap-3">
          <Button type="submit" className="rounded-[6px]">
            <MagnifyingGlass />
            Filtrar
          </Button>
          <Button
            onClick={handleClearFilters}
            type="button"
            variant="ghost"
            className="rounded-[6px]"
          >
            <X />
            Remover filtros
          </Button>
        </div>
      </form>
    </Form>
  )
}
