'use client'

import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form'
import type { InputProps } from './input'
import { Input } from './input'

type BaseFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, 'render' | 'defaultValue'> & {
  label?: string
  customLabel?: React.ReactNode
  placeholder?: string
  required?: boolean
  disabled?: boolean
  className?: string
}

export const InputFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  customLabel,
  required,
  disabled,
  rules,
  placeholder,
  className,
  ...props
}: BaseFormFieldProps<TFieldValues, TName> & {
  inputProps?: InputProps
}) => {
  const form = useFormContext<TFieldValues>()
  const isDisabled = disabled || form.formState.isSubmitting

  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem className={className}>
          {customLabel || <FormLabel required={required}>{label}</FormLabel>}
          <FormControl>
            <Input disabled={isDisabled} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
      {...props}
    />
  )
}
