import { Box } from "@mui/system";
import { Typography, Button, TextField } from "@mui/material";
import QuestionData from '../van_questionaire.json';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const QuestionPage = ({setResultArray}) => {

    const [questionIndex, setQuestionIndex] = useState(0);
    const [questionIndexHistory, setQuestionIndexHistory] = useState([]);   //for previous button
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
                setInputOptions(answerOptions);
                setNextQuestionIDs(nextQuestionOptions);    
                setInputDataTypes(inputTypes);
                // console.log("currentQuestionData.id: "+currentQuestionData.id)
        }
        // to pass to finalPage via props
        setResultArray(finalArray); 
        console.log(finalArray)
    }
    , [questionIndex, nextQuestionID, navigate, finalArray, setResultArray]);

    const onClickSubmitButton = (e) => {
        const selectedAnswer = e.target.textContent;
        const answerIndex = inputOptions.indexOf(selectedAnswer); // get answerIndex to match to nextQuestionIdAfterClick and load next page
        const nextQuestionIdAfterClick = nextQuestionIDs[answerIndex];
        const thisCurrentQuestion = QuestionData.results[questionIndex].question;
        setQuestionIndex(nextQuestionIdAfterClick-1);
        setNextQuestionID(nextQuestionIdAfterClick);
        setCurrentQuestion(thisCurrentQuestion); 
        setFinalArray(prev => prev.concat(thisCurrentQuestion, selectedAnswer));  //finalArray shows result on finalPage via props
        setQuestionIndexHistory(prev => prev.concat(questionIndex));
    }

    const onClickBackButton = () => {
        setQuestionIndex(questionIndexHistory[questionIndexHistory.length-1]); // setQuestionIndex with last element of questionIndexHistory Array
        setQuestionIndexHistory(questionIndexHistory.slice(0,-1)) // delete last element of questionIndexHistory Array
        setFinalArray(finalArray.slice(0,-2)); // delete last two elements of finalArray
    }

    const onClickBackToHomeButton = () => {
        navigate(-1);
    }

    const handleTextChange = (e) => {
        const enteredText = e.target.value;
        setTextInput(enteredText);
    }

    const onClickSubmitText = () => {
        const answerIndex = inputOptions.indexOf(inputOptions.find(item => item === "")); // get answerIndex to match to nextQuestionIdAfterClick and load next page
        const nextQuestionIdAfterClick = nextQuestionIDs[answerIndex];
        setQuestionIndex(nextQuestionIdAfterClick-1);
        setNextQuestionID(nextQuestionIdAfterClick);
        setCurrentQuestion(QuestionData.results[questionIndex].question);
        setFinalArray(prev => prev.concat(currentQuestion, textInput)); //finalArray shows result on finalPage via props
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
                    <Button onClick={onClickSubmitButton} variant="contained">{data}</Button>
                </Box> 
                : (inputDataTypes[id] === "text") ?
                <Box key={id} mt={1}>
                        <TextField 
                        onChange={handleTextChange} 
                        variant="standard" 
                        label="Other option" 
                        type="text"
                        sx={{ width: '150px' }}> 
                        </TextField> <br/>
                        <Button onClick={onClickSubmitText} >Submit</Button>
                </Box>
                : console.log("can't read data type of input option")
            ))}
             
            {questionIndex > 0 ?
            <Box mt={3}>
                <Button onClick={onClickBackButton} variant="outlined">Previous Question</Button>
            </Box>
            : questionIndex === 0 ?
            <Box mt={3}>
                <Button onClick={onClickBackToHomeButton} variant="outlined">Back</Button>
            </Box>
            : console.log("check for error with questionIndex")
            }
        </Box>
     );
}
 
export default QuestionPage;