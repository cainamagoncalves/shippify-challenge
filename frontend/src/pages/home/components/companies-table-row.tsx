import { ArrowRight } from '@phosphor-icons/react'
import { useNavigate } from 'react-router'

import { Company } from '@/api/_types/company'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

interface CompaniesTableRowProps {
  company: Company
}
export function CompaniesTableRow({ company }: CompaniesTableRowProps) {
  const navigate = useNavigate()

  return (
    <TableRow>
      <TableCell>{company.name}</TableCell>
      <TableCell>{company.city}</TableCell>
      <TableCell>{company.planType}</TableCell>
      <TableCell>{company.status}</TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-[6px]"
          onClick={() =>
            navigate(
              `/drivers?companyId=${company.id}&companyName=${company.name}`,
            )
          }
        >
          <ArrowRight />
        </Button>
      </TableCell>
    </TableRow>
  )
}
