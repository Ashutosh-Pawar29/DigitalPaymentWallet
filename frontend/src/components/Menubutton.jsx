import { motion } from "framer-motion";

export function Menubutton({ buttonText, handleClick, svgPath }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}

            whileHover={{ 
                scale: 1.08,
                background: "rgba(255, 255, 255, 0.15)",
                boxShadow: "0px 10px 30px rgba(0,0,0,0.4)"
            }}

            whileTap={{ scale: 0.95 }}

            style={styles.buttonContainer}
            onClick={handleClick}
        >
            <img src={svgPath} alt="icon" width="60" height="60" style={styles.icon} />
            <span style={styles.text}>{buttonText}</span>
        </motion.div>
    );
}

const styles = {
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",

        width: "160px",
        height: "160px",
        borderRadius: "20px",

        // ✅ Glass effect
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",

        border: "1px solid rgba(255, 255, 255, 0.2)",

        boxShadow: "0px 6px 20px rgba(0,0,0,0.3)",

        transition: "all 0.3s ease-in-out",
        cursor: "pointer",
    },

    icon: {
        // ✅ subtle white glow instead of purple
        filter: "drop-shadow(0px 3px 6px rgba(255, 255, 255, 0.3))",
        marginBottom: "10px",
    },

    text: {
        color: "#ffffff", // ✅ white text
        fontWeight: "600",
        fontSize: "15px",
        letterSpacing: "0.5px",
    },
};

export default Menubutton;