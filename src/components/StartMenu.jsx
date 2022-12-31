import { Link } from "react-router-dom";

export default function StartMenu() {
    return (
        <main className="start-content">
            <h2 className="title">Quizzical</h2>
            <p className="description">
                Click the 'start quiz' button if you would like to start quiz, please
            </p>
            <Link className="start-button" to="/questions">
                Start quiz
            </Link>
        </main>
    );
}
