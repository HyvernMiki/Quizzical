import { useState, useEffect } from "react";
import ErrorComponent from "./ErrorComponent";
import FullQuestion from "./FullQuestion";
import he from "he";
import { Link } from "react-router-dom";
import "animate.css";

export default function QuestionsPage() {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [errorNotAnswered, setErrorNotAnswered] = useState();
    const [endGame, setEndGame] = useState(false);
    const [score, setScore] = useState("");

    const checkQuestions = () => {
        if (endGame) {
            window.location.reload(false);
        } else if (Object.keys(selectedAnswers).length === data.length) {
            setErrorNotAnswered(false);
            setEndGame(true);
            const correct_answers = Object.values(selectedAnswers).filter((answer, i) => {
                return he.decode(data[i].correct_answer) === he.decode(answer.answer);
            }).length;
            setScore(
                <p className="score">
                    You scored <span className="score-specific">{correct_answers}/5</span> correct
                    answers
                </p>
            );
            setData((prevData) =>
                prevData.map((d, i) => {
                    return { ...d, userAnswer: selectedAnswers[i + 1] };
                })
            );
        } else {
            setErrorNotAnswered(true);
        }
    };

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then((response) => response.json())
            .then((data) => {
                setError("");
                setData(data.results);
            })
            .catch((err) => setError(<ErrorComponent message={err.message} />));
    }, []);
    let allQuestions = "";
    if (data) {
        allQuestions = data.map((question, i) => (
            <FullQuestion
                {...question}
                setSelectedAnswers={setSelectedAnswers}
                selectedAnswers={selectedAnswers}
                key={i}
                number={i + 1}
            />
        ));
    }

    return (
        <div className="questions-main">
            {error}
            {allQuestions}
            {score}
            {data && (
                <div className="home-container">
                    <Link className="questions-home" to="/">
                        Return to the homepage
                    </Link>
                    <div className="questions-home check" onClick={checkQuestions}>
                        {endGame ? "Play again" : "Check questions"}
                    </div>
                </div>
            )}
            {errorNotAnswered && (
                <p className="error-not-answered animate__animated animate__fadeInDown">
                    Please answer all questions before submitting
                </p>
            )}
        </div>
    );
}
