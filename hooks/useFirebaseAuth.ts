import { useEffect } from "react";
import firebase from "../firebase";

import { logIn, logOut } from "../redux/authSlice";
import { useDispatch } from "react-redux";

export default function useFirebaseAuth() {
  const dispatch = useDispatch();
  //check the auth state
  useEffect(() => {
    const firebaseListener = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        console.log("auth state changed");
        if (user) {
          // User is signed in.
          dispatch(logIn());
        } else {
          // No user is signed in.
          dispatch(logOut());
        }
      });

    return function cleanUp() {
      firebaseListener();
    };
  }, []);
}
