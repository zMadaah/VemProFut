import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Expense } from "../types";

type Props = {
  item: Expense;
  onRemove: (id: string) => void;
};

export function ExpenseItem({ item, onRemove }: Props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.amount}>R$ {item.amount.toFixed(2)}</Text>

        <TouchableOpacity onPress={() => onRemove(item.id)}>
          <Text style={styles.remove}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1A1A1A",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: { color: "#fff", fontWeight: "bold" },
  date: { color: "#777", fontSize: 12 },

  right: { alignItems: "flex-end" },

  amount: {
    color: "#fc5200",
    fontWeight: "bold",
  },

  remove: {
    color: "#ff4d4d",
    fontSize: 12,
    marginTop: 4,
  },
});