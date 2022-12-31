import { Link } from "react-router-dom";

export default function ErrorComponent(props) {
    return (
        <div className="error-main">
            <p className="error-message">{props.message}, please try again later</p>
            <Link className="error-home" to="/">
                Return to the homepage
            </Link>
        </div>
    );
}
