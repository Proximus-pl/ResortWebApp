import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { ThemeToggle } from './components/ThemeToggle';

export default function App() {
  return (
    <>
      <ThemeToggle /> {/* This will float on top of all pages */}
      <RouterProvider router={router} />
    </>
  );
}