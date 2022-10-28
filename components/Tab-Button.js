import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";

export default ({ onPress, text, size, theme }) => {
  const buttonStyles = [styles.button];
  const textStyles = [styles.text];

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};

// set dimmenstion
const screen = Dimensions.get("window");
const buttonWidth = ((screen.width / 4) > 50) ? 50 : (screen.width / 4);
const buttonHeight = ((screen.width / 6) > 50) ? 50 : (screen.width / 6);


const styles = StyleSheet.create({
  button: {
    backgroundColor: "#333333",
    flex: 1,
    height: Math.floor(buttonHeight - 10),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#202020",
  },
  text: {
    color: "#fff",
    fontSize: 24,
  },
});