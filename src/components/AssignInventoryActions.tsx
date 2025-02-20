
import * as React from 'react'
import { updateUser } from '@/actions/user'
import { toast } from '@/hooks/use-toast'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const AssignInventoryActions = ({ row }: any) => {
  const task = row.original
  console.log('Task:', task)

  // Find the initially assigned client
  const initialClient = task?.clients?.length ? task.clients[0] : null

  // State to track selected client
  const [selectedClient, setSelectedClient] = React.useState(initialClient)

  console.log('Assigned Client:', selectedClient)

  // Function to handle inventory transfer
  const handleChange = async (userId: string) => {
    const selected = task.clients.find((client: any) => client.id == userId)
    setSelectedClient(selected) // Update state with newly selected client

    const res: any = await updateUser(task?.id, userId, false)

    if (res?.error) {
      toast({ title: 'Error', description: res.error, variant: 'destructive' })
    } else {
      toast({ title: 'Success', description: 'Inventory successfully transferred!' })
    }
  }

  return (
    <div className="flex gap-8">
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={selectedClient ? `Transfer to ${selectedClient.name}` : 'Select a client'}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select a user</SelectLabel>
            {task?.clients?.map((clientItem: any) => (
              <SelectItem key={clientItem.id} value={clientItem.id}>
                {clientItem?.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default AssignInventoryActions
