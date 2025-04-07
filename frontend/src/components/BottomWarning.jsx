import { button } from "framer-motion/client";

export function BottomWarning({ label, buttonText, onClick }) {
    return (
        <div style={styles.container}>
            <div>{label}</div>
            <button style={styles.button} onClick={onClick}>
                {buttonText}
            </button>
        </div>
    );
}

const styles = {
    button:{
        background: "transparent",
  border: "none",
  fontSize: "16px",
  fontWeight: "bold",
  color: "rgba(255, 255, 255, 0.8)", // Slightly visible white color
  cursor: "pointer",
  textDecoration: "underline"
    },
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
