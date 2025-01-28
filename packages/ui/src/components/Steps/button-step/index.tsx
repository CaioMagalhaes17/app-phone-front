import { Text } from '@/atoms/Text'
import React, { ButtonHTMLAttributes } from 'react'

interface ButtonStepProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: string
  name: string
  isActive: boolean
}

export function ButtonStep({ id, name, isActive, ...rest }: ButtonStepProps) {
  return (
    <li className="mx-auto flex flex-col items-center">
      <button
        type="button"
        className={`${isActive ? '!border-primary !bg-primary text-white' : ''}
                      border-[3px] border-[#f3f2ee] bg-white flex justify-center items-center w-16 h-16 rounded-full`}
        {...rest}
      >
        <Text as="span" className="text-lg text-center">{id}</Text>
      </button>
      <Text as="span"
        className={`${isActive ? 'text-primary' : ''} text-lg text-center font-extrabold block mt-2`}
      >
        {name}
      </Text>
    </li>
  )
}