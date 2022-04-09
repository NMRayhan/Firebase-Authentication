import "./App.css";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "./firebase.init";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [Registered, setRegistered] = useState(false);
  const [validated, setValidated] = useState(false);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");

  const handleBlurEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleBlurPassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeCheck = (event) => {
    setRegistered(event.target.checked);
    console.log(Registered);
  };

  const handleForgotPassword = () =>{
    sendPasswordResetEmail(auth, Email)
    .then(()=>{
      console.log("Password reset email sent!");
      setError("")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage)
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    if (Registered) {
      signInWithEmailAndPassword(auth, Email, Password)
        .then((result) => {
          console.log(result.user);
          setError("");
        })
        .catch((error) => {
          const errorMessage = error.message;
          setError(errorMessage);
        });
    } else {
      createUserWithEmailAndPassword(auth, Email, Password)
        .then((result) => {
          console.log(result.user);
          emailVerify()
          setRegistered(true);
          setPassword("");
          setEmail("");
        })
        .catch((error) => {
          const errorMessage = error.message;
          setError(errorMessage);
        });
    }

    setValidated(true);
  };

  const emailVerify = () =>{
    sendEmailVerification(auth.currentUser)
    .then(()=>{
      console.log("Email Verification send");
    })
  }


  return (
    <div>
      <Container className="mt-3">
        <Form
          className="w-50 m-auto"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Label className="text-primary fs-1 fw-lighter">
            User {Registered ? "Login" : "Registration"}
          </Form.Label>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={handleBlurEmail}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please Provide a valid email
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks Good</Form.Control.Feedback>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          {Registered ? (
            ""
          ) : (
            <Form.Group>
              <Form.Label>User User Name</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Enter User Name"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          )}

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={handleBlurPassword}
              type="password"
              placeholder="Password"
              required
            />
            <Form.Control.Feedback type="invalid">
              Password Must be needed
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks Good</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              onChange={handleChangeCheck}
              type="checkbox"
              label="Already Registered"
            />
          </Form.Group>
          <p className="text-danger fs-3">{Error}</p>
          <Button variant="link" onClick={handleForgotPassword}>Forgot password</Button><br />
          <Button variant="primary" className="mt-2" type="submit">
            {Registered ? "Login" : "Submit"}
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default App;
