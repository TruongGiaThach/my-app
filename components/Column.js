import { StyleSheet, View } from "react-native";

const Column = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

// create styles of Column
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
  },
});

export default Column;