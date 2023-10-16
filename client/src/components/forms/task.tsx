import { type PropsWithChildren } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import { FormField, FormSelect } from '@/components/ui/form';
import {
  taskCategories,
  taskPriorities,
  taskStatuses,
} from '@/utils/constants/task';

const taskSchema = z.object({
  title: z.string().trim().min(2),
  category: z.enum(taskCategories),
  priority: z.enum(taskPriorities),
  status: z.enum(taskStatuses),
});

type TaskSchema = z.infer<typeof taskSchema>;

interface TaskFormProps extends PropsWithChildren {
  task?: TaskSchema;
  onSubmitForm: (form: TaskSchema) => void;
}

export function TaskForm(props: TaskFormProps) {
  const { children, task, onSubmitForm } = props;

  const { control, formState, handleSubmit, register, watch } =
    useForm<TaskSchema>({
      resolver: zodResolver(taskSchema),
      defaultValues: {
        title: task?.title ?? '',
        category: task?.category ?? 'PERSONAL',
        priority: task?.priority ?? 'LOW',
        status: task?.status ?? 'TODO',
      },
    });

  const [category, priority, status] = watch([
    'category',
    'priority',
    'status',
  ]);

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className='grid grid-cols-2 gap-3 items-end'>
        <FormField
          autoFocus
          error={formState.errors.title?.message}
          label='Title'
          register={register('title')}
        />

        <Controller
          control={control}
          name='status'
          render={({ field }) => (
            <FormSelect
              error={formState.errors.status?.message}
              label='Status'
              onChange={field.onChange}
              options={taskStatuses}
              value={status}
            />
          )}
        />

        <Controller
          control={control}
          name='category'
          render={({ field }) => (
            <FormSelect
              error={formState.errors.category?.message}
              label='Category'
              onChange={field.onChange}
              options={taskCategories}
              value={category}
            />
          )}
        />

        <Controller
          control={control}
          name='priority'
          render={({ field }) => (
            <FormSelect
              error={formState.errors.status?.message}
              label='Priority'
              onChange={field.onChange}
              options={taskPriorities}
              value={priority}
            />
          )}
        />
      </div>

      {children}
    </form>
  );
}
