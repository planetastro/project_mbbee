import { useState } from "react";
import { TextInput, Text, View, StyleSheet } from "react-native";

function createPlaceholder(part: string): string {
  const units = part.split(" of ")[1];
  const randomNumber = Math.ceil(Math.random() * 100) * 10;
  return `e.g. ${randomNumber} ${units}`;
}

export default function AnswerRow({
  parts,
  isClosest,
  updateAnswer,
}: {
  parts: string[];
  isClosest: boolean,
  updateAnswer: (result: number) => void;
}) {
  const [values, setValues] = useState<Array<number>>(Array(parts.length).fill(0));
  const [result, setResult] = useState(0);

  function onChangePart(idx: number, text: string) {
    const newValues = values.map((value, i) => {
      if (i == idx) {
        return parseInt(text);
      } else {
        return value;
      }
    });
    setValues(newValues);

    const newResult = newValues.reduce((a, b) => a * b, 1);
    setResult(newResult);
    updateAnswer(newResult);
  }

  return (
    <View>
      <View style={styles(isClosest).answersContainer}>
        <TextInput style={styles().partInput} placeholder="Name" />
        {parts.map((part, idx) => (
          <TextInput
          key={idx}
          style={styles().partInput}
          onChangeText={(text) => onChangePart(idx, text)}
          placeholder={createPlaceholder(part)}
          placeholderTextColor={"slategray"}
          />
        ))}
        <Text style={styles().answerText}>{`${result} windows in Sydney`}</Text>
        {isClosest && <Text>Winner!</Text>}
      </View>
    </View>
  );
}

const styles = (isClosest?: boolean) => StyleSheet.create({
  answersContainer: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: isClosest ? "yellowgreen" : "",
    flexGrow: 1,
    flexShrink: 1,
  },
  partInput: {
    borderBottomWidth: 1,
    alignItems: "stretch",
    flexBasis: "auto",
    width: "100%",
  },
  answerText: {
    fontWeight: "bold",
    flexBasis: "auto",
    width: "100%",
  },
});
