import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PlayerStats } from "../(protected)/criar-grupo/types";

export default function PartidaScreen() {
  const params = useLocalSearchParams<{
    teamA?: string;
    teamB?: string;
  }>();

  
  const parsedTeamA = useMemo(() => {
    if (!params.teamA) return [];
    return JSON.parse(params.teamA as string);
  }, [params.teamA]);

  const parsedTeamB = useMemo(() => {
    if (!params.teamB) return [];
    return JSON.parse(params.teamB as string);
  }, [params.teamB]);

  
  const [teamAPlayers, setTeamAPlayers] = useState<PlayerStats[]>([]);
  const [teamBPlayers, setTeamBPlayers] = useState<PlayerStats[]>([]);

  const [minutes, setMinutes] = useState(10);
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);

 
  useEffect(() => {
    const allPlayers = [...parsedTeamA, ...parsedTeamB];

    const teamA: PlayerStats[] = [];
    const teamB: PlayerStats[] = [];

    allPlayers.forEach((player: any, index: number) => {
      const playerWithStats = {
        ...player,
        goals: 0,
        assists: 0,
        fouls: 0,
      };

      if (index % 2 === 0) {
        teamA.push(playerWithStats);
      } else {
        teamB.push(playerWithStats);
      }
    });

    setTeamAPlayers(teamA);
    setTeamBPlayers(teamB);
  }, [parsedTeamA, parsedTeamB]);

  
  useEffect(() => {
    setSecondsLeft(minutes * 60);
  }, [minutes]);

  useEffect(() => {
    let interval: any;

    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const formatTime = () => {
    const min = Math.floor(secondsLeft / 60);
    const sec = secondsLeft % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(minutes * 60);
  };

  const handleFinishMatch = () => {
    router.push({
      pathname: "/resumo",
      params: {
        teamA: JSON.stringify(teamAPlayers),
        teamB: JSON.stringify(teamBPlayers),
        scoreA,
        scoreB,
      },
    });
  };

  

  const addGoal = (team: "A" | "B", id: string) => {
    if (team === "A") {
      setTeamAPlayers((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, goals: p.goals + 1 } : p
        )
      );
      setScoreA((prev) => prev + 1);
    } else {
      setTeamBPlayers((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, goals: p.goals + 1 } : p
        )
      );
      setScoreB((prev) => prev + 1);
    }
  };

  const addAssist = (team: "A" | "B", id: string) => {
    if (team === "A") {
      setTeamAPlayers((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, assists: p.assists + 1 } : p
        )
      );
    } else {
      setTeamBPlayers((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, assists: p.assists + 1 } : p
        )
      );
    }
  };

  const addFoul = (team: "A" | "B", id: string) => {
    if (team === "A") {
      setTeamAPlayers((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, fouls: p.fouls + 1 } : p
        )
      );
    } else {
      setTeamBPlayers((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, fouls: p.fouls + 1 } : p
        )
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Partida</Text>

      
      {!isRunning && (
        <View style={styles.timeSelector}>
          {[10, 15, 20].map((min) => (
            <TouchableOpacity
              key={min}
              style={[
                styles.timeButton,
                minutes === min && styles.timeButtonActive,
              ]}
              onPress={() => setMinutes(min)}
            >
              <Text style={styles.timeText}>{min} min</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text style={styles.timer}>{formatTime()}</Text>

      <View style={styles.controlsRow}>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleReset}>
          <Text style={styles.secondaryText}>Resetar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => setIsRunning(!isRunning)}
        >
          <Text style={styles.startText}>
            {isRunning ? "Pausar" : "Iniciar"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.finishButton} onPress={handleFinishMatch}>
        <Text style={styles.finishText}>Finalizar Partida</Text>
      </TouchableOpacity>


      
      <View style={styles.scoreContainer}>
        <TeamScore title="Time A" score={scoreA} />
        <TeamScore title="Time B" score={scoreB} />
      </View>

     
      <View style={styles.playersContainer}>
        <PlayersColumn
          title="Time A"
          players={teamAPlayers}
          team="A"
          onGoal={addGoal}
          onAssist={addAssist}
          onFoul={addFoul}
        />

        <PlayersColumn
          title="Time B"
          players={teamBPlayers}
          team="B"
          onGoal={addGoal}
          onAssist={addAssist}
          onFoul={addFoul}
        />
      </View>
    </SafeAreaView>
  );
}



function TeamScore({ title, score }: any) {
  return (
    <View style={styles.teamScore}>
      <Text style={styles.teamTitle}>{title}</Text>
      <Text style={styles.score}>{score}</Text>
    </View>
  );
}

function PlayersColumn({ title, players, team, onGoal, onAssist, onFoul }: any) {
  return (
    <View style={styles.playersColumn}>
      <Text style={styles.playersTitle}>{title}</Text>

      {players.map((player: any) => (
        <View key={player.id} style={styles.playerRow}>
          <Text style={styles.playerName} numberOfLines={1}>
            {player.name}
          </Text>

          <View style={styles.iconsRow}>
            <TouchableOpacity onPress={() => onGoal(team, player.id)}>
              <Text style={styles.icon}>⚽ {player.goals}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onAssist(team, player.id)}>
              <Text style={styles.icon}>👟 {player.assists}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onFoul(team, player.id)}>
              <Text style={styles.icon}>🟥 {player.fouls}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0F0F0F",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },

  timeSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  timeButton: {
    backgroundColor: "#1C1C1C",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  timeButtonActive: {
    backgroundColor: "#fc5200",
  },

  timeText: {
    color: "#fff",
  },

  timer: {
    fontSize: 56,
    fontWeight: "200",
    color: "#fc5200",
    textAlign: "center",
    marginVertical: 20,
  },

  finishButton: {
  backgroundColor: "#22c55e",
  padding: 16,
  borderRadius: 12,
  alignItems: "center",
  marginTop: 20,
},

finishText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 16,
},

  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  startButton: {
    flex: 1,
    backgroundColor: "#fc5200",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginLeft: 10,
  },

  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#555",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginRight: 10,
  },

  startText: {
    color: "#fff",
    fontWeight: "bold",
  },

  secondaryText: {
    color: "#aaa",
    fontWeight: "600",
  },

  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  teamScore: {
    alignItems: "center",
  },

  teamTitle: {
    color: "#fff",
    marginBottom: 8,
  },

  score: {
    fontSize: 36,
    color: "#fc5200",
  },

  scoreButtons: {
    flexDirection: "row",
    gap: 20,
  },

  scoreBtn: {
    fontSize: 28,
    color: "#fff",
  },

  playersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  playersColumn: {
    width: "48%",
  },

  playersTitle: {
    color: "#fc5200",
    fontWeight: "bold",
    marginBottom: 10,
  },

  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1A1A1A",
    padding: 8,
    borderRadius: 8,
    marginBottom: 6,
  },

  playerName: {
    color: "#fff",
    flex: 1,
    marginRight: 8,
  },

  iconsRow: {
    flexDirection: "row",
    gap: 10,
  },

  icon: {
    fontSize: 16,
  },
});