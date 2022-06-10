import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";

const Landing = () => {
    
    let navigate = useNavigate();

    const handleClick = () => {
       navigate('/question');
    }

    return ( 
        <div>
        <Typography variant="h4" fontWeight="bold">Welcome to the Questionaire</Typography>
        <Box mt={10}>
        <Button onClick={handleClick} variant="contained" type="submit" mt={10}>Getting Started</Button>
        </Box>
        </div>
     );
}
 
export default Landing;