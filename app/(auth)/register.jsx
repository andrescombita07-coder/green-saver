import { useAuth } from "@/src/context/AuthContext";
import { Colors } from "@/src/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Alert,
    Animated,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();
  const entryOpacity = useRef(new Animated.Value(0)).current;
  const entryTranslateY = useRef(new Animated.Value(18)).current;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(entryOpacity, {
        toValue: 1,
        duration: 420,
        useNativeDriver: true,
      }),
      Animated.timing(entryTranslateY, {
        toValue: 0,
        duration: 420,
        useNativeDriver: true,
      }),
    ]).start();
  }, [entryOpacity, entryTranslateY]);

  const handleHapticPress = async () => {
    await Haptics.selectionAsync();
  };

  const handleRegister = async () => {
    if (!name || !phone || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    try {
      await register({ name, phone, email, password });
      Alert.alert("Registro exitoso", "Tu sesión se abrió automáticamente");
      setName("");
      setPhone("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      router.replace("/");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundGlowOne} />
      <View style={styles.backgroundGlowTwo} />
      <View style={styles.backgroundTextureOne} />
      <View style={styles.backgroundTextureTwo} />

      <View style={styles.heroCard}>
        <Text style={styles.kicker}>Crear acceso</Text>
        <Text style={styles.title}>Registro de usuario</Text>
        <Text style={styles.subtitle}>
          Crea una cuenta para guardar cálculos y ver tu historial.
        </Text>
      </View>

      <Animated.View
        style={[
          styles.formCard,
          {
            opacity: entryOpacity,
            transform: [{ translateY: entryTranslateY }],
          },
        ]}
      >
        <Text style={styles.helperText}>
          Completa tus datos para crear tu acceso y registrar tu cuenta correctamente.
        </Text>

        <View style={styles.inputGroup}>
          <Ionicons name="person-outline" size={18} color={Colors.gray} style={styles.inputIcon} />
          <TextInput
            placeholder="Nombre completo"
            placeholderTextColor={Colors.gray}
            style={styles.input}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="call-outline" size={18} color={Colors.gray} style={styles.inputIcon} />
          <TextInput
            placeholder="Teléfono"
            placeholderTextColor={Colors.gray}
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="mail-outline" size={18} color={Colors.gray} style={styles.inputIcon} />
          <TextInput
            placeholder="Correo electrónico"
            placeholderTextColor={Colors.gray}
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="lock-closed-outline" size={18} color={Colors.gray} style={styles.inputIcon} />
          <TextInput
            placeholder="Contraseña"
            placeholderTextColor={Colors.gray}
            secureTextEntry={!showPassword}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          <Pressable
            style={styles.eyeButton}
            onPress={() => setShowPassword((current) => !current)}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={18}
              color={Colors.gray}
            />
          </Pressable>
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="shield-checkmark-outline" size={18} color={Colors.gray} style={styles.inputIcon} />
          <TextInput
            placeholder="Confirmar contraseña"
            placeholderTextColor={Colors.gray}
            secureTextEntry={!showConfirmPassword}
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <Pressable
            style={styles.eyeButton}
            onPress={() => setShowConfirmPassword((current) => !current)}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
              size={18}
              color={Colors.gray}
            />
          </Pressable>
        </View>

        <Pressable
          style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}
          onPressIn={handleHapticPress}
          onPress={handleRegister}
        >
          <Text style={styles.primaryButtonText}>Crear cuenta</Text>
        </Pressable>

        <Pressable
          onPressIn={handleHapticPress}
          onPress={() => router.replace("/login")}
        >
          <Text style={styles.link}>Ya tengo una cuenta</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    backgroundColor: Colors.background,
    padding: 30,
    justifyContent: "center",
    overflow: "hidden",
  },
  backgroundGlowOne: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 260,
    backgroundColor: "rgba(0, 168, 89, 0.12)",
    top: -80,
    right: -110,
  },
  backgroundGlowTwo: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 220,
    backgroundColor: "rgba(237, 50, 55, 0.08)",
    bottom: -90,
    left: -100,
  },
  backgroundTextureOne: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.38)",
    transform: [{ rotate: "18deg" }],
    top: 70,
    left: -30,
  },
  backgroundTextureTwo: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.26)",
    transform: [{ rotate: "-20deg" }],
    bottom: 140,
    right: -20,
  },
  heroCard: {
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E7EFE9",
  },
  kicker: {
    color: Colors.gray,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontSize: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.dark,
    lineHeight: 22,
  },
  formCard: {
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E7EFE9",
    gap: 14,
  },
  helperText: {
    color: Colors.gray,
    lineHeight: 20,
    marginTop: -4,
    marginBottom: 4,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F8F7",
    borderColor: "#DCE7E1",
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 0,
    color: Colors.dark,
    flex: 1,
  },
  eyeButton: {
    padding: 6,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 4,
  },
  buttonPressed: {
    opacity: 0.86,
    transform: [{ scale: 0.985 }],
  },
  primaryButtonText: {
    color: Colors.surface,
    fontWeight: "700",
    fontSize: 16,
  },
  link: {
    textAlign: "center",
    color: Colors.primary,
    fontWeight: "600",
    marginTop: 4,
  },
});