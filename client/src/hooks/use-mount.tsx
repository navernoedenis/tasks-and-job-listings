import { useEffect, useState } from 'react';

export function useMount() {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return { isMounted };
}
