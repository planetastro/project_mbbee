import { useState } from "react";
import { TextInput, Text, View, StyleSheet, StyleSheetProperties } from "react-native";

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
    <View style={styles(isClosest).container}>
      <TextInput style={styles().partInput} placeholder="Name" />
      {parts.map((part, idx) => (
        <TextInput
          key={idx}
          style={styles().partInput}
          onChangeText={(text) => onChangePart(idx, text)}
          placeholder={part}
          placeholderTextColor={"slategray"}
        />
      ))}
      <Text style={styles().answerText}>{result}</Text>
      {isClosest && <Text>Winner!</Text>}
    </View>
  );
}

const styles = (isClosest?: boolean) => StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: isClosest ? "yellowgreen" : ""
  },
  partInput: {
    borderBottomWidth: 1,
    alignItems: "stretch",
  },
  answerText: {
    fontWeight: "bold",
  },
});
