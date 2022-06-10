import { Box } from "@mui/system";
import { Typography, Button } from "@mui/material";
import QuestionData from '../van_questionaire.json';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Question = () => {

    const [questionIndex, setQuestionIndex] = useState(0);
    const [inputOptions, setInputOptions] = useState([]);
    const [nextQuestionIDs, setNextQuestionIDs] = useState([]);
    const [nextQuestionID, setNextQuestionID] = useState("");
    const [questionNumber, setQuestionNumber] = useState(0);
    let navigate = useNavigate();

    console.log(QuestionData.results.length-1)

    useEffect(() => {
        if(questionIndex === QuestionData.results.length-1){
            navigate('/finalpage');
        }else{
            try{
                var currentQuestion = QuestionData.results[questionIndex];
                var nextQuestionOptions = [...currentQuestion.next_question_id];
                let answerOptions = [...currentQuestion.answers];
                const questionNr = currentQuestion.question_number;
                setInputOptions(answerOptions);
                setNextQuestionIDs(nextQuestionOptions);
                setQuestionNumber(questionNr);
            }catch(error){
                console.log(error);
            }
        }
    }, [questionIndex, nextQuestionID, navigate]);

    const handleClick = (e) => {
        const selectedAnswer = e.target.textContent;
        const answerIndex = inputOptions.indexOf(selectedAnswer);
        const nextQuestionIdOfClick = nextQuestionIDs[answerIndex];
        setNextQuestionID(nextQuestionIdOfClick);
        
        console.log(selectedAnswer)
        console.log("indexOfSelectedAnswer: "+inputOptions.indexOf(selectedAnswer))
        console.log("nextQuestionIdOfClick: "+nextQuestionIdOfClick);

        console.log("typeof: "+typeof nextQuestionID);
        console.log("nextQuestionID: "+nextQuestionID);
    
        // console.log("nextQuestionID.length: "+nextQuestionID.length);

        if(nextQuestionID === 0){    //last question
            navigate('/finalpage');
        }else{
            setQuestionIndex(nextQuestionIdOfClick-1)
        }
    }

    return ( 
        <Box>
            <Typography variant="h4">Question {questionNumber}</Typography>
            <Typography variant="h5" mt={5}>{
            (typeof QuestionData.results[questionIndex] !== 'undefined')?
            QuestionData.results[questionIndex].question :
            console.log("error")
            }</Typography>
            {inputOptions.map((data, id) =>(
                <Box key={id} mt={2}>
                    <Button onClick={handleClick} variant="contained">{data}</Button>
                </Box>
            ))}
        </Box>
     );
}
 
export default Question;