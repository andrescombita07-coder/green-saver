import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../src/theme/colors";

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.logo}>GREEN SAVER 🌞</Text>
      </View>

      <View style={styles.imageCard}>
        <Image
          style={styles.image}
          source={{
            uri: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
          }}
        />
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Hola 👋</Text>
        <Text style={styles.infoText}>
          Aún no tienes un sistema solar instalado.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  headerCard: {
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },
  logo: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.primary,
  },
  imageCard: {
    marginVertical: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
  },
  infoCard: {
    backgroundColor: Colors.dark,
    padding: 20,
    borderRadius: 16,
  },
  infoTitle: {
    color: Colors.surface,
    fontSize: 18,
    marginBottom: 6,
  },
  infoText: {
    color: Colors.surface,
    fontSize: 15,
  },
});
``