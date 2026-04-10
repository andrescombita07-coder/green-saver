import { Colors } from "@/src/theme/colors";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const maintenanceTasks = [
  {
    id: 1,
    month: "Abr 2026",
    task: "Inspección visual de módulos y estructura",
    status: "Pendiente",
  },
  {
    id: 2,
    month: "Jun 2026",
    task: "Limpieza preventiva de paneles",
    status: "Programado",
  },
  {
    id: 3,
    month: "Sep 2026",
    task: "Revisión de inversor y protecciones",
    status: "Programado",
  },
];

export default function InstalledSystem() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.glowOne} />
      <View style={styles.glowTwo} />

      <View style={styles.heroCard}>
        <Text style={styles.kicker}>Cliente con sistema activo</Text>
        <Text style={styles.title}>Mi sistema instalado</Text>
        <Text style={styles.subtitle}>Monitorea la información del sistema vendido y el plan de mantenimientos preventivos.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Datos del cliente</Text>
        <Text style={styles.cardText}>Nombre: Carlos Ramírez</Text>
        <Text style={styles.cardText}>Ciudad: San Salvador</Text>
        <Text style={styles.cardText}>Vivienda: Residencial El Bosque</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sistema vendido</Text>
        <Text style={styles.cardText}>Capacidad: 4.5 kWp</Text>
        <Text style={styles.cardText}>Paneles: 10 módulos de 450W</Text>
        <Text style={styles.cardText}>Inversor: 5 kW híbrido</Text>
        <Text style={styles.cardText}>Batería: 10 kWh litio</Text>
        <Text style={styles.cardText}>Fecha de instalación: 15 feb 2026</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Mantenimiento preventivo</Text>
        {maintenanceTasks.map((item) => (
          <View key={item.id} style={styles.taskItem}>
            <View>
              <Text style={styles.taskMonth}>{item.month}</Text>
              <Text style={styles.taskText}>{item.task}</Text>
            </View>
            <Text style={styles.taskStatus}>{item.status}</Text>
          </View>
        ))}
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
    bottom: 60,
    left: -90,
  },
  heroCard: {
    backgroundColor: "rgba(255,255,255,0.94)",
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
    backgroundColor: "rgba(255,255,255,0.94)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E4EEE8",
    padding: 18,
    gap: 6,
  },
  cardTitle: {
    color: Colors.dark,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  cardText: {
    color: Colors.gray,
  },
  taskItem: {
    borderWidth: 1,
    borderColor: "#E4EEE8",
    borderRadius: 14,
    padding: 12,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  taskMonth: {
    color: Colors.primary,
    fontWeight: "700",
    marginBottom: 3,
  },
  taskText: {
    color: Colors.dark,
    maxWidth: 230,
  },
  taskStatus: {
    color: Colors.info,
    fontWeight: "700",
  },
});
