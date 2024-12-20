import { Text, View, StyleSheet, Button } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import AnswerRow from "./AnswerRow";

export type GameProps = {
  question: string;
  parts: string[];
};

export type Answer = {
  id: number;
  result: number;
  isClosest: boolean;
};

function joinWithIcon(parts: string[]) {
  let counter = 0;
  let newParts = parts.map<React.ReactNode>((part, idx) => (
    <Text key={idx + counter++} style={styles.partText}>
      {part}
    </Text>
  ));

  counter = 0;
  return newParts.reduce((prev, curr, currIdx) => [
    prev,
    prev && (
      <FontAwesome key={currIdx + counter++} name="times" size={24} color={"black"} />
    ),
    curr,
  ]);
}

function aggregateAnswers(answers: Answer[]) {
  const answersSum = answers
    .map((answer) => answer.result)
    .reduce((a, b) => a + b, 0);
  return answersSum / answers.length;
}

// Globals
let answerIdCounter = 0;

export default function Game({ question, parts }: GameProps) {
  const [answers, setAnswers] = useState<Array<Answer>>([]);

  const addAnswer = () => {
    const answerId = answerIdCounter++;
    const newAnswers = [
      ...answers,
      {
        id: answerId,
        result: 0,
        isClosest: false,
      }
    ]
    setAnswers(newAnswers);
  }

  const updateAnswer = (answerId: number) => {
    return (result: number) => {
      const newAnswers = [...answers];
      const changedAnswer = newAnswers.find((answer) => answer.id == answerId);
      if (changedAnswer !== undefined) changedAnswer.result = result;

      setAnswers(newAnswers);
    };
  };

  const checkAnswers = () => {
    const aggregate = aggregateAnswers(answers);
    const minDiff = Math.min(...answers.map(answer => Math.abs(answer.result - aggregate)));
    const checkedAnswers = answers.map(answer => {
      if (Math.abs(answer.result - aggregate) == minDiff) {
        // Closest answer, toggle active
        return {
          ...answer,
          isClosest: true,
        };
      } else {
        return {
          ...answer,
          isClosest: false,
        };
      }
    });
    setAnswers(checkedAnswers);
  }

  return (
    <>
      <View style={styles.container}>
        {/* Question Title */}
        <View>
          <Text style={styles.questionText}>{question}</Text>
        </View>

        {/* Parts to make up Question Answer */}
        <View style={styles.partsContainer}>{joinWithIcon(parts)}</View>

        {/* Append a new Answer */}
        <View style={styles.answerContainer}>
          {answers.map(answer => <AnswerRow
            key={answer.id}
            parts={parts}
            isClosest={answer.isClosest}
            updateAnswer={updateAnswer(answer.id)}
          />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button color="blue" title={"Add Answer"} onPress={addAnswer} />
          <Button color="green" title={"Check Answers"} onPress={checkAnswers} />
        </View>

        {/* Final statistics */}
        <View>
          <Text style={styles.statsText}>
            Average: {aggregateAnswers(answers)}
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  questionText: {
    color: "#25292e",
    fontSize: 20,
    fontStyle: "italic",
  },
  partsContainer: {
    marginVertical: 10,
    backgroundColor: "light-grey",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  partText: {
    fontSize: 20,
    marginHorizontal: 10,
    backgroundColor: "lightgray",
  },
  answerContainer: {
    flexDirection: "column",
    minHeight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  statsText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
