import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageLayout } from '@/components/layouts';
import { TaskForm } from '@/components/forms/task';
import { Button } from '@/components/ui/button';

import { TasksService } from '@/services';
import { type CreateTask } from '@/utils/types/task';

export function NewTaskPage() {
  const navigate = useNavigate();

  const onCreateTask = useCallback(
    (formData: CreateTask) => {
      TasksService.create(formData)
        .then(() => navigate('/tasks'))
        .catch(console.error);
    },
    [navigate]
  );

  return (
    <PageLayout title='New Task'>
      <TaskForm onSubmitForm={onCreateTask}>
        <div className='mt-3 flex justify-end gap-3'>
          <Button type='submit' variant='contained'>
            Save
          </Button>
        </div>
      </TaskForm>
    </PageLayout>
  );
}
