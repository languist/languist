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

export type InputFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseFormFieldProps<TFieldValues, TName> & {
  inputProps?: InputProps
  addon?: React.ReactNode
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
  inputProps,
  addon,
  ...props
}: InputFormFieldProps<TFieldValues, TName>) => {
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
            <div className="relative">
              <Input
                disabled={isDisabled}
                placeholder={placeholder}
                {...inputProps}
                {...field}
              />
              {addon}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
      {...props}
    />
  )
}
