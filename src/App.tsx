import React from 'react';
import './App.css';
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import SettingsPage from './Settings.page';
import MainPage from './Main.page';

const theme = createTheme({
  cursorType: 'pointer',
  defaultRadius: 'lg',
});

const App: React.FC = () => {
  return (
    <MantineProvider theme={theme} forceColorScheme="dark">
      {/* <SettingsPage /> */}
      <MainPage />
    </MantineProvider>
  );
};

export default App;
