import cn from 'clsx';
import { type InputHTMLAttributes } from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

import { FormBase, type FormBaseProps } from './form-base';

interface FormFieldProps<T extends string>
  extends InputHTMLAttributes<HTMLInputElement>,
    FormBaseProps {
  inputClassname?: string;
  register: UseFormRegisterReturn<T>;
}

export function FormField<T extends string>(props: FormFieldProps<T>) {
  const {
    className = '',
    error,
    inputClassname = '',
    label,
    labelClassname,
    register,
    type = 'text',
    ...otherProps
  } = props;

  return (
    <FormBase
      error={error}
      label={label}
      labelClassname={labelClassname}
      rootClassname={className}
    >
      <input
        className={cn(
          'box-border inline-flex items-center justify-center h-[35px] w-full appearance-none rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] dark:hover:shadow-[0_0_0_1px_white] dark:focus:shadow-[0_0_0_2px_white] bg-white dark:bg-black',
          {
            [inputClassname]: !!inputClassname,
          }
        )}
        type={type}
        {...register}
        {...otherProps}
      />
    </FormBase>
  );
}
