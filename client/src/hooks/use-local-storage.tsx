import { useState, useEffect } from 'react';
import { LocalStorageService } from '@/services';

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState(() => {
    const data = LocalStorageService.get<T>(key);

    if (data) {
      return data;
    }

    if (typeof initialValue === 'function') {
      return (initialValue as () => T)();
    }

    return initialValue;
  });

  useEffect(() => {
    LocalStorageService.save(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
