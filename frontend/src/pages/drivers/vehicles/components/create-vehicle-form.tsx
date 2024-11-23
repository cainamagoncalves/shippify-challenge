import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createVehicle } from '@/api/create-vehicle'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'

const createVehicleFormSchema = z.object({
  capacity: z
    .string()
    .min(2, {
      message: 'The capacity must be at least 2 characters.',
    })
    .max(20, {
      message: 'The capacity must be at 20 characters on max.',
    }),
  model: z
    .string()
    .min(2, {
      message: 'The model must be at least 2 characters.',
    })
    .max(100),
  plate: z.string().min(2, {
    message: 'The plate must be at least 2 characters.',
  }),
  type: z.string().min(2, {
    message: 'The type must be at least 2 characters.',
  }),
})

type CreateVehicleFormSchema = z.infer<typeof createVehicleFormSchema>

interface CreateVehicleFormProps {
  driverId: number
}

export function CreateVehicleForm({ driverId }: CreateVehicleFormProps) {
  const form = useForm<CreateVehicleFormSchema>({
    resolver: zodResolver(createVehicleFormSchema),
  })

  const queryClient = useQueryClient()

  const { mutateAsync: createVehicleFn } = useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      toast({
        title: 'Success!',
        description: 'The vehicle was successfully created!',
      })

      queryClient.invalidateQueries({
        queryKey: ['driver-vehicles'],
      })
    },
    onError: (error) => {
      toast({
        title: 'Error!',
        description: error.message,
      })
    },
  })

  async function handleCreateDriverVehicle(data: CreateVehicleFormSchema) {
    await createVehicleFn({
      body: {
        ...data,
        driverId,
      },
    })
  }

  return (
    <DialogContent className="rounded-xl">
      <DialogHeader>
        <DialogTitle>Criar novo veículo</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateDriverVehicle)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insert the capacity"
                    className="rounded-[6px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insert the model"
                    className="rounded-[6px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="plate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plate</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insert the plate"
                    className="rounded-[6px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insert the type"
                    className="rounded-[6px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              disabled={form.formState.isSubmitting}
              className="rounded-[6px]"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  )
}
