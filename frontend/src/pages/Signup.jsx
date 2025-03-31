import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                <div style={styles.card}>
                    <Heading label={"Sign up"} />
                    <SubHeading label={"Enter your information to create an account"} />

                    <InputBox
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="John"
                        label={"First Name"}
                    />
                    <InputBox
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe"
                        label={"Last Name"}
                    />
                    <InputBox
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="harkirat@gmail.com"
                        label={"Email"}
                    />
                    <InputBox
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="123456"
                        label={"Password"}
                    />

                    <div style={styles.buttonContainer}>
                        <Button
                        
                            onClick={async () => {
                                const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                    username,
                                    firstName,
                                    lastName,
                                    password,
                                });
                                localStorage.setItem("token", response.data.token);
                                navigate("/dashboard");
                            }}
                            label={"Sign up"}
                        ></Button>
                        
                    </div>
                            
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/"} />
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
