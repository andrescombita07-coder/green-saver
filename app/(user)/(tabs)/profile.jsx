import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../src/theme/colors";

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>Perfil de Usuario</Text>
        <Text style={styles.info}>correo@ejemplo.com</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: Colors.surface,
    padding: 25,
    borderRadius: 15,
  },
  name: {
    fontSize: 20,
    color: Colors.primary,
  },
  info: {
    color: Colors.gray,
    marginTop: 10,
  },
});
``