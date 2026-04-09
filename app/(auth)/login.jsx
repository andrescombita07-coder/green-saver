import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../src/theme/colors";

export default function Login() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GREEN SAVER</Text>

      <View style={styles.button}>
        <Button
          title="Iniciar sesión"
          color={Colors.primary}
          onPress={() => router.replace("/(user)/(tabs)")}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Registrarse"
          color={Colors.info}
          onPress={() => router.push("/register")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 30,
  },
  title: {
    fontSize: 24,
    color: Colors.dark,
    marginBottom: 30,
  },
  button: {
    marginVertical: 10,
  },
});
``