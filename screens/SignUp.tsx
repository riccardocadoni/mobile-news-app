import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
//types
import { AuthNavigationProp } from "../types";
import { BOLD_FONT, REGULAR_FONT } from "../constants/Font";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import {
  selectErrorMessage,
  selectIsLoading,
  deleteErrorMessage,
  signUserUp,
} from "../redux/authSlice";

type SignUpProps = AuthNavigationProp<"SignUp">;

const SignUp: React.SFC<SignUpProps> = ({ navigation }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [psw, setPsw] = useState<string>("");
  const [pswConfirm, setPswConfirm] = useState<string>("");
  const [isSignUpButtonDisabled, setIsSignUpButtonDisabled] = useState<boolean>(
    true
  );
  const [formError, setFormError] = useState<string>(null);
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectErrorMessage);
  const isLoading = useSelector(selectIsLoading);
  const handleSignUp = () => {
    dispatch(deleteErrorMessage());
    if (psw !== pswConfirm) setFormError("Passwords are different");
    else dispatch(signUserUp({ email, psw, firstName, lastName }));
  };

  useEffect(() => {
    formError && setFormError(null);

    if (firstName && lastName && email && psw && pswConfirm)
      setIsSignUpButtonDisabled(false);
    else setIsSignUpButtonDisabled(true);
  }, [firstName, lastName, email, pswConfirm, psw]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setFirstName(text)}
          placeholder={"First Name"}
          value={firstName}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setLastName(text)}
          placeholder={"Last Name"}
          value={lastName}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setEmail(text)}
          placeholder={"Your Email"}
          value={email}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setPsw(text)}
          placeholder={"Password"}
          secureTextEntry={true}
          value={psw}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setPswConfirm(text)}
          placeholder={"Confirm Password"}
          secureTextEntry={true}
          value={pswConfirm}
        />
        {formError && <Text style={styles.errorText}>{formError}</Text>}
      </View>

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      {isLoading && <ActivityIndicator></ActivityIndicator>}
      <TouchableOpacity
        disabled={isSignUpButtonDisabled}
        style={
          !isSignUpButtonDisabled
            ? styles.signUpButton
            : [{ ...styles.signUpButton }, { backgroundColor: "grey" }]
        }
        onPress={handleSignUp}
      >
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          errorMessage && dispatch(deleteErrorMessage());
          navigation.navigate("SignIn");
        }}
      >
        <Text style={styles.swapMethodText}>
          Don't have an Account? SIGN IN
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontFamily: BOLD_FONT,
    color: PRIMARY_COLOR,
  },
  textInputContainer: {
    marginVertical: 50,
  },
  textInput: {
    flexDirection: "row",
    height: 60,
    width: 250,
    borderColor: PRIMARY_COLOR,
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  signUpButton: {
    alignItems: "center",
    backgroundColor: SECONDARY_COLOR,
    padding: 15,
    borderRadius: 10,
    width: 250,
    marginBottom: 30,
  },
  signUpText: {
    fontSize: 15,
    fontFamily: BOLD_FONT,
    color: PRIMARY_COLOR,
  },
  swapMethodText: {
    fontSize: 15,
    fontFamily: REGULAR_FONT,
    color: PRIMARY_COLOR,
  },
  errorText: {
    fontSize: 15,
    color: "red",
    margin: 30,
  },
});
