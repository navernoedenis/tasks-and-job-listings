import { useState, useCallback } from 'react';

export function useOpen(initValue: boolean = false) {
  const [isOpen, setOpen] = useState(() => initValue);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return { isOpen, onOpen, onClose, onToggle };
}
