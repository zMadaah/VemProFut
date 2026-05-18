import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { api } from "@/services/api";

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleRegister() {
  try {

    if(password !== confirm){
      return alert("As senhas não coincidem");
    }

    await api.post("/users/register",{
      name,
      email,
      phone,
      password
    });

    alert("Conta criada com sucesso");

    router.replace("/login");

  } catch(error:any){

    console.log(error.response?.data);

    alert(
      error.response?.data?.error ||
      "Erro ao cadastrar"
    );
  }
}
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}

          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Ionicons
                name="football"
                size={42}
                color="#fc5200"
              />
            </View>

            <Text style={styles.title}>
              Criar Conta
            </Text>

            <Text style={styles.subtitle}>
              Organize suas peladas e encontre
              partidas próximas
            </Text>
          </View>

          {/* FORM */}

          <View style={styles.form}>

            <TextInput
              placeholder="Nome completo"
              placeholderTextColor="#777"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />

            <TextInput
              placeholder="Email"
              placeholderTextColor="#777"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              placeholder="Celular"
              placeholderTextColor="#777"
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />

            {/* SENHA */}

            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Senha"
                placeholderTextColor="#777"
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />

              <TouchableOpacity
                onPress={() =>
                  setShowPassword(!showPassword)
                }
              >
                <Ionicons
                  name={
                    showPassword
                      ? "eye-off"
                      : "eye"
                  }
                  size={22}
                  color="#fc5200"
                />
              </TouchableOpacity>
            </View>

            {/* CONFIRMAR SENHA */}

            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Confirmar senha"
                placeholderTextColor="#777"
                style={styles.passwordInput}
                value={confirm}
                onChangeText={setConfirm}
                secureTextEntry={!showConfirm}
              />

              <TouchableOpacity
                onPress={() =>
                  setShowConfirm(!showConfirm)
                }
              >
                <Ionicons
                  name={
                    showConfirm
                      ? "eye-off"
                      : "eye"
                  }
                  size={22}
                  color="#fc5200"
                />
              </TouchableOpacity>
            </View>

            {/* BOTÃO */}

            <TouchableOpacity
              style={styles.button}
              onPress={handleRegister}
            >
              <Text style={styles.buttonText}>
                Cadastrar
              </Text>
            </TouchableOpacity>

            {/* LOGIN */}

            <TouchableOpacity
              onPress={() => router.back()}
            >
              <Text style={styles.loginText}>
                Já possui conta?{" "}
                <Text style={styles.loginBold}>
                  Entrar
                </Text>
              </Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: "#0F0F0F",
  },

  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#0F0F0F",
  },

  header: {
    alignItems: "center",
    marginBottom: 36,
  },

  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },

  subtitle: {
    color: "#777",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 22,
  },

  form: {
    marginTop: 10,
  },

  input: {
    height: 56,
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    paddingHorizontal: 18,
    marginBottom: 16,
    fontSize: 16,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    paddingHorizontal: 18,
    marginBottom: 16,
    height: 56,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },

  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
  },

  button: {
    backgroundColor: "#fc5200",
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
    elevation: 4,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  loginText: {
    textAlign: "center",
    fontSize: 14,
    color: "#777",
  },

  loginBold: {
    color: "#fc5200",
    fontWeight: "bold",
  },

});