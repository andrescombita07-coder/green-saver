import { Redirect } from "expo-router";

export default function Index() {
  const user = null; // luego vendrá del backend

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/dashboard" />;
}
``