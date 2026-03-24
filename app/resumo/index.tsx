import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResumoScreen() {
  // 🔥 MOCK DATA (visualização)
  const scoreA = 5;
  const scoreB = 3;

  const teamA = [
    { id: "1", name: "João", goals: 2, assists: 1, fouls: 0 },
    { id: "2", name: "Carlos", goals: 1, assists: 2, fouls: 1 },
    { id: "3", name: "Mateus", goals: 2, assists: 0, fouls: 0 },
  ];

  const teamB = [
    { id: "4", name: "Lucas", goals: 2, assists: 0, fouls: 1 },
    { id: "5", name: "Pedro", goals: 1, assists: 1, fouls: 2 },
    { id: "6", name: "Rafael", goals: 0, assists: 1, fouls: 0 },
  ];

  // 🧠 MVP (mais gols)
  const allPlayers = [...teamA, ...teamB];
  const mvp = allPlayers.reduce((best, current) =>
    current.goals > best.goals ? current : best
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Resumo da Partida</Text>

      {/* PLACAR */}
      <Text style={styles.score}>
        {scoreA} x {scoreB}
      </Text>

      {/* MVP */}
      <View style={styles.mvpBox}>
        <Text style={styles.mvpTitle}>🏆 MVP da Partida</Text>
        <Text style={styles.mvpName}>{mvp.name}</Text>
        <Text style={styles.mvpStats}>
          ⚽ {mvp.goals} | 👟 {mvp.assists}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <TeamResumo title="Time A" players={teamA} />
        <TeamResumo title="Time B" players={teamB} />
      </ScrollView>
    </SafeAreaView>
  );
}

/* COMPONENTE TIME */

function TeamResumo({ title, players }: any) {
  return (
    <View style={styles.teamBox}>
      <Text style={styles.teamTitle}>{title}</Text>

      {players.map((player: any) => (
        <View key={player.id} style={styles.playerRow}>
          <Text style={styles.playerName}>{player.name}</Text>

          <View style={styles.statsRow}>
            <Text style={styles.stat}>⚽ {player.goals}</Text>
            <Text style={styles.stat}>👟 {player.assists}</Text>
            <Text style={styles.stat}>🟥 {player.fouls}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

/* STYLES */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
    padding: 20,
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  score: {
    fontSize: 48,
    color: "#fc5200",
    textAlign: "center",
    marginBottom: 20,
  },

  mvpBox: {
    backgroundColor: "#1A1A1A",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    alignItems: "center",
  },

  mvpTitle: {
    color: "#fc5200",
    fontWeight: "bold",
    marginBottom: 6,
  },

  mvpName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  mvpStats: {
    color: "#aaa",
    marginTop: 4,
  },

  teamBox: {
    backgroundColor: "#1A1A1A",
    padding: 14,
    borderRadius: 16,
    marginBottom: 16,
  },

  teamTitle: {
    color: "#fc5200",
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
  },

  playerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  playerName: {
    color: "#fff",
    flex: 1,
  },

  statsRow: {
    flexDirection: "row",
    gap: 10,
  },

  stat: {
    color: "#fff",
    fontSize: 12,
  },
});