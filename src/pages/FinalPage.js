import { Box } from "@mui/system";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";

const FinalPage = ({resultArray}) => {

    let navigate = useNavigate();

    const handleBackToLandingPage = () => {
        navigate('/');
    }

    return ( 
        <Box>
            <Typography variant="h4" fontWeight="bold"> Final Page</Typography>
            <Typography mt={10}><b>Your Questions and answers</b><br/>
            {resultArray.map((data, question) =>(
                <Box key={question} mt={3}>
                    {data}
                </Box>
            ))}
            </Typography>
            <Box  mt={5}>
            <Button variant="contained" onClick={handleBackToLandingPage}>Back to the Start</Button>
            </Box>
        </Box>
     );
}
 
export default FinalPage;