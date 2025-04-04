export function SubHeading({ label }) {
  return <div style={styles.subHeading}>{label}</div>;
}

const styles = {
  subHeading: {
      color: "black", 
      fontSize: "14px",
      paddingTop: "4px",
      paddingLeft: "16px",
      paddingRight: "16px",
      paddingBottom: "16px",
  },
};
