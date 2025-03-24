export function Heading({ label }) {
  return <div style={styles.heading}>{label}</div>;
}

const styles = {
  heading: {
      fontWeight: "bold",
      fontSize: "32px",
      paddingTop: "24px",
  },
};
