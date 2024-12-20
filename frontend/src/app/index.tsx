import { Alert, Button, StyleSheet, View } from "react-native";
import { useState } from "react";

import Game from "../components/Game";

const createGameModal = () => {
  Alert.alert("pressed");
};

export default function LandingPage() {
  const [question, setQuestion] = useState("How many windows are in Sydney?");
  const [formulaParts, setFormulaParts] = useState([
    "Number of buildings",
    "Number of floors",
    "Average number of windows per floor",
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="New Game" onPress={createGameModal} />
      </View>
      <Game question={question} parts={formulaParts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  buttonContainer: {
    width: 100,
    alignSelf: "flex-end",
  },
  gameContainer: {},
});
