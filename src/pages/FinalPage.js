import { Box } from "@mui/system";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";

import { useQuery, gql } from '@apollo/client';

const FinalPage = ({resultArray}) => {

    const FEED_QUERY = gql`
      {
      feed {
        id
        question
        answer
      }
    }
    `;

    let navigate = useNavigate();

    const handleBackToLandingPage = () => {
        navigate('/');
    }

    return ( 
        <Box>
            <Typography variant="h4" fontWeight="bold"> Your result: </Typography>
            <div style={{ 'marginTop' : '30px', 'fontWeight' : 'bold', 'fontSize' : '20px'}}>Your Questions and answers<br/>
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