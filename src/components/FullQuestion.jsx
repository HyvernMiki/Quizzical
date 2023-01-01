import he from "he";
import React, { useEffect } from "react";
import "animate.css";

function Answer({ selected, off, correct, wrong, selectAnswer, answer }) {
    return (
        <li
            className={`answer animate__animated animate__fadeInRight ${
                selected ? "answer-selected" : ""
            } ${off ? "answer-off" : ""} ${correct ? "answer-correct" : ""} ${
                wrong ? "answer-wrong" : ""
            }`}
            onClick={off || correct || wrong ? () => {} : selectAnswer}
        >
            {answer}
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
                wrong: false,
                off: false,
                correct: false,
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
                wrong={arr.wrong}
                off={arr.off}
                correct={arr.correct}
            />
        ))
    );

    useEffect(() => {
        if (props.userAnswer) {
            setAnswers((prevAnswers) => {
                return prevAnswers.map((answer) => {
                    if (!props.userAnswer) return { ...answer };
                    else if (answer.answer === props.userAnswer.correctAnswer) {
                        return { ...answer, correct: true };
                    } else if (
                        props.userAnswer.answer !== props.userAnswer.correctAnswer &&
                        props.userAnswer.answer === answer.answer
                    ) {
                        return { ...answer, wrong: true };
                    } else {
                        return { ...answer, off: true };
                    }
                });
            });
        }
    }, [props.userAnswer]);

    useEffect(() => {
        setAnswersMapped(
            answers.map((arr) => (
                <Answer
                    key={arr.id}
                    answer={arr.answer}
                    selectAnswer={() => selectAnswer(arr.id)}
                    selected={arr.selected}
                    wrong={arr.wrong}
                    off={arr.off}
                    correct={arr.correct}
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
