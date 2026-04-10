import { useAuth } from "@/src/context/AuthContext";
import { Colors } from "@/src/theme/colors";
import { useRouter } from "expo-router";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Profile() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/login");
    } catch {
      Alert.alert("Error", "No se pudo cerrar sesión. Intenta nuevamente.");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.glowOne} />
      <View style={styles.glowTwo} />

      <View style={styles.card}>
        <Text style={styles.kicker}>Mi cuenta</Text>
        <Text style={styles.name}>{user?.name || "Perfil de Usuario"}</Text>
        <Text style={styles.info}>{user?.email || "correo@ejemplo.com"}</Text>
        <Text style={styles.role}>Rol: {user?.role || "user"}</Text>
      </View>

      <View style={styles.cardSecondary}>
        <Text style={styles.sectionTitle}>Acciones</Text>
        <Pressable onPress={() => router.push("/history")}>
          <Text style={styles.link}>Ver historial de cálculos</Text>
        </Pressable>
        <Pressable onPress={() => router.push("/info")}>
          <Text style={styles.link}>Explorar información solar</Text>
        </Pressable>
        <Pressable onPress={() => router.push("/installed-system")}>
          <Text style={styles.link}>Mi sistema instalado</Text>
        </Pressable>
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>
      </View>
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
    justifyContent: "center",
    position: "relative",
  },
  glowOne: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 220,
    backgroundColor: "rgba(0, 168, 89, 0.10)",
    top: -60,
    right: -120,
  },
  glowTwo: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 170,
    backgroundColor: "rgba(237, 50, 55, 0.07)",
    bottom: 40,
    left: -90,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.94)",
    padding: 25,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E4EEE8",
  },
  kicker: {
    color: Colors.gray,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontSize: 12,
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.primary,
  },
  info: {
    color: Colors.gray,
    marginTop: 10,
  },
  role: {
    marginTop: 6,
    color: Colors.dark,
    fontWeight: "600",
  },
  cardSecondary: {
    backgroundColor: "rgba(255,255,255,0.94)",
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E4EEE8",
    gap: 10,
  },
  sectionTitle: {
    color: Colors.dark,
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 6,
  },
  link: {
    color: Colors.primary,
    fontWeight: "600",
    marginTop: 6,
  },
  logoutButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  logoutText: {
    color: Colors.surface,
    fontWeight: "700",
  },
});
