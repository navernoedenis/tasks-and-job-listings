import { AiOutlineCheck } from 'react-icons/ai';
import { ToastCloseTrigger } from '@/features/toast';
import { Button } from '@/components/ui/button';

interface OperationToastProps {
  buttonText?: string;
  message?: string;
  title: string;
}

export function OperationToast(props: OperationToastProps) {
  const { buttonText = 'Close', message, title } = props;

  return (
    <div className='flex'>
      <div className='grow flex flex-col gap-2 items-start justify-center'>
        <h5 className='font-medium'>
          {title}
          <span className='ml-1 inline-flex text-[20px] text-green-500'>
            <AiOutlineCheck />
          </span>
        </h5>
        {message && <p className='text-sm text-gray-600'>{message}</p>}
      </div>

      <ToastCloseTrigger>
        <Button className='ml-1'>{buttonText}</Button>
      </ToastCloseTrigger>
    </div>
  );
}
