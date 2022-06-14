import { Box } from "@mui/system";
import { Typography, Button } from "@mui/material";
import QuestionData from '../van_questionaire.json';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const QuestionPage = ({setResultArray}) => {

    const [questionIndex, setQuestionIndex] = useState(0);
    const [inputOptions, setInputOptions] = useState([]);
    const [nextQuestionIDs, setNextQuestionIDs] = useState([]);
    const [nextQuestionID, setNextQuestionID] = useState();
    const [finalArray, setFinalArray] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        if(nextQuestionID === ""){
            navigate('/finalpage');
        }else{
                const currentQuestion = QuestionData.results[questionIndex];
                let answerOptions = [...currentQuestion.answers];
                const nextQuestionOptions = [...currentQuestion.next_question_id];
                setInputOptions(answerOptions);
                setNextQuestionIDs(nextQuestionOptions);    
        }
        // to pass to finalPage via props
        setResultArray(finalArray); 
    }
    , [questionIndex, nextQuestionID, navigate, finalArray, setResultArray]);

    const handleClick = (e) => {
        const selectedAnswer = e.target.textContent;
        const answerIndex = inputOptions.indexOf(selectedAnswer); // get answerIndex to match to nextQuestionIdAfterClick and load next page
        const nextQuestionIdAfterClick = nextQuestionIDs[answerIndex];
        setQuestionIndex(nextQuestionIdAfterClick-1);
        setNextQuestionID(nextQuestionIdAfterClick);
        console.log("nextQuestionID: "+nextQuestionID);
        //finalArray shows result on finalPage
        const currentQuestion = QuestionData.results[questionIndex].question;
        setFinalArray(prev => prev.concat(currentQuestion, selectedAnswer));
    }

    return ( 
        <Box>
            <Typography variant="h5" mt={5}>{
            (typeof QuestionData.results[questionIndex] !== 'undefined')?
            QuestionData.results[questionIndex].question
            : console.log("reached last page")
            }</Typography>
            {inputOptions.map((data, id) =>(
                <Box key={id} mt={2}>
                    <Button onClick={handleClick} variant="contained">{data}</Button>
                </Box>
            ))}
        </Box>
     );
}
 
export default QuestionPage;