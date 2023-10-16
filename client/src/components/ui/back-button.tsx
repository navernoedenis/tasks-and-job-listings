import { type ButtonHTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

import { Button } from '@/components/ui/button';
import { useNavigationHistory } from '@/hooks';

interface BackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  hideArrowIcon?: boolean;
}

export function BackButton(props: BackButtonProps) {
  const navigate = useNavigate();
  const { isPreviousPageExists } = useNavigationHistory();
  const { children, hideArrowIcon = false, ...otherProps } = props;

  if (isPreviousPageExists) {
    return (
      <Button
        onClick={() => navigate(-1)}
        leftIcon={hideArrowIcon ? undefined : <BsArrowLeft />}
        {...otherProps}
      >
        {children ?? 'Back'}
      </Button>
    );
  }

  return null;
}
