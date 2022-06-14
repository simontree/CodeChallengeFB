import { Box } from "@mui/system";
import { Typography, Button, TextField } from "@mui/material";
import QuestionData from '../van_questionaire.json';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const QuestionPage = ({setResultArray}) => {

    const [questionIndex, setQuestionIndex] = useState(0);
    const [inputOptions, setInputOptions] = useState([]);
    const [inputDataTypes, setInputDataTypes] = useState([]);   // to set as button, text etc.
    const [nextQuestionIDs, setNextQuestionIDs] = useState([]);
    const [nextQuestionID, setNextQuestionID] = useState();
    const [finalArray, setFinalArray] = useState([]);
    const [textInput, setTextInput] = useState();
    const [currentQuestion, setCurrentQuestion] = useState();

    let navigate = useNavigate();

    useEffect(() => {
        if(nextQuestionID === ""){
            navigate('/finalpage');
        }else{
                const currentQuestionData = QuestionData.results[questionIndex];
                let answerOptions = [...currentQuestionData.answers];
                const nextQuestionOptions = [...currentQuestionData.next_question_id];
                const inputTypes = [...currentQuestionData.input_types];
                console.log("inputTypes: "+inputTypes[0]);
                setInputOptions(answerOptions);
                setNextQuestionIDs(nextQuestionOptions);    
                setInputDataTypes(inputTypes);
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
        setCurrentQuestion(QuestionData.results[questionIndex].question); 
        setFinalArray(prev => prev.concat(currentQuestion, selectedAnswer));  //finalArray shows result on finalPage via props
    }

    const handleTextChange = (e) => {
        const enteredText = e.target.value;
        setTextInput(enteredText);
    }

    const onClickSubmitText = () => {
        const answerIndex = inputOptions.indexOf(textInput); // get answerIndex to match to nextQuestionIdAfterClick and load next page
        const nextQuestionIdAfterClick = nextQuestionIDs[answerIndex];
        setQuestionIndex(nextQuestionIdAfterClick-1);
        setNextQuestionID(nextQuestionIdAfterClick);
        setCurrentQuestion(QuestionData.results[questionIndex].question);
        setFinalArray(prev => prev.concat(currentQuestion, textInput)); //finalArray shows result on finalPage via props
        console.log("finalArray"+finalArray);
    }

    return ( 
        <Box>
            <Typography variant="h5" mt={5}>{
            (typeof QuestionData.results[questionIndex] !== 'undefined')?
            QuestionData.results[questionIndex].question
            : console.log("reached last page")
            }</Typography>
            {inputOptions.map((data, id) =>(
                (inputDataTypes[id] === "button") ?
                <Box key={id} mt={2}>
                    <Button onClick={handleClick} variant="contained">{data}</Button>
                </Box> : (inputDataTypes[id] === "text") ?
                <Box key={id} mt={2}>
                        <TextField 
                        onChange={handleTextChange} 
                        variant="standard" 
                        label="Type other option here" 
                        type="text"
                        size="small"> 
                        </TextField> <br/>
                        <Button onClick={onClickSubmitText}>Submit text</Button>
                </Box>
                : console.log("can't read data type of input option")
            ))}
        </Box>
     );
}
 
export default QuestionPage;