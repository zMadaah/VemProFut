import { useState } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
} from "react-native";

import Animated, {
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

import {
    Gesture,
    GestureDetector,
} from "react-native-gesture-handler";

import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const SWIPE_LIMIT = width * 0.35;

const matchesMock = [
  {
    id: "1",
    local: "Arena Cruzeiro",
    horario: "19:30",
    jogadores: "8/12",
    distancia: "2km",
  },
  {
    id: "2",
    local: "Society Norte",
    horario: "20:00",
    jogadores: "10/12",
    distancia: "3km",
  },
  {
    id: "3",
    local: "Arena Fut7",
    horario: "21:00",
    jogadores: "6/12",
    distancia: "5km",
  },
  {
    id: "4",
    local: "Campo Central",
    horario: "18:00",
    jogadores: "11/12",
    distancia: "1km",
  },
];

export default function LocalizacaoScreen() {
  const [index, setIndex] = useState(0);

  const translateX = useSharedValue(0);

  const current = matchesMock[index];

  function nextCard() {
    setIndex((prev) => prev + 1);
    translateX.value = 0;
  }

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })

    .onEnd(() => {
      if (translateX.value > SWIPE_LIMIT) {
        translateX.value = withSpring(
          width,
          {},
          () => runOnJS(nextCard)()
        );

      } else if (
        translateX.value < -SWIPE_LIMIT
      ) {
        translateX.value = withSpring(
          -width,
          {},
          () => runOnJS(nextCard)()
        );

      } else {
        translateX.value = withSpring(0);
      }
    });

  const cardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-width, 0, width],
      [-15, 0, 15]
    );

    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          rotate: `${rotate}deg`,
        },
      ],
    };
  });

  const likeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, 100],
      [0, 1]
    ),
  }));

  const nopeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [-100, 0],
      [1, 0]
    ),
  }));

  if (!current) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.empty}>
          Não existem mais partidas próximas
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Partidas próximas
      </Text>

      <View style={styles.cardsContainer}>
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              styles.card,
              cardStyle
            ]}
          >
            <Animated.Text
              style={[
                styles.like,
                likeStyle,
              ]}
            >
              MATCH
            </Animated.Text>

            <Animated.Text
              style={[
                styles.nope,
                nopeStyle,
              ]}
            >
              PASSAR
            </Animated.Text>

            <Text style={styles.local}>
              {current.local}
            </Text>

            <Text style={styles.info}>
              ⏰ {current.horario}
            </Text>

            <Text style={styles.info}>
              ⚽ {current.jogadores}
            </Text>

            <Text style={styles.info}>
              📍 {current.distancia}
            </Text>

          </Animated.View>
        </GestureDetector>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
    padding: 20,
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },

  cardsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: width * 0.85,
    height: 500,
    backgroundColor: "#1A1A1A",
    borderRadius: 30,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },

  local: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },

  info: {
    color: "#aaa",
    fontSize: 18,
    marginTop: 10,
  },

  like: {
    position: "absolute",
    top: 50,
    left: 30,
    fontSize: 34,
    fontWeight: "bold",
    color: "#00ff00",
    transform: [{ rotate: "-25deg" }],
  },

  nope: {
    position: "absolute",
    top: 50,
    right: 30,
    fontSize: 34,
    fontWeight: "bold",
    color: "#ff4444",
    transform: [{ rotate: "25deg" }],
  },

  empty: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    marginTop: 100,
  },
});