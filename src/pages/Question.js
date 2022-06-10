import { Box } from "@mui/system";
import { Typography, Button } from "@mui/material";
import QuestionData from '../van_questionaire.json';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Question = () => {

    const [questionIndex, setQuestionIndex] = useState(0);
    const [inputOptions, setInputOptions] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        const currentQuestion = QuestionData.results[questionIndex];
        let answerOptions = [...currentQuestion.answers]
        setInputOptions(answerOptions);
    }, [questionIndex]);

    const handleClick = (e) => {
        const currentQuestion = QuestionData.results[questionIndex];
        if(currentQuestion.next_question_id === ""){    //last question of tree
            navigate('/finalpage');
        }
        
    }

    return ( 
        <Box>
            <Typography variant="h4">Question {questionIndex+1}</Typography>
            <Typography variant="h5" mt={5}>{QuestionData.results[questionIndex].question}</Typography>
            {inputOptions.map((data, id) =>(
                <Box key={id} mt={2}>
                    <Button variant="contained">{data}</Button>
                </Box>
            ))}
        </Box>
     );
}
 
export default Question;