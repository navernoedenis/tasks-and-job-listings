import cn from 'clsx';

import {
  DropdownItem,
  DropdownSubmenu,
  DropdownSubmenuContent,
  DropdownSubmenuTrigger,
} from '@/components/ui/dropdown';

import { normalizeSlug } from '@/utils/helpers/normalize';
import { type Task, type CreateTask } from '@/utils/types/task';

interface TableSubmenuProps<T extends string> {
  optionKey: keyof Omit<CreateTask, 'title'>;
  options: readonly T[];
  task: Task;
  updateTask: (id: string, task: Omit<CreateTask, 'title'>) => void;
}

export function TableSubmenu<T extends string>(props: TableSubmenuProps<T>) {
  const { optionKey, options, task, updateTask } = props;

  return (
    <DropdownSubmenu>
      <DropdownSubmenuTrigger>
        {normalizeSlug(optionKey)}
      </DropdownSubmenuTrigger>
      <DropdownSubmenuContent>
        {options.map((option) => (
          <DropdownItem
            className={cn('', {
              ['text-red-500']: option === task[optionKey],
            })}
            key={option}
            onClick={() => updateTask(task.id, { [optionKey]: option })}
          >
            {normalizeSlug(option)}
          </DropdownItem>
        ))}
      </DropdownSubmenuContent>
    </DropdownSubmenu>
  );
}
