import { useAuth } from "@/src/context/AuthContext";
import { getStoredCalculations, getStoredUsers } from "@/src/services/storage";
import { Colors } from "@/src/theme/colors";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Statistics() {
  const { user, loading } = useAuth();
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalCalculations: 0,
    averageCoverage: 0,
    averagePanels: 0,
  });

  useEffect(() => {
    const loadMetrics = async () => {
      const [users, calculations] = await Promise.all([
        getStoredUsers(),
        getStoredCalculations(),
      ]);

      const coverageAverage = calculations.length
        ? Math.round(
            calculations.reduce((sum, item) => sum + (item.coverage || 0), 0) /
              calculations.length,
          )
        : 0;

      const panelsAverage = calculations.length
        ? Math.round(
            calculations.reduce((sum, item) => sum + (item.estimatedPanels || 0), 0) /
              calculations.length,
          )
        : 0;

      setMetrics({
        totalUsers: users.length,
        totalCalculations: calculations.length,
        averageCoverage: coverageAverage,
        averagePanels: panelsAverage,
      });
    };

    if (user?.role === "admin") {
      loadMetrics();
    }
  }, [user?.role]);

  if (loading) return null;

  if (!user) return <Redirect href="/login" />;

  if (user.role !== "admin") return <Redirect href="/(user)/(tabs)" />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.glowOne} />
      <View style={styles.glowTwo} />

      <View style={styles.heroCard}>
        <Text style={styles.kicker}>Resumen general</Text>
        <Text style={styles.title}>Estadísticas</Text>
        <Text style={styles.subtitle}>Métricas rápidas del uso del sistema y de los cálculos guardados.</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Usuarios</Text>
          <Text style={styles.metricValue}>{metrics.totalUsers}</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Cálculos</Text>
          <Text style={styles.metricValue}>{metrics.totalCalculations}</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Cobertura promedio</Text>
          <Text style={styles.metricValue}>{metrics.averageCoverage}%</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Paneles promedio</Text>
          <Text style={styles.metricValue}>{metrics.averagePanels}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 20,
    gap: 14,
    paddingBottom: 24,
    position: "relative",
    overflow: "hidden",
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
    bottom: 70,
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
    color: Colors.primary,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.dark,
    lineHeight: 21,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  metricCard: {
    width: "48%",
    backgroundColor: "rgba(255,255,255,0.94)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E4EEE8",
    padding: 16,
  },
  metricLabel: {
    color: Colors.gray,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  metricValue: {
    color: Colors.primary,
    fontSize: 26,
    fontWeight: "700",
  },
});
