import { useCallback, useEffect, useRef, useState } from 'react';

interface ToastProps {
  msBeforeClosing?: number;
}

export function useToast(props: ToastProps = {}) {
  const { msBeforeClosing = 3000 } = props;

  const [isToastOpen, setToastOpen] = useState(false);
  const timerRef = useRef(0);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const openToast = useCallback(() => {
    setToastOpen(true);
    window.clearTimeout(timerRef.current);

    timerRef.current = window.setTimeout(() => {
      setToastOpen(false);
    }, msBeforeClosing);
  }, [msBeforeClosing]);

  return { isToastOpen, openToast, setToastOpen };
}
