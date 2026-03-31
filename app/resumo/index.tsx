import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResumoScreen() {

  const router = useRouter();

  const params = useLocalSearchParams<{
    teamA?: string;
    teamB?: string;
    scoreA?: string;
    scoreB?: string;
    remaining?: string;
    teamSize?: string;
  }>();

  const teamA = useMemo(() => JSON.parse(params.teamA || "[]"), [params.teamA]);
  const teamB = useMemo(() => JSON.parse(params.teamB || "[]"), [params.teamB]);
  const remainingPlayers = useMemo(
    () => JSON.parse(params.remaining || "[]"),
    [params.remaining]
  ); 

  const teamSize = Number(params.teamSize || 0);

  const scoreA = Number(params.scoreA);
  const scoreB = Number(params.scoreB);

  /* ---------------- RESULTADO ---------------- */

  const winner =
    scoreA > scoreB ? "A" :
    scoreB > scoreA ? "B" :
    "draw";

  /* ---------------- MVP ---------------- */

  const allPlayers = [...teamA, ...teamB];

  const mvp = allPlayers.reduce((best: any, current: any) =>
    current.goals > best.goals ? current : best
  );

  /* ---------------- PROXIMA PARTIDA ---------------- */

  const handleNextMatch = () => {

  let nextTeamA: any[] = [];
  let nextTeamB: any[] = [];

  let newQueue = [...remainingPlayers];

  if (winner === "A") {

    nextTeamA = teamA;

    nextTeamB = newQueue.slice(0, teamSize);

    newQueue = newQueue.slice(teamSize);

  } 
  else if (winner === "B") {

    nextTeamA = teamB;

    nextTeamB = newQueue.slice(0, teamSize);

    newQueue = newQueue.slice(teamSize);

  } 
  else {

    nextTeamA = newQueue.slice(0, teamSize);
    nextTeamB = newQueue.slice(teamSize, teamSize * 2);

    newQueue = newQueue.slice(teamSize * 2);

  }

  router.push({
    pathname: "/partida",
    params: {
      teamA: JSON.stringify(nextTeamA),
      teamB: JSON.stringify(nextTeamB),
      remaining: JSON.stringify(newQueue),
      teamSize: String(teamSize),
    },
  });
};

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
        <Text style={styles.mvpName}>{mvp?.name}</Text>
        <Text style={styles.mvpStats}>
          ⚽ {mvp?.goals} | 👟 {mvp?.assists}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <TeamResumo title="Time A" players={teamA} />
        <TeamResumo title="Time B" players={teamB} />
      </ScrollView>

      {/* BOTÃO PRÓXIMA PARTIDA */}

      {remainingPlayers.length >= teamSize && (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNextMatch}
        >
          <Text style={styles.nextText}>
            Próxima Partida
          </Text>
        </TouchableOpacity>
      )}

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

  nextButton: {
    backgroundColor: "#fc5200",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  nextText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  }

});