import { apiRequest } from "@/src/services/apiClient";

const mapRemoteCalculation = (item) => {
  const estimatedPanels =
    item?.paneles_necesarios ??
    item?.estimatedPanels ??
    item?.panels ??
    null;

  const consumption =
    item?.consumo_mensual ??
    item?.consumption ??
    item?.demanda_kwh ??
    null;

  const dateValue = item?.date || item?.created_at;

  return {
    id: String(item?.id ?? Date.now()),
    date: dateValue
      ? new Date(dateValue).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "Sin fecha",
    consumption,
    estimatedPanels,
    coverage: item?.coverage ?? null,
    estimatedSavings: item?.estimatedSavings ?? null,
    recommendation: item?.recommendation || "Datos obtenidos desde backend",
    requestedBy: item?.email || "backend@greensaver",
    clientName: item?.nombre || "Cliente backend",
  };
};

export const registerRemoteUser = async ({ name, city = "N/A", monthlyConsumption = 0 }) => {
  return apiRequest("/usuarios", {
    method: "POST",
    query: {
      nombre: name,
      ciudad: city,
      consumo_mensual: monthlyConsumption,
    },
  });
};

export const loginRemoteUser = async ({ email, password }) => {
  return apiRequest("/auth/login", {
    method: "POST",
    body: { email, password },
  });
};

export const getRemoteCalculations = async () => {
  const response = await apiRequest("/calculos");

  if (!Array.isArray(response)) {
    return [];
  }

  return response.map(mapRemoteCalculation);
};

export const createRemoteCalculation = async ({
  email,
  consumption,
  estimatedPanels,
  coverage,
  estimatedSavings,
  recommendation,
}) => {
  return apiRequest("/calculos", {
    method: "POST",
    body: {
      email,
      consumption,
      estimatedPanels,
      coverage,
      estimatedSavings,
      recommendation,
    },
  });
};
