import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Register() {
  const router = useRouter();

  return (
    <View style={{ padding: 30 }}>
      <Text style={{ fontSize: 20 }}>Registro de Usuario</Text>
      <Button title="Crear cuenta" onPress={() => router.replace("/login")} />
    </View>
  );
}
``