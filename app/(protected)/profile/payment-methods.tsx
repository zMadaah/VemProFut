import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentMethodsScreen() {
  const [selected, setSelected] = useState<
    "credit" | "debit" | "pix"
  >("pix");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Métodos de Pagamento
      </Text>

      {/* SELEÇÃO */}
      <View style={styles.optionsRow}>
        <PaymentButton
          label="Crédito"
          icon="card-outline"
          active={selected === "credit"}
          onPress={() => setSelected("credit")}
        />

        <PaymentButton
          label="Débito"
          icon="wallet-outline"
          active={selected === "debit"}
          onPress={() => setSelected("debit")}
        />

        <PaymentButton
          label="PIX"
          icon="cash-outline"
          active={selected === "pix"}
          onPress={() => setSelected("pix")}
        />
      </View>

      {/* CARTÃO */}
      {(selected === "credit" ||
        selected === "debit") && (
        <>
          <TextInput
            placeholder="Número do cartão"
            placeholderTextColor="#777"
            style={styles.input}
          />

          <View style={styles.row}>
            <TextInput
              placeholder="MM/AA"
              placeholderTextColor="#777"
              style={[styles.input, { flex: 1 }]}
            />

            <TextInput
              placeholder="CVV"
              placeholderTextColor="#777"
              style={[styles.input, { flex: 1 }]}
            />
          </View>

          <TextInput
            placeholder="Nome impresso no cartão"
            placeholderTextColor="#777"
            style={styles.input}
          />
        </>
      )}

      {/* PIX */}
      {selected === "pix" && (
        <View style={styles.pixContainer}>
          <Ionicons
            name="qr-code-outline"
            size={70}
            color="#fc5200"
          />

          <Text style={styles.pixText}>
            Chave PIX cadastrada
          </Text>

          <Text style={styles.pixKey}>
            usuario@email.com
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveText}>
          Salvar método
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function PaymentButton({
  label,
  icon,
  active,
  onPress,
}: any) {
  return (
    <TouchableOpacity
      style={[
        styles.paymentButton,
        active && styles.paymentButtonActive,
      ]}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={22}
        color="#fff"
      />

      <Text style={styles.paymentText}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
    padding: 20,
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
  },

  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 10,
  },

  paymentButton: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    gap: 8,
  },

  paymentButtonActive: {
    borderWidth: 2,
    borderColor: "#fc5200",
  },

  paymentText: {
    color: "#fff",
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#1A1A1A",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 56,
    color: "#fff",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  pixContainer: {
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginTop: 10,
  },

  pixText: {
    color: "#fff",
    marginTop: 16,
    fontSize: 16,
  },

  pixKey: {
    color: "#fc5200",
    fontWeight: "bold",
    marginTop: 8,
  },

  saveButton: {
    backgroundColor: "#fc5200",
    height: 56,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },

  saveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});