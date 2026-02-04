import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import background from "../assets/background.jpg";
import Topbar from "../components/Topbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Homepage } from "./Homepage";
import API_URL from "../config/api";


export const AuthPage = () => {
  const [isSignin, setIsSignin] = useState(true);
  const [inputname, setInputname] = useState("");
  const [inputlastname, setInputlastname] = useState("");
  const [inputemail, setInputemail] = useState("");
  const [inputpassword, setInputpassword] = useState("");

  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <motion.div
          style={styles.card}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={styles.appIdentity}>
            <h2 style={styles.appName}>PayAnytime</h2>
            <p style={styles.welcomeMessage}>
              Welcome to your digital payment wallet
            </p>
          </div>
          {isSignin ? (
            <>
              <Heading label={"Sign in"} />
              <SubHeading
                label={"Enter your credentials to access your account"}
              />
              <InputBox
                placeholder="username"
                label={"Email"}
                onChange={(e) => {
                  setInputemail(e.target.value);
                }}
              />
              <InputBox
                placeholder="Password"
                label={"Password"}
                onChange={(e) => {
                  setInputpassword(e.target.value);
                }}
              />
              <div style={styles.buttonContainer}>
                <Button
                  label={"Sign in"}
                  onClick={async () => {
                    try {
                      const res = await fetch(`${API_URL}/signin`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          username: inputemail,
                          password: inputpassword,
                        }), 
                      });
                      const data = await res.json();
                      if (res.status == 200) {
                        localStorage.setItem("Token", data.token);
                        
                        navigate(data.route);
                      }
                      if(res.status==400){
                        alert("email should be a valid email address containing @gmail.com \n password should be minimum 6 chars :\n(with 1 capital alphabet,1 small alphabet,1 number and 1 special character)")
                      }
                      
                    } catch {}
                  }}
                />
              </div>
              <BottomWarning
                label={"Don't have an account?"}
                buttonText={"Sign up"}
                onClick={() => setIsSignin(false)}
              />
            </>
          ) : (
            <>
              <Heading label={"Sign up"} />
              <SubHeading
                label={"Enter your information to create an account"}
              />
              <InputBox
                placeholder="John"
                label={"First Name"}
                onChange={(e) => {
                  setInputname(e.target.value);
                }}
              />
              <InputBox
                placeholder="Doe"
                label={"Last Name"}
                onChange={(e) => {
                  setInputlastname(e.target.value);
                }}
              />
              <InputBox
                placeholder="email address"
                label={"Email"}
                onChange={(e) => {
                  setInputemail(e.target.value);
                }}
              />
              <InputBox
                placeholder="123456"
                label={"Password"}
                onChange={(e) => {
                  setInputpassword(e.target.value);
                }}
              />
              <div style={styles.buttonContainer}>
                <Button
                  label={"Sign up"}
                  onClick={async () => {
                    try {
                      const res = await fetch(`${API_URL}/signup`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          firstName: inputname,
                          lastName: inputlastname,
                          username: inputemail,
                          password: inputpassword,
                        }), 
                      });
                      const data = await res.json();
                      if (res.status == 201) {
                        localStorage.setItem("Token", data.token);
                        navigate(data.route);
                      }
                      // if(res.status==400){
                      //   alert("check the data :\n First & Last Name should have minimun 4 characaters \n email should be a valid email address containing @gmail.com \n password should be minimum 6 chars :\n(with 1 capital alphabet,1 small alphabet,1 number and 1 special character)")
                      // }
                      else {
                        alert(data.message || "Invalid data. Please check your inputs.");
                      }
                    } catch {}
                  }}
                />
              </div>
              <BottomWarning
                label={"Already have an account?"}
                buttonText={"Sign in"}
                onClick={() => setIsSignin(true)}
              />
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
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
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.15)", 
    backdropFilter: "blur(5px)",
    width: "350px",
    textAlign: "center",
    padding: "24px",
    boxShadow: "0px 8px 20px rgba(0, 0, 255, 0.3)", 
    transition: "transform 0.3s ease-in-out",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },
  appIdentity: {
    marginBottom: "20px",
  },
  appName: {
    fontSize: "35px",
    fontWeight: "bold",
    color: "black",
  },
  welcomeMessage: {
    fontSize: "16px",
    color: "black",
  },
  buttonContainer: {
    paddingTop: "20px",
  },
};
