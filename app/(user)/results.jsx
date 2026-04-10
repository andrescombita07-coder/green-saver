import { Colors } from "@/src/theme/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Results() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.kicker}>Resultado</Text>
        <Text style={styles.title}>Sistema solar estimado</Text>

        <Text style={styles.row}>Consumo: {params.consumption ?? "N/D"} kWh</Text>
        <Text style={styles.row}>Paneles recomendados: {params.estimatedPanels ?? "N/D"}</Text>
        <Text style={styles.row}>Cobertura estimada: {params.coverage ?? "N/D"}%</Text>
        <Text style={styles.row}>Ahorro estimado: {params.estimatedSavings ?? "N/D"} kWh</Text>
        <Text style={styles.recommendation}>{params.recommendation ?? "Sin recomendación disponible"}</Text>

        <Pressable style={styles.button} onPress={() => router.push("/history")}>
          <Text style={styles.buttonText}>Ir al historial</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E4EEE8",
    padding: 20,
  },
  kicker: {
    color: Colors.gray,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontSize: 12,
    marginBottom: 6,
  },
  title: {
    color: Colors.primary,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  row: {
    color: Colors.dark,
    marginBottom: 8,
  },
  recommendation: {
    color: Colors.primary,
    fontWeight: "700",
    marginTop: 4,
    marginBottom: 18,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.surface,
    fontWeight: "700",
  },
});
