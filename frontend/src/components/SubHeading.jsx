export function SubHeading({ label }) {
  return <div style={styles.subHeading}>{label}</div>;
}

const styles = {
  subHeading: {
      color: "rgba(255, 255, 255, 0.85)", 
      fontSize: "14px",

      paddingTop: "4px",
      paddingLeft: "16px",
      paddingRight: "16px",
      paddingBottom: "16px",

      textAlign: "center",

      // optional subtle glow for readability
      textShadow: "0px 1px 4px rgba(0,0,0,0.6)",
  },
};
