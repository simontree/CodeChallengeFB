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
            <Typography variant="h4" fontWeight="bold"> Your result: </Typography>
            <div style={{ 'margin-top' : '30px', 'fontWeight' : 'bold', 'fontSize' : '20px'}}>Your Questions and answers<br/>
            {resultArray.map((data, question) =>(
                <Box key={question} mt={3}>
                    {data}
                </Box>
            ))}
            </div>
            <Box  mt={5}>
            <Button variant="contained" onClick={handleBackToLandingPage}>Back to the Start</Button>
            </Box>
        </Box>
     );
}
 
export default FinalPage;