import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function ForgotPassword() {
  const router = useRouter();

  function handleSelect(method: "sms" | "email") {
    router.push({
      pathname: "/verify-code",
      params: { method },
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Recuperar senha</Text>
      <Text style={styles.subtitle}>
        Escolha como deseja receber seu código de recuperação
      </Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => handleSelect("sms")}
      >
        <Text style={styles.cardTitle}>Via SMS</Text>
        <Text style={styles.cardDescription}>
          Enviaremos um código para seu número cadastrado
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => handleSelect("email")}
      >
        <Text style={styles.cardTitle}>Via Email</Text>
        <Text style={styles.cardDescription}>
          Enviaremos um código para seu email cadastrado
        </Text>
      </TouchableOpacity>
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#cc4200",
    marginBottom: 32,
  },
  card: {
    borderWidth: 1,
    borderColor: "#fc5200",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color:"#fc5200"
  },
  cardDescription: {
    fontSize: 14,
    color: "#fff",
  },
});