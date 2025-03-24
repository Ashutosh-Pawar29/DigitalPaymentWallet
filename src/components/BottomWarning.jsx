import { Link } from "react-router-dom";

export function BottomWarning({ label, buttonText, to }) {
    return (
        <div style={styles.container}>
            <div>{label}</div>
            <Link to={to} style={styles.link}>
                {buttonText}
            </Link>
        </div>
    );
}

const styles = {
    container: {
        padding: "8px 0",
        fontSize: "14px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    link: {
        paddingLeft: "4px",
        textDecoration: "underline",
        cursor: "pointer",
        color: "blue",
    },
};
