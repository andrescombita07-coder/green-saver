import { View, Text, StyleSheet, Button } from "react-native";
import { Colors } from "../../../src/theme/colors";

export default function Calculator() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora Solar</Text>

      <View style={styles.card}>
        <Text>Ingresa tu consumo energético mensual</Text>
        <Button title="Calcular" color={Colors.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: Colors.dark,
    marginBottom: 15,
  },
  card: {
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: 15,
  },
});
``