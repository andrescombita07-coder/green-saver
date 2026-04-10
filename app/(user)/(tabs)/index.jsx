import { useAuth } from "@/src/context/AuthContext";
import { Colors } from "@/src/theme/colors";
import { useRouter } from "expo-router";
import { Alert, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Home() {
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

      <View style={styles.headerRow}>
        <Text style={styles.kicker}>Panel Energético</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Modo hogar</Text>
        </View>
      </View>

      <View style={styles.heroCard}>
        <Text style={styles.logo}>GREEN SAVER</Text>
        <Text style={styles.subtitle}>
          {user?.name
            ? `${user.name}, toma decisiones inteligentes para ahorrar energía cada mes.`
            : "Toma decisiones inteligentes para ahorrar energía cada mes."}
        </Text>

        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Tu primer paso</Text>
            <Text style={styles.metricValue}>Calcula hoy</Text>
            <Text style={styles.metricHint}>Obtén una estimación en segundos.</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Meta solar</Text>
            <Text style={styles.metricValue}>Menos gasto</Text>
            <Text style={styles.metricHint}>Descubre cuánto puedes ahorrar.</Text>
          </View>
        </View>
      </View>

      <ImageBackground
        style={styles.imageCard}
        imageStyle={styles.image}
        resizeMode="cover"
        source={{
          uri: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1400&q=80",
        }}
      >
        <View style={styles.imageOverlay}>
          <Text style={styles.imageTitle}>Energía solar residencial</Text>
          <Text style={styles.imageSubtitle}>Optimiza tu consumo con una instalación fotovoltaica bien dimensionada.</Text>
        </View>
      </ImageBackground>

      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Acciones rápidas</Text>

        <View style={styles.actionsGrid}>
          <Pressable
            style={({ pressed }) => [styles.actionCard, pressed && styles.cardPressed]}
            onPress={() => router.push("/calculator")}
          >
            <Text style={styles.actionTitle}>Calculadora</Text>
            <Text style={styles.actionText}>Estima paneles y cobertura en segundos.</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.actionCard, pressed && styles.cardPressed]}
            onPress={() => router.push("/history")}
          >
            <Text style={styles.actionTitle}>Historial</Text>
            <Text style={styles.actionText}>Revisa tus simulaciones anteriores.</Text>
          </Pressable>
        </View>

        <Pressable
          style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}
          onPress={() => router.push("/calculator")}
        >
          <Text style={styles.primaryButtonText}>Calcular ahora</Text>
        </Pressable>

        <View style={styles.secondaryRow}>
          <Pressable
            style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
            onPress={() => router.push("/info")}
          >
            <Text style={styles.secondaryButtonText}>Guía solar</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
            onPress={() => router.push("/profile")}
          >
            <Text style={styles.secondaryButtonText}>Mi perfil</Text>
          </Pressable>
        </View>

        <Pressable
          style={({ pressed }) => [styles.installedButton, pressed && styles.buttonPressed]}
          onPress={() => router.push("/installed-system")}
        >
          <Text style={styles.installedButtonText}>Mi sistema instalado</Text>
        </Pressable>
      </View>

      <View style={styles.logoutCard}>
        <Text style={styles.logoutLabel}>Sesión actual</Text>
        <Text style={styles.logoutEmail}>{user?.email || "Sin sesión"}</Text>
        <Pressable
          style={({ pressed }) => [styles.logoutButton, pressed && styles.buttonPressed]}
          onPress={handleLogout}
        >
          <Text style={styles.logout}>Cerrar sesión</Text>
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
    padding: 16,
    paddingBottom: 26,
    gap: 14,
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
    width: 180,
    height: 180,
    borderRadius: 180,
    backgroundColor: "rgba(237, 50, 55, 0.07)",
    bottom: 280,
    left: -90,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    backgroundColor: "#E8F4ED",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: "600",
  },
  heroCard: {
    backgroundColor: "rgba(23, 49, 37, 0.96)",
    padding: 22,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#2B503D",
  },
  kicker: {
    color: Colors.gray,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  logo: {
    fontSize: 30,
    fontWeight: "700",
    color: Colors.surface,
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    color: "#D7E5DB",
    lineHeight: 22,
    textAlign: "center",
  },
  metricsRow: {
    marginTop: 16,
    flexDirection: "row",
    gap: 10,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#204132",
    borderRadius: 14,
    padding: 12,
  },
  metricLabel: {
    color: "#BFD2C5",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  metricValue: {
    color: Colors.surface,
    fontSize: 18,
    fontWeight: "700",
    marginTop: 6,
  },
  metricHint: {
    color: "#D7E5DB",
    fontSize: 12,
    lineHeight: 16,
    marginTop: 4,
  },
  imageCard: {
    height: 190,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E4EEE8",
  },
  image: {
    borderRadius: 18,
  },
  imageOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  imageTitle: {
    color: Colors.surface,
    fontSize: 18,
    fontWeight: "700",
  },
  imageSubtitle: {
    color: Colors.surface,
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
  actionsSection: {
    backgroundColor: "rgba(255,255,255,0.94)",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E4EEE8",
  },
  sectionTitle: {
    color: Colors.dark,
    fontWeight: "700",
    fontSize: 17,
    marginBottom: 12,
  },
  actionsGrid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: "#F3F8F4",
    borderWidth: 1,
    borderColor: "#DCE7E1",
    borderRadius: 16,
    padding: 14,
  },
  actionTitle: {
    color: Colors.primary,
    fontWeight: "700",
    marginBottom: 6,
  },
  actionText: {
    color: Colors.dark,
    fontSize: 13,
    lineHeight: 19,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 10,
  },
  primaryButtonText: {
    color: Colors.surface,
    fontWeight: "700",
    fontSize: 16,
  },
  secondaryRow: {
    flexDirection: "row",
    gap: 10,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DCE7E1",
    alignItems: "center",
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: Colors.dark,
    fontWeight: "600",
  },
  installedButton: {
    marginTop: 10,
    backgroundColor: "#F3F8F4",
    borderWidth: 1,
    borderColor: "#DCE7E1",
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 10,
  },
  installedButtonText: {
    color: Colors.primary,
    fontWeight: "700",
  },
  logoutCard: {
    backgroundColor: "rgba(255,255,255,0.94)",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E4EEE8",
  },
  logoutLabel: {
    color: Colors.gray,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  logoutEmail: {
    color: Colors.dark,
    marginBottom: 12,
  },
  logoutButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  cardPressed: {
    opacity: 0.85,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  logout: {
    color: Colors.surface,
    fontWeight: "700",
  },
});
