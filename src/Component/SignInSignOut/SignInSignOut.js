
import { Button } from '@material-ui/core';
import firebase from "firebase/app";
import "firebase/auth";
import React, { useState } from 'react';
import firebaseConfig from '../../firebase.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faGoogle, faGitSquare, faGithubAlt, faGithub } from '@fortawesome/free-brands-svg-icons'
import { Form, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
firebase.initializeApp(firebaseConfig);


const SignInSignOut = () => {
    const [User, setUser] = useState({
        isSigned: false,
        name: '',
        email: '',
        photo: '',
        password: '',
        success: false
    })
    const [newUser, setnewUser] = useState(false)

    const Authentication = (res) => {
        const { displayName, photoURL, email } = res.user;
        const isAuthenticated = {
            isSigned: true,
            name: displayName,
            email: email,
            photo: photoURL,
        }
        return isAuthenticated;
    }


    //Sign in With Google 
    const handleSignInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                console.log(result);
                setUser(Authentication(result))

            })
            .catch(error => {
                console.log(error.errorCode);
            })
    }

    //Sign in With Facebook
    const handleSignInWithFb = () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                console.log(result);
                setUser(Authentication(result))
            })
            .catch(error => {
                console.log(error.errorCode);
            })
    }

    //Sign in With GIthub
    const handleSignInWithGithub = () => {
        const provider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                console.log(result);
                setUser(Authentication(result))
            })
            .catch(error => {
                console.log(error);
            })
    }

    //Sign Out 
    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(() => {
                const isAuthenticated = {
                    isSigned: false,
                    name: '',
                    email: '',
                    photo: '',
                }
                setUser(isAuthenticated)
            }).catch((error) => {
                console.log(error);
            });
    }


    //Email and Pass Validation Check
    const handleInputCheck = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value) // email Validation
        }
        if (e.target.name === 'password') {
            const passCheck = /\d{1}/
            isFieldValid = passCheck.test(e.target.value)
        }

        if (isFieldValid) {
            const newUserInfo = { ...User }
            newUserInfo[e.target.name] = e.target.value
            setUser(newUserInfo)
        }
        e.preventDefault()
    }

    //Sign in With Email and Password
    const SignInWithEmailPass = (e) => {
        if (newUser === true && User.email && User.password && User.name) {
            firebase.auth().createUserWithEmailAndPassword(User.email, User.password) //Create User with Email and Password
                .then((res) => {
                    const newUserInfo = { ...User }
                    newUserInfo.success = true
                    newUserInfo[e.target.name] = e.target.value
                    setUser(newUserInfo);
                    console.log(res);
                })
                .catch(error => {
                    console.log(error);
                })
        }
        e.preventDefault()
    }

    //Login With Email and Pass
    const LogInWithEmailPass = (e) => {
        if (newUser === false && User.email && User.password) {
            firebase.auth().signInWithEmailAndPassword(User.email, User.password)
                .then((res) => {
                    const newUserInfo = { ...User }
                    newUserInfo.success = true;
                    newUserInfo.isSigned = true;
                    newUserInfo[e.target.name] = e.target.value
                    setUser(newUserInfo);
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        e.preventDefault()
    }

    return (
        <div style={{ width: '40%', margin: '0 auto' }} className="mt-5">
            {
                !User.isSigned && <h2 style={{ textAlign: 'center' }}>Please Sign in</h2>
            }
            {
                !User.isSigned && <div style={{ textAlign: 'center' }}>
                    <Button color='primary' variant="contained" style={{ marginRight: '3px' }} onClick={handleSignInWithFb}><FontAwesomeIcon size="2x" icon={faFacebookSquare} /></Button>
                    <Button color='secondary' variant="contained" style={{ marginRight: '3px' }} onClick={handleSignInWithGoogle}><FontAwesomeIcon size="2x" icon={faGoogle} /></Button>
                    <Button color='secondary' variant="contained" style={{ marginRight: '3px' }} onClick={handleSignInWithGithub}><FontAwesomeIcon size="2x" icon={faGithub} /></Button>
                </div>
            }

            {
                User.isSigned === true && <div>
                    <h3>Welcome, {User.name}</h3>
                    <p>Email : {User.email}</p>
                    <img src={User.photo} alt={User.name} /><br />
                    <Button color='primary' variant="contained" onClick={handleSignOut}>Sign Out</Button>
                </div>
            }
            <br />
            <hr />
            {
                !User.isSigned && <div>
                    <Form>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="I'm New User" onClick={() => setnewUser(!newUser)} />
                        </Form.Group>
                        {
                            newUser &&
                            <Form.Group>
                                <FormControl type="text" placeholder="Enter Your Name" name="name" onBlur={handleInputCheck} />
                                <Form.Label className="my-1">Date Of Birth</Form.Label>
                                <FormControl type="date" name="dateOfBirth" />
                            </Form.Group>
                        }
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter email" name="email" required onBlur={handleInputCheck} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                    </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" name="password" required onBlur={handleInputCheck} />
                            <Form.Text id="passwordHelpBlock" muted>
                                Your password must Greater Then 6 characters long, contain letters and numbers, and
                                must one Upper Case Letter and One Number. do not Use Space or emoji.
                    </Form.Text>
                        </Form.Group>
                        {
                            newUser ? <Button variant="outlined" color="primary" type="submit" onClick={SignInWithEmailPass}>Sign In</Button> :
                                <Button variant="outlined" color="secondary" type="submit" onClick={LogInWithEmailPass}>Log in</Button>
                        }
                    </Form>
                </div>
            }
        </div>
    );
};

export default SignInSignOut;