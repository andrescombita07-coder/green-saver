import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function History() {
  const router = useRouter();

  return (
    <View>
      <Text>Historial de Cálculos</Text>
      <Button title="Ver detalle" onPress={() => router.push("/history-detail")} />
    </View>
  );
}
``