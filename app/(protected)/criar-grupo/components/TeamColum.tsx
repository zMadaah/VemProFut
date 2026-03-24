import { StyleSheet, Text, View } from "react-native";
import { Player } from "../types";

type Props = {
  title: string;
  players: Player[];
};

export function TeamColumn({ title, players }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.list}>
        {players.map((player) => (
          <Text
            key={player.id}
            style={styles.player}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {player.name}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1A1A1A",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    minHeight: 150,
  },

  title: {
    color: "#fc5200",
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    fontSize: 16,
  },

  list: {
    gap: 6,
  },

  player: {
    color: "#fff",
    fontSize: 14,
  },
});