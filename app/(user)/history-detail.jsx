import { Colors } from "@/src/theme/colors";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function HistoryDetail() {
	const params = useLocalSearchParams();
	const consumption = params.consumption ? Number(params.consumption) : null;
	const estimatedPanels = params.estimatedPanels ? Number(params.estimatedPanels) : null;
	const coverage = params.coverage ? Number(params.coverage) : null;
	const estimatedSavings = params.estimatedSavings ? Number(params.estimatedSavings) : null;
	const recommendation = params.recommendation || "Sin recomendación disponible";
	const date = params.date || "Detalle del cálculo";

	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<Text style={styles.title}>{date}</Text>
				<Text style={styles.row}>Consumo mensual: {consumption ?? "N/D"} kWh</Text>
				<Text style={styles.row}>Paneles estimados: {estimatedPanels ?? "N/D"}</Text>
				<Text style={styles.row}>Cobertura: {coverage ?? "N/D"}%</Text>
				<Text style={styles.row}>Ahorro estimado: {estimatedSavings ?? "N/D"} kWh</Text>
				<Text style={styles.row}>{recommendation}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
		padding: 20,
	},
	card: {
		backgroundColor: Colors.surface,
		borderRadius: 14,
		padding: 18,
	},
	title: {
		color: Colors.primary,
		fontSize: 20,
		fontWeight: "700",
		marginBottom: 10,
	},
	row: {
		color: Colors.dark,
		fontSize: 15,
		marginBottom: 6,
	},
});
