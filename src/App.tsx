import './App.css';
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import SettingsPage from './Settings.page';

const theme = createTheme({
  cursorType: 'pointer',
  defaultRadius: 'lg',
});

function App() {
  return (
    <MantineProvider theme={theme} forceColorScheme="dark">
      <SettingsPage />
    </MantineProvider>
  );
}

export default App;
