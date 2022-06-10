import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import { Box } from '@mui/system';
import Question from './pages/Question';

function App() {
  return (
    <BrowserRouter>
    <Box textAlign="center" mt={10}>
      <Routes>
        <Route path="/" element={<Landing/>}/>
      </Routes>
      <Routes>
        <Route path="/question" element={<Question/>}/>
      </Routes>
    </Box>
    </BrowserRouter>
  );
}

export default App;
