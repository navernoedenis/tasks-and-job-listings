import cn from 'clsx';
import { type TextareaHTMLAttributes } from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

import { FormBase, type FormBaseProps } from './form-base';

interface FormAreaProps<T extends string>
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    FormBaseProps {
  textAreaClassname?: string;
  register: UseFormRegisterReturn<T>;
}

export function FormArea<T extends string>(props: FormAreaProps<T>) {
  const {
    className = '',
    error,
    textAreaClassname = '',
    label,
    labelClassname,
    register,
    rows = 3,
    ...otherProps
  } = props;

  return (
    <FormBase
      error={error}
      label={label}
      labelClassname={labelClassname}
      rootClassname={className}
    >
      <textarea
        rows={rows}
        className={cn(
          'box-border inline-flex items-center justify-center w-full appearance-none rounded-[4px] p-[10px] text-[15px] shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] dark:hover:shadow-[0_0_0_1px_white] dark:focus:shadow-[0_0_0_2px_white] bg-white dark:bg-black',
          {
            [textAreaClassname]: !!textAreaClassname,
          }
        )}
        {...register}
        {...otherProps}
      />
    </FormBase>
  );
}
