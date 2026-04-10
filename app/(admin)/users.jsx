import { useAuth } from "@/src/context/AuthContext";
import { Colors } from "@/src/theme/colors";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Users() {
  const { user, loading, getRegisteredUsers, deleteUser } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const registeredUsers = await getRegisteredUsers();
      setUsers(registeredUsers);
    };

    if (user?.role === "admin") {
      loadUsers();
    }
  }, [getRegisteredUsers, user?.role]);

  const handleDelete = (email) => {
    Alert.alert("Eliminar usuario", "¿Deseas eliminar esta cuenta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          const nextUsers = await deleteUser(email);
          setUsers(nextUsers);
        },
      },
    ]);
  };

  if (loading) return null;

  if (!user) return <Redirect href="/login" />;

  if (user.role !== "admin") return <Redirect href="/(user)/(tabs)" />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.glowOne} />
      <View style={styles.glowTwo} />

      <View style={styles.heroCard}>
        <Text style={styles.kicker}>Administración</Text>
        <Text style={styles.title}>Gestión de usuarios</Text>
        <Text style={styles.subtitle}>Revisa las cuentas registradas y elimina las que ya no deban tener acceso.</Text>
      </View>

      {users.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No hay usuarios registrados</Text>
          <Text style={styles.emptyText}>Cuando alguien se registre, aparecerá aquí.</Text>
        </View>
      ) : (
        users.map((item) => (
          <View key={item.email} style={styles.card}>
            <Text style={styles.cardTitle}>{item.name || item.email}</Text>
            <Text style={styles.cardText}>{item.email}</Text>
            <Text style={styles.cardRole}>Rol: {item.role}</Text>

            <Pressable style={styles.deleteButton} onPress={() => handleDelete(item.email)}>
              <Text style={styles.deleteText}>Eliminar</Text>
            </Pressable>
          </View>
        ))
      )}
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
    color: Colors.primary,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.dark,
    lineHeight: 21,
  },
  emptyCard: {
    backgroundColor: "rgba(255,255,255,0.94)",
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
    backgroundColor: "rgba(255,255,255,0.94)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E4EEE8",
    padding: 18,
    gap: 6,
  },
  cardTitle: {
    color: Colors.dark,
    fontWeight: "700",
    fontSize: 16,
  },
  cardText: {
    color: Colors.gray,
  },
  cardRole: {
    color: Colors.primary,
    fontWeight: "600",
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: Colors.secondary,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  deleteText: {
    color: Colors.surface,
    fontWeight: "700",
  },
});