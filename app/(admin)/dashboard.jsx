import { useAuth } from "@/src/context/AuthContext";
import { Colors } from "@/src/theme/colors";
import { Redirect, useRouter } from "expo-router";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function AdminDashboard() {
  const router = useRouter();
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/login");
    } catch {
      Alert.alert("Error", "No se pudo cerrar sesión. Intenta nuevamente.");
    }
  };

  if (loading) return null;

  if (!user) {
    return <Redirect href="/login" />;
  }

  if (user.role !== "admin") {
    return <Redirect href="/(user)/(tabs)" />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.glowOne} />
      <View style={styles.glowTwo} />

      <View style={styles.heroCard}>
        <Text style={styles.kicker}>Panel de control</Text>
        <Text style={styles.title}>Administrador</Text>
        <Text style={styles.text}>
          Gestiona usuarios, métricas y acceso al sistema GREEN SAVER.
        </Text>
      </View>

      <View style={styles.grid}>
        <Pressable style={styles.actionCard} onPress={() => router.push("/users")}>
          <Text style={styles.actionTitle}>Usuarios</Text>
          <Text style={styles.actionText}>Ver, revisar o eliminar cuentas registradas.</Text>
        </Pressable>

        <Pressable style={styles.actionCard} onPress={() => router.push("/statistics")}>
          <Text style={styles.actionTitle}>Estadísticas</Text>
          <Text style={styles.actionText}>Consultar métricas generales del sistema.</Text>
        </Pressable>

        <Pressable style={styles.actionCard} onPress={() => router.push("/quotes")}>
          <Text style={styles.actionTitle}>Enviar cotización</Text>
          <Text style={styles.actionText}>Envía una propuesta a clientes que ya calcularon su sistema.</Text>
        </Pressable>
      </View>

      <View style={styles.sessionCard}>
        <Text style={styles.sessionLabel}>Sesión activa</Text>
        <Text style={styles.sessionValue}>{user.email}</Text>
      </View>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1F16",
    overflow: "hidden",
  },
  content: {
    padding: 20,
    paddingBottom: 24,
    gap: 14,
    justifyContent: "center",
    position: "relative",
  },
  glowOne: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 240,
    backgroundColor: "rgba(0, 168, 89, 0.14)",
    top: -80,
    right: -120,
  },
  glowTwo: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 180,
    backgroundColor: "rgba(237, 50, 55, 0.08)",
    bottom: 70,
    left: -90,
  },
  heroCard: {
    backgroundColor: "rgba(23, 49, 37, 0.96)",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#29543F",
  },
  kicker: {
    color: "#C6E7D5",
    textTransform: "uppercase",
    letterSpacing: 1.1,
    fontSize: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    color: Colors.surface,
    fontWeight: "700",
    marginBottom: 8,
  },
  text: {
    color: "#D7E5DB",
    lineHeight: 22,
  },
  grid: {
    gap: 12,
  },
  actionCard: {
    backgroundColor: "rgba(255,255,255,0.96)",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#2B503D",
  },
  actionTitle: {
    fontSize: 18,
    color: Colors.primary,
    fontWeight: "700",
    marginBottom: 6,
  },
  actionText: {
    color: Colors.dark,
    lineHeight: 20,
  },
  sessionCard: {
    backgroundColor: "rgba(21, 49, 36, 0.96)",
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#2B503D",
  },
  sessionLabel: {
    color: "#BFD2C5",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  sessionValue: {
    color: Colors.surface,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  logoutText: {
    color: Colors.surface,
    fontWeight: "700",
  },
});
