import "./App.css";
import StartMenu from "./components/StartMenu";
import QuestionsPage from "./components/QuestionsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <div id="main-menu">
            <Router>
                <Routes>
                    <Route path="/" element={<StartMenu />} />
                    <Route path="/questions" element={<QuestionsPage />} />
                </Routes>
            </Router>
            <div className="dec-top-right"></div>
            <div className="dec-bottom-left"></div>
        </div>
    );
}

export default App;
