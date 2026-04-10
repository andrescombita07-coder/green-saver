import { useAuth } from "@/src/context/AuthContext";
import { appendStoredQuote, getStoredCalculations, getStoredQuotes } from "@/src/services/storage";
import { Colors } from "@/src/theme/colors";
import { Redirect } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function Quotes() {
  const { user, loading } = useAuth();
  const [selectedClientEmail, setSelectedClientEmail] = useState("");
  const [price, setPrice] = useState("");
  const [notes, setNotes] = useState("");
  const [calculations, setCalculations] = useState([]);
  const [sentQuotes, setSentQuotes] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [storedCalculations, storedQuotes] = await Promise.all([
        getStoredCalculations(),
        getStoredQuotes(),
      ]);
      setCalculations(storedCalculations);
      setSentQuotes(storedQuotes);
    };

    if (user?.role === "admin") {
      loadData();
    }
  }, [user?.role]);

  const uniqueClients = useMemo(() => {
    const map = new Map();

    calculations.forEach((item) => {
      const email = item.requestedBy || "cliente@correo.com";
      if (!map.has(email)) {
        map.set(email, {
          email,
          name: item.clientName || email,
          lastPanels: item.estimatedPanels,
          lastConsumption: item.consumption,
        });
      }
    });

    return Array.from(map.values());
  }, [calculations]);

  const handleSendQuote = async () => {
    if (!selectedClientEmail || !price) {
      Alert.alert("Campos requeridos", "Selecciona cliente y agrega un precio de cotización.");
      return;
    }

    const clientData = uniqueClients.find((client) => client.email === selectedClientEmail);

    const newQuote = {
      id: String(Date.now()),
      date: new Date().toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      clientEmail: selectedClientEmail,
      clientName: clientData?.name || selectedClientEmail,
      price,
      notes: notes || "Sin observaciones",
      status: "Enviada",
    };

    const nextQuotes = await appendStoredQuote(newQuote);
    setSentQuotes(nextQuotes);
    setPrice("");
    setNotes("");
    Alert.alert("Cotización enviada", "La propuesta fue registrada correctamente.");
  };

  if (loading) return null;

  if (!user) return <Redirect href="/login" />;

  if (user.role !== "admin") return <Redirect href="/(user)/(tabs)" />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.glowOne} />
      <View style={styles.glowTwo} />

      <View style={styles.heroCard}>
        <Text style={styles.kicker}>Gestión comercial</Text>
        <Text style={styles.title}>Enviar cotización</Text>
        <Text style={styles.subtitle}>Selecciona un cliente que realizó cálculo y registra una propuesta económica.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Clientes con cálculo</Text>

        {uniqueClients.length === 0 ? (
          <Text style={styles.emptyText}>Aún no hay cálculos de clientes.</Text>
        ) : (
          uniqueClients.map((client) => (
            <Pressable
              key={client.email}
              style={[
                styles.clientItem,
                selectedClientEmail === client.email && styles.clientItemSelected,
              ]}
              onPress={() => setSelectedClientEmail(client.email)}
            >
              <Text style={styles.clientName}>{client.name}</Text>
              <Text style={styles.clientInfo}>{client.email}</Text>
              <Text style={styles.clientInfo}>Último cálculo: {client.lastPanels} paneles / {client.lastConsumption} kWh</Text>
            </Pressable>
          ))
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Nueva cotización</Text>
        <TextInput
          style={styles.input}
          placeholder="Precio total (USD)"
          placeholderTextColor={Colors.gray}
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Notas técnicas y alcance"
          placeholderTextColor={Colors.gray}
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
        />

        <Pressable style={styles.primaryButton} onPress={handleSendQuote}>
          <Text style={styles.primaryButtonText}>Enviar cotización</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Cotizaciones enviadas</Text>
        {sentQuotes.length === 0 ? (
          <Text style={styles.emptyText}>No hay cotizaciones registradas.</Text>
        ) : (
          sentQuotes.slice(0, 5).map((quote) => (
            <View key={quote.id} style={styles.quoteItem}>
              <Text style={styles.quoteTitle}>{quote.clientName}</Text>
              <Text style={styles.quoteText}>{quote.clientEmail}</Text>
              <Text style={styles.quoteText}>Precio: ${quote.price}</Text>
              <Text style={styles.quoteStatus}>{quote.status} - {quote.date}</Text>
            </View>
          ))
        )}
      </View>
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
    bottom: 70,
    left: -90,
  },
  heroCard: {
    backgroundColor: "rgba(255,255,255,0.94)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E4EEE8",
    padding: 18,
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
  card: {
    backgroundColor: "rgba(255,255,255,0.94)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E4EEE8",
    padding: 18,
    gap: 10,
  },
  cardTitle: {
    color: Colors.dark,
    fontWeight: "700",
    fontSize: 16,
  },
  clientItem: {
    borderWidth: 1,
    borderColor: "#DCE7E1",
    borderRadius: 12,
    padding: 12,
    gap: 3,
  },
  clientItemSelected: {
    borderColor: Colors.primary,
    backgroundColor: "#F3F8F4",
  },
  clientName: {
    color: Colors.dark,
    fontWeight: "700",
  },
  clientInfo: {
    color: Colors.gray,
    fontSize: 13,
  },
  input: {
    backgroundColor: "#F6F8F7",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DCE7E1",
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: Colors.dark,
  },
  textArea: {
    minHeight: 90,
    textAlignVertical: "top",
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    color: Colors.surface,
    fontWeight: "700",
  },
  emptyText: {
    color: Colors.gray,
  },
  quoteItem: {
    borderWidth: 1,
    borderColor: "#DCE7E1",
    borderRadius: 12,
    padding: 12,
    gap: 2,
  },
  quoteTitle: {
    color: Colors.dark,
    fontWeight: "700",
  },
  quoteText: {
    color: Colors.gray,
  },
  quoteStatus: {
    marginTop: 4,
    color: Colors.primary,
    fontWeight: "700",
  },
});
