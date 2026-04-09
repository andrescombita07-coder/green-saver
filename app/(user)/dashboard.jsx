import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function UserDashboard() {
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Panel del Usuario</Text>

      <Button title="Registrar Consumo" onPress={() => router.push("/calculate")} />
      <Button title="Ver Historial" onPress={() => router.push("/history")} />
      <Button title="Perfil" onPress={() => router.push("/profile")} />
      <Button title="Info Energía Solar" onPress={() => router.push("/info")} />
    </View>
  );
}
