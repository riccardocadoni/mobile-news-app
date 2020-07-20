import React, { useState } from "react";
import { StyleSheet } from "react-native";

import { TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { Text, View } from "../components/Themed";

import {
  logUserIn,
  deleteErrorMessage,
  selectErrorMessage,
  selectIsLoading,
} from "../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { AuthNavigationProp } from "../types";

type SignInProps = AuthNavigationProp<"SignIn">;

const SignIn: React.SFC<SignInProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [psw, setPsw] = useState<string>("");
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectErrorMessage);
  const isLoading = useSelector(selectIsLoading);
  const handleLogin = () => {
    dispatch(deleteErrorMessage());
    dispatch(logUserIn({ email, psw }));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setEmail(text)}
        placeholder={"Your Email"}
        //autoCompleteType={"email"}
        value={email}
      />
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setPsw(text)}
        placeholder={"Password"}
        //autoCompleteType={"password"}
        //textContentType={"password"}
        secureTextEntry={true}
        value={psw}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      {isLoading && <ActivityIndicator></ActivityIndicator>}
      <TouchableOpacity style={styles.createButton} onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text>Don't have an Account?</Text>
        <Text>SIGN UP</Text>
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
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  createButton: {
    alignItems: "center",
    backgroundColor: "orange",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: 250,
    marginTop: 80,
  },
  textInput: {
    flexDirection: "row",
    height: 60,
    width: 250,
    borderColor: "gray",
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  errorText: {
    fontSize: 15,
    color: "red",
  },
});
