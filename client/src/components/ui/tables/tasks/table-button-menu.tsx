import { useCallback } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';

import { Button } from '@/components/ui/button';
import { DialogContent, DialogRoot } from '@/features/dialog';
import { TaskForm } from '@/components/forms/task';
import {
  Dropdown,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
  DropdownItem,
} from '@/components/ui/dropdown';

import { useOpen } from '@/hooks';

import {
  taskCategories,
  taskPriorities,
  taskStatuses,
} from '@/utils/constants/task';
import { type Task, type UpdateTask } from '@/utils/types/task';

import { TableSubmenu } from './table-submenu';

interface TaskButtonMenuProps {
  deleteTask: (id: string) => void;
  task: Task;
  updateTask: (id: string, task: UpdateTask) => void;
}

export function TaskButtonMenu(props: TaskButtonMenuProps) {
  const { deleteTask, task, updateTask } = props;
  const {
    isOpen: isEditingOpen,
    onClose: onCloseEditing,
    onOpen: onOpenEditing,
  } = useOpen();

  const onDeleteTask = useCallback(() => {
    deleteTask(task.id);
  }, [deleteTask, task.id]);

  const onEditTask = useCallback(
    (updatedTask: Required<UpdateTask>) => {
      updateTask(task.id, updatedTask);
      onCloseEditing();
    },
    [task.id, updateTask, onCloseEditing]
  );

  return (
    <DialogRoot open={isEditingOpen} onOpenChange={onCloseEditing}>
      <Dropdown>
        <DropdownTrigger asChild>
          <button className='outline-none text-xl'>
            <HiDotsHorizontal />
          </button>
        </DropdownTrigger>

        <DropdownPortal>
          <DropdownContent>
            <TableSubmenu
              optionKey='status'
              options={taskStatuses}
              task={task}
              updateTask={updateTask}
            />

            <TableSubmenu
              optionKey='priority'
              options={taskPriorities}
              task={task}
              updateTask={updateTask}
            />

            <TableSubmenu
              optionKey='category'
              options={taskCategories}
              task={task}
              updateTask={updateTask}
            />

            <DropdownItem onClick={onOpenEditing}>Edit</DropdownItem>
            <DropdownItem onClick={onDeleteTask}>Delete</DropdownItem>
          </DropdownContent>
        </DropdownPortal>
      </Dropdown>

      <DialogContent>
        <h3 className='text-lg'>Editing Task</h3>

        <TaskForm onSubmitForm={onEditTask} task={task}>
          <div className='mt-3 flex items-center justify-end gap-2'>
            <Button onClick={onCloseEditing}>Cancel</Button>
            <Button type='submit' variant='contained'>
              Update
            </Button>
          </div>
        </TaskForm>
      </DialogContent>
    </DialogRoot>
  );
}
