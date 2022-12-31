import { useState, useEffect } from "react";
import ErrorComponent from "./ErrorComponent";
import FullQuestion from "./FullQuestion";
import { Link } from "react-router-dom";
import "animate.css";

export default function QuestionsPage() {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [errorNotAnswered, setErrorNotAnswered] = useState();

    const checkQuestions = () => {
        if (Object.keys(selectedAnswers).length === data.length) {
            setErrorNotAnswered(false);
            console.log(selectedAnswers);
            console.log(data);
            // setData((prevData)=>prevData.map())
        } else {
            setErrorNotAnswered(true);
        }
    };

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then((response) => response.json())
            .then((data) => {
                setError("");
                setData(
                    data.results.map((question, i) => (
                        <FullQuestion
                            {...question}
                            setSelectedAnswers={setSelectedAnswers}
                            selectedAnswers={selectedAnswers}
                            key={i}
                            number={i + 1}
                        />
                    ))
                );
            })
            .catch((err) => setError(<ErrorComponent message={err.message} />));
    }, []);

    return (
        <div className="questions-main">
            {error}
            {data}
            {data && (
                <div className="home-container">
                    <Link className="questions-home" to="/">
                        Return to the homepage
                    </Link>
                    <div className="questions-home check" onClick={checkQuestions}>
                        Check questions
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
