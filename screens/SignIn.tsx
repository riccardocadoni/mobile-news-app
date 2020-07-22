import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import { TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { Text, View } from "../components/Themed";

import {
  signUserIn,
  deleteErrorMessage,
  selectErrorMessage,
  selectIsLoading,
} from "../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { AuthNavigationProp } from "../types";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../constants/Colors";
import { BOLD_FONT, REGULAR_FONT } from "../constants/Font";

type SignInProps = AuthNavigationProp<"SignIn">;

const SignIn: React.SFC<SignInProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [psw, setPsw] = useState<string>("");
  const [isSignInButtonDisabled, setIsSignInButtonDisabled] = useState<boolean>(
    true
  );
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectErrorMessage);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (email && psw) setIsSignInButtonDisabled(false);
    else setIsSignInButtonDisabled(true);
  }, [email, psw]);

  const handleLogin = () => {
    dispatch(deleteErrorMessage());
    dispatch(signUserIn({ email, psw }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <View style={styles.textInputContainer}>
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
      </View>

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      {isLoading && <ActivityIndicator></ActivityIndicator>}
      <TouchableOpacity
        disabled={isSignInButtonDisabled}
        style={
          !isSignInButtonDisabled
            ? styles.signInButton
            : [{ ...styles.signInButton }, { backgroundColor: "grey" }]
        }
        onPress={handleLogin}
      >
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          errorMessage && dispatch(deleteErrorMessage());
          navigation.navigate("SignUp");
        }}
      >
        <Text style={styles.swapMethodText}>
          Don't have an Account? SIGN UP
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;

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
  signInButton: {
    alignItems: "center",
    backgroundColor: SECONDARY_COLOR,
    padding: 15,
    borderRadius: 10,
    width: 250,
    marginBottom: 30,
  },
  signInText: {
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
