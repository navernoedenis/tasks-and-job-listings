import * as Select from '@radix-ui/react-select';
import { BiChevronDown } from 'react-icons/bi';
import cn from 'clsx';

import { normalizeSlug } from '@/utils/helpers';

interface FormSelectProps<T extends string> {
  className?: string;
  error?: string;
  label?: string;
  labelClassname?: string;
  onChange: (value: T) => void;
  options: readonly T[];
  value: T;
}

export function FormSelect<T extends string>(props: FormSelectProps<T>) {
  const {
    className = '',
    error,
    label = '',
    labelClassname = '',
    onChange,
    options,
    value,
  } = props;

  return (
    <div
      className={cn('flex flex-col gap-1', {
        [className]: !!className,
      })}
    >
      <div className='mb-1 flex items-center justify-between'>
        {label && (
          <label
            className={cn('text-[15px] font-medium leading-[24px] shrink-0', {
              [labelClassname]: !!labelClassname,
            })}
          >
            {label}
          </label>
        )}
        {error && (
          <p className='ml-2 text-right text-[13px] text-red-600 opacity-[0.8]'>
            {error}
          </p>
        )}
      </div>

      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger className='border rounded border-black dark:border-white h-[35px] px-[10px] inline-flex items-center justify-between text-[15px] leading-none gap-[5px] shadow-[0_2px_10px] shadow-black/10 outline-none'>
          <Select.Value>{normalizeSlug(value)}</Select.Value>
          <Select.Icon>
            <BiChevronDown />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className='overflow-hidden bg-white dark:bg-black text-black dark:text-white border border-transparent dark:border-white rounded-md p-1 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]'>
            <Select.Viewport>
              {options.map((option) => (
                <Select.Item
                  className={cn('cursor-pointer outline-none', {
                    ['text-orange-500']: option === value,
                  })}
                  key={option}
                  value={option}
                >
                  <Select.ItemText>{normalizeSlug(option)}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
