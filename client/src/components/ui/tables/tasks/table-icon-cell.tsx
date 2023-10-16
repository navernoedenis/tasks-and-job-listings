import { normalizeSlug } from '@/utils/helpers/normalize';

interface TableIconCellProps<T extends string> {
  cell: T;
  iconFunc: (value: T) => JSX.Element;
}

export function TableIconCell<T extends string>(props: TableIconCellProps<T>) {
  const { cell, iconFunc } = props;

  return (
    <div className='flex items-center'>
      <span className='mr-1'>{iconFunc(cell)}</span> {normalizeSlug(cell)}
    </div>
  );
}
