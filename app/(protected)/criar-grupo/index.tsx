import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PlayerItem } from "./components/PlayerItem";
import { TeamColumn } from "./components/TeamColum";
import { useGroup } from "./hooks/useGroup";


export default function CriarGrupoScreen() {
  const [name, setName] = useState("");
  const { players, teams, teamSize, selectMode, addPlayer } = useGroup();
  
  const isMatchReady =
    teamSize &&
    teams.length >= 2 &&
    teams[0].length === teamSize &&
    teams[1].length === teamSize;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Criar Grupo</Text>

      
      {!teamSize && (
        <>
          <Text style={styles.selectMessage}>
            Selecione o modo de jogo para começar
          </Text>

          <View style={styles.modeContainer}>
            {[5, 6, 7].map((size) => (
              <TouchableOpacity
                key={size}
                style={styles.modeButton}
                onPress={() => selectMode(size)}
              >
                <Text style={styles.modeText}>
                  {size} x {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      
      {teamSize && (
        <>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nome do jogador"
              placeholderTextColor="#777"
              value={name}
              onChangeText={setName}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                if (name.trim()) {
                  addPlayer(name);
                  setName("");
                }
              }}
            >
              <Text style={{ color: "#fff" }}>Adicionar</Text>
            </TouchableOpacity>
          </View>

          
          {isMatchReady && (
            <TouchableOpacity
              style={styles.startButton}
              onPress={() =>
                router.push({
                  pathname: "/partida",
                  params: {
                    teamA: JSON.stringify(teams[0]),
                    teamB: JSON.stringify(teams[1]),
                  },
                }as any)
              }
            >
              <Text style={styles.startButtonText}>
                Iniciar Partida
              </Text>
            </TouchableOpacity>
          )}

          <View style={styles.content}>
            
            <View style={styles.leftSide}>
              <FlatList
                data={players}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <PlayerItem player={item} index={index} />
                )}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
              />
            </View>

            <View style={styles.rightSide}>
              <View style={styles.teamsGrid}>
                {teams.map((team, index) => (
                  <View key={index} style={styles.teamCard}>
                    <TeamColumn
                      title={`Time ${String.fromCharCode(65 + index)}`}
                      players={team}
                    />
                  </View>
                ))}
              </View>
            </View>
          </View>
        </>
      )}
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },

  selectMessage: {
    color: "#999",
    marginBottom: 16,
    fontSize: 16,
  },

  inputContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#fc5200",
    borderRadius: 12,
    paddingHorizontal: 12,
    color: "#fff",
  },

  addButton: {
    backgroundColor: "#cc4200",
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 12,
    marginLeft: 8,
  },

  startButton: {
    backgroundColor: "#fc5200",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },

  startButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  modeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  modeButton: {
    backgroundColor: "#1C1C1C",
    padding: 16,
    borderRadius: 12,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 4,
  },

  modeText: {
    color: "#fc5200",
    fontWeight: "bold",
  },

  content: {
    flex: 1,
    flexDirection: "row",
  },

  leftSide: {
    flex: 1.3,
    paddingRight: 12,
  },

  rightSide: {
    flex: 1,
  },

  teamsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  teamCard: {
    width: "49%",
    marginBottom: 16,
  },
});