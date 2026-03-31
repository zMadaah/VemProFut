import { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ExpenseItem } from "./components/ExpenseItem";
import { useFinance } from "./hook/useFinance";

export default function FluxoCaixaScreen() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const { expenses, addExpense, removeExpense, total } = useFinance();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Fluxo de Caixa</Text>

      {/* INPUT */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ex: Aluguel campo"
          placeholderTextColor="#777"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.input}
          placeholder="Valor"
          placeholderTextColor="#777"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            addExpense(title, Number(amount));
            setTitle("");
            setAmount("");
          }}
        >
          <Text style={{ color: "#fff" }}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      {/* TOTAL */}
      <Text style={styles.total}>
        Total do mês: R$ {total.toFixed(2)}
      </Text>

      {/* LISTA */}
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseItem item={item} onRemove={removeExpense} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#0F0F0F",
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  inputContainer: {
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#fc5200",
    borderRadius: 12,
    padding: 12,
    color: "#fff",
    marginBottom: 10,
  },

  addButton: {
    backgroundColor: "#cc4200",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  total: {
    color: "#fc5200",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});