import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerifyCode() {
  const router = useRouter();
  const { method } = useLocalSearchParams();
  const [code, setCode] = useState("");

  function handleVerify() {
    if (code.length < 4) return;

    router.push("/reset-password");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Digite o código</Text>

        <Text style={styles.subtitle}>
          Enviamos um código via {method === "sms" ? "SMS" : "Email"}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite o código"
          placeholderTextColor="#777"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          maxLength={6}
        />

        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Verificar código</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#cc4200",
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: "#fc5200",
    borderRadius: 12,
    height: 55,
    paddingHorizontal: 16,
    marginBottom: 20,
    color: "#fff", 
    fontSize: 18,
    letterSpacing: 4,
  },
  button: {
    backgroundColor: "#cc4200",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});