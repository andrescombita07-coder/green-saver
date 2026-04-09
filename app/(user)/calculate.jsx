import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Calculate() {
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <Text>Registrar consumo energético</Text>
      <Button title="Calcular sistema solar" onPress={() => router.push("/results")} />
    </View>
  );
}
