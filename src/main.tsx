import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MantineProvider, createTheme } from '@mantine/core';
import './index.css';
import '@mantine/core/styles.css';
import SettingsPage from './Settings.page';
import MainPage from './Main.page';

const theme = createTheme({
  cursorType: 'pointer',
  defaultRadius: 'lg',
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <SettingsPage />,
  },
  {
    path: 'tracker',
    element: <MainPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme} forceColorScheme="dark">
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);
