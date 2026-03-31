import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const SPACING = 16;
const CARD_SIZE = (width - 48 - SPACING) / 2;

const data = [
  { id: "1", title: "Criar Grupo", icon: "people-outline", route: "/criar-grupo" },
  { id: "2", title: "Fluxo de Caixa", icon: "cash-outline", route: "/fluxo-caixa" },
  { id: "3", title: "Estatiticas", icon: "wallet-outline", route: "" },
  { id: "4", title: "Histórico", icon: "time-outline", route: "" },
];

export default function HomeScreen() {
  const router = useRouter();

  function renderItem({ item }: any) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => item.route && router.push(item.route)}
      >
        <Ionicons name={item.icon as any} size={34} color="#fc5200" />
        <Text style={styles.cardText}>{item.title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>VemPROFut</Text>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ gap: SPACING }}
          contentContainerStyle={{ marginTop: 24, gap: SPACING }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 26, fontWeight: "bold", color: "#fff" },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fc5200",
  },
  cardText: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
});