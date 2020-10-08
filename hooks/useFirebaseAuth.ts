import { useEffect } from "react";
import firebase from "../firebase";

import { logIn, logOut, selectAuthenticated } from "../redux/authSlice";
import { reset as profileReset } from "../redux/profileSlice";
import { reset as exploreReset } from "../redux/exploreSlice";
import { reset as feedReset } from "../redux/feedSlice";
import { reset as contentReset } from "../redux/contentSlice";
import { useDispatch, useSelector } from "react-redux";

export default function useFirebaseAuth() {
  const dispatch = useDispatch();
  const authenticated = useSelector(selectAuthenticated);
  //check the auth state
  useEffect(() => {
    const firebaseListener = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (user) {
          // User is signed in.
          dispatch(logIn());
        } else {
          // No user is signed in. TODO: check if remove resets here
          if (authenticated) {
            dispatch(logOut());
            dispatch(profileReset());
            dispatch(feedReset());
            dispatch(exploreReset());
            dispatch(contentReset());
          } else dispatch(logOut());
        }
      });

    return function cleanUp() {
      firebaseListener();
    };
  }, []);
}
