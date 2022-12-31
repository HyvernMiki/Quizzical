import he from "he";
import React, { useEffect } from "react";
import "animate.css";

function Answer(props) {
    return (
        <li
            className={`answer animate__animated animate__fadeInRight ${
                props.selected ? "answer-selected" : ""
            } ${props.off ? "answer-off" : ""} ${props.correct ? "answer-correct" : ""} ${
                props.wrong ? "answer-wrong" : ""
            }`}
            onClick={props.selectAnswer}
        >
            {props.answer}
        </li>
    );
}

export default function FullQuestion(props) {
    const correctAnswer = he.decode(props.correct_answer);
    const incorrectAnswers = props.incorrect_answers.map((el) => he.decode(el));
    const allAnswers = [...incorrectAnswers, correctAnswer].sort((a, b) => (a > b ? -1 : 1));
    const [answers, setAnswers] = React.useState(
        allAnswers.map((answer, i) => {
            return {
                id: i,
                answer: answer,
                selected: false,
            };
        })
    );
    const [answersMapped, setAnswersMapped] = React.useState(
        answers.map((arr) => (
            <Answer
                key={arr.id}
                answer={arr.answer}
                selectAnswer={() => selectAnswer(arr.id)}
                selected={arr.selected}
            />
        ))
    );

    useEffect(() => {
        setAnswersMapped(
            answers.map((arr) => (
                <Answer
                    key={arr.id}
                    answer={arr.answer}
                    selectAnswer={() => selectAnswer(arr.id)}
                    selected={arr.selected}
                />
            ))
        );
    }, [answers]);

    const selectAnswer = (id) => {
        props.setSelectedAnswers((prevObj) => ({
            ...prevObj,
            [props.number]: { ...answers[id], correctAnswer: correctAnswer },
        }));
        setAnswers((prevAnswers) =>
            prevAnswers.map((answer) => {
                if (id == answer.id) {
                    return { ...answer, selected: true };
                } else {
                    return { ...answer, selected: false };
                }
            })
        );
    };

    return (
        <div className="full-question">
            <p className="question animate__animated animate__fadeInLeft">
                {props.number}. {he.decode(props.question)}
            </p>
            <ul className="answers">{answersMapped}</ul>
        </div>
    );
}
