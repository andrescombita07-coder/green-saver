import { useAuth } from "@/src/context/AuthContext";
import { appendStoredCalculation } from "@/src/services/storage";
import { Colors } from "@/src/theme/colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function Calculator() {
  const router = useRouter();
  const { user } = useAuth();
  const [consumption, setConsumption] = useState("");
  const [calculated, setCalculated] = useState(null);

  const handleCalculate = async () => {
    const parsedConsumption = Number(consumption);

    if (!parsedConsumption || parsedConsumption <= 0) {
      Alert.alert("Dato inválido", "Ingresa un consumo mensual mayor a cero.");
      return;
    }

    const panelOutput = 75;
    const estimatedPanels = Math.max(1, Math.ceil(parsedConsumption / panelOutput));
    const estimatedGeneration = estimatedPanels * panelOutput;
    const coverage = Math.min(100, Math.round((estimatedGeneration / parsedConsumption) * 100));
    const estimatedSavings = Math.round(parsedConsumption * 0.65);
    const recommendation =
      coverage >= 90
        ? "Sistema altamente viable"
        : coverage >= 60
          ? "Sistema viable con ajuste"
          : "Requiere evaluación adicional";

    const result = {
      id: String(Date.now()),
      date: new Date().toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      consumption: parsedConsumption,
      estimatedPanels,
      coverage,
      estimatedSavings,
      recommendation,
      requestedBy: user?.email || "cliente@correo.com",
      clientName: user?.name || "Cliente",
    };

    await appendStoredCalculation(result);
    setCalculated(result);
    router.push({ pathname: "/results", params: result });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.glowOne} />
      <View style={styles.glowTwo} />

      <View style={styles.heroCard}>
        <Text style={styles.kicker}>Simulación</Text>
        <Text style={styles.title}>Calculadora solar</Text>
        <Text style={styles.subtitle}>
          Escribe tu consumo mensual para obtener una estimación rápida.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Consumo mensual (kWh)</Text>
        <Text style={styles.helper}>Ingresa tu promedio mensual para calcular una propuesta inicial.</Text>
        <TextInput
          value={consumption}
          onChangeText={setConsumption}
          placeholder="Ej. 320"
          placeholderTextColor={Colors.gray}
          keyboardType="numeric"
          style={styles.input}
        />

        <Pressable style={styles.button} onPress={handleCalculate}>
          <Text style={styles.buttonText}>Calcular sistema</Text>
        </Pressable>
      </View>

      {calculated ? (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Último cálculo</Text>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Paneles</Text>
            <Text style={styles.resultValue}>{calculated.estimatedPanels}</Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Cobertura</Text>
            <Text style={styles.resultValue}>{calculated.coverage}%</Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Ahorro</Text>
            <Text style={styles.resultValue}>{calculated.estimatedSavings} kWh</Text>
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    overflow: "hidden",
  },
  content: {
    padding: 20,
    gap: 14,
    paddingBottom: 24,
    position: "relative",
  },
  glowOne: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 220,
    backgroundColor: "rgba(0, 168, 89, 0.10)",
    top: -70,
    right: -120,
  },
  glowTwo: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 170,
    backgroundColor: "rgba(237, 50, 55, 0.07)",
    bottom: 80,
    left: -90,
  },
  heroCard: {
    backgroundColor: "rgba(255,255,255,0.94)",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E4EEE8",
  },
  kicker: {
    color: Colors.gray,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontSize: 12,
    marginBottom: 6,
  },
  title: {
    fontSize: 24,
    color: Colors.primary,
    fontWeight: "700",
    marginBottom: 15,
  },
  subtitle: {
    color: Colors.dark,
    lineHeight: 21,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.94)",
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E4EEE8",
    gap: 12,
  },
  label: {
    color: Colors.dark,
    fontWeight: "600",
  },
  helper: {
    color: Colors.gray,
    lineHeight: 20,
  },
  input: {
    backgroundColor: "#F6F8F7",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DCE7E1",
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: Colors.dark,
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
  resultCard: {
    backgroundColor: "#F2F8F3",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#DCE7E1",
    padding: 18,
    gap: 6,
  },
  resultTitle: {
    color: Colors.primary,
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 8,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(220, 231, 225, 0.7)",
  },
  resultLabel: {
    color: Colors.gray,
  },
  resultValue: {
    color: Colors.dark,
    fontWeight: "700",
  },
});
