import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import './App.css';
import { Box } from '@mui/system';
import LandingPage from './pages/LandingPage';
import QuestionPage from './pages/QuestionPage';
import FinalPage from './pages/FinalPage';


function App() {

  const [resultArray, setResultArray] = useState([]);

  return (
    <BrowserRouter>
    <Box textAlign="center" mt={10}>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/question" element={<QuestionPage setResultArray={setResultArray}/>}/>
        <Route path="/finalpage" element={<FinalPage resultArray={resultArray}/>}/>
      </Routes>
    </Box>
    </BrowserRouter>
  );
}

export default App;
