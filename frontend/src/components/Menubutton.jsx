import { motion } from "framer-motion";

export function Menubutton({ buttonText, handleClick, svgPath }) {
    

    

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ 
                scale: 1.08, 
                boxShadow: "0px 15px 35px rgba(72, 61, 139, 0.5)", 
                background: "rgba(200, 200, 200, 0.25)"
            }}
            whileTap={{ scale: 0.95 }}
            style={styles.buttonContainer}
            onClick={handleClick} // Trigger API call and navigation
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
        background: "#ffffff",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: 
            "inset 2px 2px 5px rgba(0, 0, 0, 0.1), " +
            "inset -4px -4px 8px rgba(0, 0, 0, 0.05), " +
            "0px 8px 25px rgba(72, 61, 139, 0.3)",
        transition: "all 0.3s ease-in-out",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
    },
    icon: {
        filter: "drop-shadow(0px 3px 6px rgba(72, 61, 139, 0.4))",
    },
    text: {
        background: "none",
        color: "#000000",
        fontWeight: "bold",
        fontSize: "15px",
        letterSpacing: "0.5px",
    },
};

export default Menubutton;
