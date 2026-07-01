import {
  useContext,
} from "react";

import {
  Redirect,
} from "expo-router";

import {
  AuthContext,
} from "../src/context/AuthContext";

export default function Index() {
  const { user } =
    useContext(AuthContext);

  if (user) {
    return (
      <Redirect href="/(tabs)/home" />
    );
  }

  return (
    <Redirect href="/(auth)/login" />
  );
}