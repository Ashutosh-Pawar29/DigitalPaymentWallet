import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Signin = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <div style={styles.card}>
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox placeholder="username" label={"Email"} />
          <InputBox placeholder="Password" label={"Password"} />
          <div style={styles.buttonContainer}>
            <Button
              label={"Sign in"}
              onClick={() => {
                navigate("/homepage"); // Navigate to the homepage
              }}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#cbd5e1",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderRadius: "8px",
    backgroundColor: "white",
    width: "320px",
    textAlign: "center",
    padding: "16px",
    maxHeight: "max-content",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  buttonContainer: {
    paddingTop: "16px",
  },
};
