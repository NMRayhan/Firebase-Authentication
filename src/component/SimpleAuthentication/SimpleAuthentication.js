/* eslint-disable jsx-a11y/anchor-is-valid */
import { CheckIcon, LockClosedIcon } from "@heroicons/react/solid";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import app from "../../firebase.init";
const auth = getAuth(app);

const SimpleAuthentication = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [UserName, setUserName] = useState("");
  const [Registered, setRegistered] = useState(false);

  const handleSignInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignInWithFacebook = () => {
    const facebookProvider = new FacebookAuthProvider();
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBlurUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleBlurEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleBlurPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleCheckBox = (e) => {
    setRegistered(e.target.checked);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (Registered) {
      signInWithEmailAndPassword(auth, Email, Password)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      createUserWithEmailAndPassword(auth, Email, Password)
        .then((result) => {
          console.log(result);
          userName();
          setEmail(" ");
          setPassword(" ");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const userName = () => {
    updateProfile(auth.currentUser, {
      displayName: UserName,
    }).then(() => {
      console.log("User Create Successfully");
    });
  };

  const forgotPassword = () => {
    sendPasswordResetEmail(auth, Email)
      .then(() => {
        console.log(`Password Reset Link send Your, ${Email}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {Registered ? "Login to your account " : "Sign in for new user"}
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmitForm}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              {Registered ? (
                <></>
              ) : (
                <div>
                  <label htmlFor="user-name" className="sr-only">
                    User Name
                  </label>
                  <input
                    id="user-name"
                    name="user-name"
                    type="text"
                    autoComplete="user name"
                    required
                    onBlur={handleBlurUserName}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="User name"
                  />
                </div>
              )}

              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onBlur={handleBlurEmail}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onBlur={handleBlurPassword}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  onClick={handleCheckBox}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Already have an account
                </label>
              </div>

              <div className="text-sm">
                {Registered ? (
                  <a
                    href="#"
                    onClick={forgotPassword}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
          <hr />
          <div>
            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              onClick={handleSignInWithGoogle}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <CheckIcon
                  className="h-5 w-5 text-orange-500 group-hover:text-orange-400"
                  aria-hidden="true"
                />
              </span>
              Continue with Google
            </button>
            <h2 className="text-center text-blue-500 text-2xl font-light">
              Or
            </h2>
            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleSignInWithFacebook}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <CheckIcon
                  className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                  aria-hidden="true"
                />
              </span>
              Continue with Facebook
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimpleAuthentication;
