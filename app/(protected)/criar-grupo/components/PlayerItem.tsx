import { StyleSheet, Text, View } from "react-native";
import { Player } from "../types";

type Props = {
  player: Player;
  index: number;
};

export function PlayerItem({ player, index }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {index + 1}. {player.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 6 },
  text: { color: "#fff" },
});