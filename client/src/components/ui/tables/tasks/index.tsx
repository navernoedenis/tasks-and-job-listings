import { useState, useMemo, useCallback } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import cn from 'clsx';

import { HiArrowSmUp, HiArrowSmDown } from 'react-icons/hi';
import { HiMiniArrowsUpDown } from 'react-icons/hi2';

import { useToast, ToastRoot } from '@/features/toast';
import { OperationToast } from '@/components/ui/toasts';
import { TasksService } from '@/services';
import { type Task, type UpdateTask } from '@/utils/types/task';

import { TableIconCell } from './table-icon-cell';
import { TaskButtonMenu } from './table-button-menu';
import {
  getIconByCategory,
  getIconByPriority,
  getIconByStatus,
} from './icon-helpers';

interface TasksTableProps {
  tasks: Task[];
}

const columnHelper = createColumnHelper<Task>();

export function TasksTable({ tasks }: TasksTableProps) {
  const [data, setData] = useState(() => [...tasks]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const {
    isToastOpen: isUpdatedToastOpen,
    openToast: openUpdatedToast,
    setToastOpen: setUpdatedToastOpen,
  } = useToast();

  const updateTableTask = useCallback((updatedTask: Task) => {
    setData((prevTasks) => {
      return prevTasks.map((task) => {
        return task.id === updatedTask.id ? { ...task, ...updatedTask } : task;
      });
    });
  }, []);

  const deleteTableTask = useCallback((taskId: string) => {
    setData((prevTasks) => {
      return prevTasks.filter((task) => {
        return task.id !== taskId;
      });
    });
  }, []);

  const onUpdateTask = useCallback(
    (id: string, task: UpdateTask) => {
      TasksService.update(id, task)
        .then(updateTableTask)
        .then(openUpdatedToast)
        .catch(console.error);
    },
    [updateTableTask, openUpdatedToast]
  );

  const onDeleteTask = useCallback(
    (id: string) => {
      TasksService.deleteOne(id)
        .then((task) => deleteTableTask(task.id))
        .catch(console.error);
    },
    [deleteTableTask]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('title', {
        header: () => 'Title',
        cell: (props) => props.cell.getValue(),
      }),
      columnHelper.accessor('status', {
        header: () => 'Status',
        cell: (props) => {
          const status = props.cell.getValue();
          return <TableIconCell cell={status} iconFunc={getIconByStatus} />;
        },
        sortingFn: (rowA, rowB) => {
          const statusA = rowA.original.status;
          const statusB = rowB.original.status;

          if (statusA === 'TODO' || statusB === 'DONE') {
            return -1;
          }

          if (statusA === 'DONE' || statusB === 'TODO') {
            return 1;
          }

          return 0;
        },
      }),
      columnHelper.accessor('priority', {
        header: () => 'Priority',
        cell: (props) => {
          const priority = props.cell.getValue();
          return <TableIconCell cell={priority} iconFunc={getIconByPriority} />;
        },
        sortingFn: (rowA, rowB) => {
          const statusA = rowA.original.priority;
          const statusB = rowB.original.priority;

          if (statusA === 'HIGH' || statusB === 'LOW') {
            return -1;
          }

          if (statusA === 'LOW' || statusB === 'HIGH') {
            return 1;
          }

          return 0;
        },
      }),
      columnHelper.accessor('category', {
        header: () => 'Category',
        cell: (props) => {
          const category = props.cell.getValue();
          return <TableIconCell cell={category} iconFunc={getIconByCategory} />;
        },
      }),
      columnHelper.display({
        id: 'task-buttons-menu',
        cell: (cellContext) => {
          const task = cellContext.row.original;
          return (
            <div className='flex items-center'>
              <TaskButtonMenu
                deleteTask={onDeleteTask}
                task={task}
                updateTask={onUpdateTask}
              />
            </div>
          );
        },
      }),
    ],
    [onDeleteTask, onUpdateTask]
  );

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  return (
    <>
      <div className='border rounded'>
        <table className='w-full'>
          <thead className='border-b'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const columnName = header.getContext().column.id;
                  const isButtonMenuColumn = columnName === 'task-buttons-menu';
                  const isSorted = header.column.getIsSorted();

                  return (
                    <th
                      onClick={header.column.getToggleSortingHandler()}
                      className={cn(
                        'p-4 text-left text-gray-500 text-base font-medium items-center',
                        {
                          ['cursor-default']: isButtonMenuColumn,
                          ['cursor-pointer']: !isButtonMenuColumn,
                        }
                      )}
                      key={header.id}
                    >
                      <p className='flex items-center'>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}

                        {!isButtonMenuColumn && (
                          <span className='ml-1'>
                            {isSorted === false && <HiMiniArrowsUpDown />}
                            {isSorted === 'asc' && <HiArrowSmUp />}
                            {isSorted === 'desc' && <HiArrowSmDown />}
                          </span>
                        )}
                      </p>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className='p-4 border-t' key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update task toast */}
      <ToastRoot open={isUpdatedToastOpen} onOpenChange={setUpdatedToastOpen}>
        <OperationToast title='Task has been updated!' />
      </ToastRoot>
    </>
  );
}
