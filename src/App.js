import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import { Box } from '@mui/system';
import Question from './pages/Question';
import FinalPage from './pages/FinalPage';

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
      <Routes>
        <Route path="/finalpage" element={<FinalPage/>}/>
      </Routes>
    </Box>
    </BrowserRouter>
  );
}

export default App;
