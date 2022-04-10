import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import app from "../firebase.init";

const auth = getAuth(app);

const useFirebase = () => {
  const [User, setUser] = useState({});
  const signInWithGoogle = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        setUser(result.user);
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(()=>{
    onAuthStateChanged(auth, User=>{
        setUser(User)
    })
  },[])

  const handleSignOut = () =>{
    signOut(auth).then(()=>{})
  }

  return { 
    User, 
    signInWithGoogle,
    handleSignOut
   };
};

export default useFirebase;
