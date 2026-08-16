import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { ResortMap } from './components/ResortMap';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/map',
    element: <ResortMap />,
  }
]);