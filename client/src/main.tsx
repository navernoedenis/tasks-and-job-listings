import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from '@/app/app-router.tsx';

import './input.css';

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(<RouterProvider router={appRouter} />);
