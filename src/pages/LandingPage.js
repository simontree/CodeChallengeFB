import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
import QuestionData from '../van_questionaire.json';

const LandingPage = () => {
    
    let navigate = useNavigate();

    const handleClick = () => {
       navigate('/question');
    }

    return ( 
        <div>
            <Box>
                <Typography variant="h4" fontWeight="bold">{QuestionData.title}<br/><br/> {QuestionData.subtitle}</Typography>
                <Box mt={10}>
                <Button onClick={handleClick} variant="contained" type="submit" mt={10}>Getting Started</Button>
                </Box>
            </Box>
        </div>
     );
}
 
export default LandingPage;