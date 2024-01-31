import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import './index.css';
import { Box, CssBaseline } from '@mui/material';
import { ManagePatients } from './components/patients/ManagePatients';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: '100%',
        }}
      >
        <Routes>
          <Route path={'/'} element={<ManagePatients />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
