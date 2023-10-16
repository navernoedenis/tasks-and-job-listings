import { useNavigate } from 'react-router-dom';

import { useFetch } from '@/hooks';
import { TasksService } from '@/services';

import { PageLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { TasksTable } from '@/components/ui/tables';

export function TastsPage() {
  const navigate = useNavigate();

  const { data: tasks, isLoading } = useFetch({
    fetcher: TasksService.findMyAll,
    initialValue: [],
  });

  return (
    <PageLayout
      title='Tasks'
      headerButton={<Button onClick={() => navigate('new')}>New task</Button>}
    >
      {isLoading ? <h1>Loading...</h1> : <TasksTable tasks={tasks} />}
    </PageLayout>
  );
}
