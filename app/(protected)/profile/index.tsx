import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const router = useRouter();

  const [image, setImage] = useState<string | null>(null);
  const [distance, setDistance] = useState(10);

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  async function openCamera() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permissão necessária",
        "Permita acesso à câmera."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  function handleLogout() {
    Alert.alert(
      "Sair da conta",
      "Deseja realmente sair?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: () => {
            router.replace("/login");
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text style={styles.title}>Perfil</Text>

        {/* FOTO PERFIL */}
        <View style={styles.avatarContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={60} color="#fc5200" />
            </View>
          )}

          <View style={styles.avatarButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={pickImage}
            >
              <Ionicons name="image-outline" size={18} color="#fff" />
              <Text style={styles.actionText}>Galeria</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={openCamera}
            >
              <Ionicons name="camera-outline" size={18} color="#fff" />
              <Text style={styles.actionText}>Câmera</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* CONFIGURAÇÕES */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Configurações</Text>

          {/* ALTERAR SENHA */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => router.push("/profile/change-password")}
          >
            <View style={styles.settingLeft}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#fc5200"
              />

              <Text style={styles.settingText}>
                Alterar senha
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#666"
            />
          </TouchableOpacity>

          {/* MÉTODOS DE PAGAMENTO */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => router.push("/profile/payment-methods")}
          >
            <View style={styles.settingLeft}>
              <Ionicons
                name="card-outline"
                size={20}
                color="#fc5200"
              />

              <Text style={styles.settingText}>
                Métodos de pagamento
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>
         

        {/* DISTÂNCIA */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Distância das partidas</Text>

          <Text style={styles.distanceText}>
            {distance} km
          </Text>

          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={1}
            maximumValue={100}
            step={1}
            value={distance}
            minimumTrackTintColor="#fc5200"
            maximumTrackTintColor="#333"
            thumbTintColor="#fc5200"
            onValueChange={setDistance}
          />

          <View style={styles.rangeRow}>
            <Text style={styles.rangeText}>1km</Text>
            <Text style={styles.rangeText}>100km</Text>
          </View>
        </View>

        {/* LOGOUT */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons
            name="log-out-outline"
            size={22}
            color="#fff"
          />

          <Text style={styles.logoutText}>
            Sair da conta
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
    paddingHorizontal: 20,
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 24,
  },

  avatarContainer: {
    alignItems: "center",
    marginBottom: 28,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: "#fc5200",
  },

  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 999,
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#fc5200",
  },

  avatarButtons: {
    flexDirection: "row",
    marginTop: 16,
    gap: 12,
  },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fc5200",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 6,
  },

  actionText: {
    color: "#fff",
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#1A1A1A",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 18,
  },

  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },

  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  settingText: {
    color: "#fff",
    marginLeft: 12,
    fontSize: 15,
  },

  distanceText: {
    color: "#fc5200",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },

  rangeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  rangeText: {
    color: "#777",
    fontSize: 12,
  },

  logoutButton: {
    backgroundColor: "#D62828",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },

  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});