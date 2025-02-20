import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'

type Props = {
  label: string
  type: string
  name: string
  placeholder?: string
  defaultValue?: string
}

function FormInput({ name, label, type, placeholder, defaultValue }: Props) {
  return (
    <div className="mb-4 flex flex-col space-y-1">
      <Label htmlFor={name} className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </Label>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
      />
    </div>
  )
}

export default FormInput
