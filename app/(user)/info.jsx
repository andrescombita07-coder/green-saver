import { Colors } from "@/src/theme/colors";
import { StyleSheet, Text, View } from "react-native";

export default function Info() {
  return (
    <View style={styles.container}>
      <View style={styles.heroCard}>
        <Text style={styles.kicker}>Aprende</Text>
        <Text style={styles.title}>Energía solar</Text>
        <Text style={styles.subtitle}>Conceptos básicos para entender el ahorro y la viabilidad de un sistema fotovoltaico.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>¿Por qué instalar solar?</Text>
        <Text style={styles.cardText}>Reduce tu factura, disminuye emisiones y mejora la autonomía energética del hogar.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>¿Cómo funciona?</Text>
        <Text style={styles.cardText}>Los paneles convierten la radiación solar en energía eléctrica para uso inmediato o almacenamiento.</Text>
      </View>
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
    borderWidth: 1,
    borderColor: "#E4EEE8",
    padding: 18,
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
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.dark,
    lineHeight: 21,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E4EEE8",
    padding: 18,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.dark,
    marginBottom: 8,
  },
  cardText: {
    color: Colors.gray,
    lineHeight: 21,
  },
});