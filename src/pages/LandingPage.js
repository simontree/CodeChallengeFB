import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";

const LandingPage = () => {
    
    let navigate = useNavigate();

    const handleClick = () => {
       navigate('/question');
    }

    return ( 
        <div>
            <Box>
                <Typography variant="h4" fontWeight="bold">Welcome to the Van Questionaire!<br/><br/> Find out which van model suits you.</Typography>
                <Box mt={10}>
                <Button onClick={handleClick} variant="contained" type="submit" mt={10}>Getting Started</Button>
                </Box>
            </Box>
        </div>
     );
}
 
export default LandingPage;