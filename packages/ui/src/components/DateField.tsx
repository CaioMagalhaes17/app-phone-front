import Flatpickr, { DateTimePickerProps } from 'react-flatpickr'
import 'flatpickr/dist/flatpickr.css'
import { Portuguese } from 'flatpickr/dist/l10n/pt.js'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/utils'

interface BasicCalendarInterface extends DateTimePickerProps {
  minDate?: string
  className?: string
}

const dateFieldProps = cva([
  'form-input-custom'
])

export function DateField({
  minDate,
  className,
  options,
  ...rest
}: BasicCalendarInterface & VariantProps<typeof dateFieldProps>) {
  return (
    <Flatpickr
      options={{
        mode: options?.mode || 'single',
        locale: Portuguese,
        dateFormat: 'd/m/Y',
        position: 'auto left',
        minDate: minDate,
      }}
      className={cn(dateFieldProps({ className }))}
      {...rest}
    />
  )
}
