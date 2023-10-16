import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export function useNavigationHistory() {
  const location = useLocation();

  const [isPreviousPageExists] = useState(() => {
    return location.key !== 'default';
  });

  return { isPreviousPageExists, location };
}
