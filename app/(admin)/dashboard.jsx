import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <View>
      <Text>Panel Administrador</Text>
      <Button title="Usuarios" onPress={() => router.push("/users")} />
      <Button title="Estadísticas" onPress={() => router.push("/statistics")} />
    </View>
  );
}
``