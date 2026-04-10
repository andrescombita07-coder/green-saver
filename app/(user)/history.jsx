import { getStoredCalculations } from "@/src/services/storage";
import { Colors } from "@/src/theme/colors";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function History() {
  const router = useRouter();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const storedHistory = await getStoredCalculations();
      setHistory(storedHistory);
    };

    loadHistory();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.heroCard}>
        <Text style={styles.kicker}>Seguimiento</Text>
        <Text style={styles.title}>Historial de cálculos</Text>
        <Text style={styles.subtitle}>Revisa los últimos resultados guardados desde la calculadora.</Text>
      </View>

      {history.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Aún no hay cálculos guardados</Text>
          <Text style={styles.emptyText}>Haz un cálculo desde la pestaña Calculadora para empezar.</Text>
        </View>
      ) : (
        history.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.date}</Text>
            <Text style={styles.cardText}>Consumo: {item.consumption} kWh</Text>
            <Text style={styles.cardText}>Paneles: {item.estimatedPanels}</Text>
            <Text style={styles.cardText}>Cobertura: {item.coverage}%</Text>
            <Text style={styles.cardText}>{item.recommendation}</Text>

            <Pressable
              style={styles.detailButton}
              onPress={() => router.push({ pathname: "/history-detail", params: item })}
            >
              <Text style={styles.detailButtonText}>Ver detalle</Text>
            </Pressable>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    gap: 14,
  },
  heroCard: {
    backgroundColor: Colors.surface,
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
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.dark,
    lineHeight: 21,
  },
  emptyCard: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E4EEE8",
    padding: 18,
  },
  emptyTitle: {
    color: Colors.dark,
    fontWeight: "700",
    marginBottom: 6,
  },
  emptyText: {
    color: Colors.gray,
    lineHeight: 20,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E4EEE8",
    padding: 18,
    gap: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.dark,
  },
  cardText: {
    color: Colors.gray,
  },
  detailButton: {
    marginTop: 10,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  detailButtonText: {
    color: Colors.surface,
    fontWeight: "700",
  },
});
