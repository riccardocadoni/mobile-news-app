import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
//types
import { AuthNavigationProp } from "../types";

type SignUpProps = AuthNavigationProp<"SignUp">;

const SignUp: React.SFC<SignUpProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [psw, setPsw] = useState<string>("");
  /* const dispatch = useDispatch();
  const errorMessage = useSelector(selectErrorMessage);
  const isLoading = useSelector(selectIsLoading);
  const handleSignUp = () => {
    dispatch(deleteErrorMessage());
    dispatch(logUserIn({ email, psw }));
  };  */

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
      {/*  {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        {isLoading && <ActivityIndicator></ActivityIndicator>} */}
      <TouchableOpacity style={styles.createButton}>
        <Text>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text>Alreadt have an Account?</Text>
        <Text>SIGN IN</Text>
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
