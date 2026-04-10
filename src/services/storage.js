import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
  currentUser: "currentUser",
  users: "users",
  calculations: "calculations",
  quotes: "quotes",
};

const readJson = async (key, fallback) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = async (key, value) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
  return value;
};

export const getStoredCurrentUser = async () =>
  readJson(STORAGE_KEYS.currentUser, null);

export const setStoredCurrentUser = async (user) =>
  writeJson(STORAGE_KEYS.currentUser, user);

export const clearStoredCurrentUser = async () => {
  await AsyncStorage.removeItem(STORAGE_KEYS.currentUser);
};

export const getStoredUsers = async () =>
  readJson(STORAGE_KEYS.users, []);

export const setStoredUsers = async (users) =>
  writeJson(STORAGE_KEYS.users, users);

export const removeStoredUserByEmail = async (email) => {
  const users = await getStoredUsers();
  const nextUsers = users.filter((user) => user.email !== email);
  await setStoredUsers(nextUsers);
  return nextUsers;
};

export const getStoredCalculations = async () =>
  readJson(STORAGE_KEYS.calculations, []);

export const setStoredCalculations = async (calculations) =>
  writeJson(STORAGE_KEYS.calculations, calculations);

export const appendStoredCalculation = async (record) => {
  const calculations = await getStoredCalculations();
  const nextCalculations = [record, ...calculations];
  await setStoredCalculations(nextCalculations);
  return nextCalculations;
};

export const getStoredQuotes = async () =>
  readJson(STORAGE_KEYS.quotes, []);

export const setStoredQuotes = async (quotes) =>
  writeJson(STORAGE_KEYS.quotes, quotes);

export const appendStoredQuote = async (record) => {
  const quotes = await getStoredQuotes();
  const nextQuotes = [record, ...quotes];
  await setStoredQuotes(nextQuotes);
  return nextQuotes;
};
