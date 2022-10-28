// import React, { useState } from 'react';
// import { StyleSheet, Text, TextInput, View, Dimensions, ListViewBase , FlatList} from 'react-native';
// import { CheckBox } from 'react-native-web';
// import KeyPadComponent from './KeypadComponent';
// // sửa lỗi paste phép tính
// // history, mở lại phép tính
// // search 

// const PizzaTranslator = () => {
//   const [history, setState] = useState([])
//   const [text, setText] = useState('');
//   const [input, setInput] = useState('');
//   return (


//     <View style={{ padding: 10 }}>

//       <TextInput
//         style={styles.input}
//         placeholder="Type here to calculate!"
//         onChangeText={
//           newText => {
//             console.log(newText);
//             setInput(newText.replace(/[^0-9 + -- * / ]/g, ''));
//             if (checkChar(newText.at(-1)) && checkChar(newText.at(-2))) {
//               setInput(newText.slice(0, -2) + newText.at(-1));
//             }
//           }}
//         onSubmitEditing={(_value) => {
//           if (!checkChar(_value.nativeEvent.text.at(-1))) {
//             var answer;
//             try {
//               answer = eval(_value.nativeEvent.text);
//             } catch (err) {
//               setInput("");
//               answer = "Input failed";
//             }
//             finally {
//               setText(answer);
//             }
//           }
//         }}
//         value={input} />
//       <Text>
//         Only number and +, -, *, /
//       </Text>
//       <Text style={{ padding: 10, fontSize: 30, textAlign: 'center', }}>
//         {text}
//       </Text>
//       <KeyPadComponent>

//       </KeyPadComponent>
//     </View>
//   );
// }
// function checkChar(c) {
//   const a = ["+", "-", "*", "/"];
//   return a.includes(c);
// }
// const styles = StyleSheet.create({
//   input: {
//     borderColor: "gray",
//     width: "100%",
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 10,
//     textAlign: 'center',
//     marginTop: Dimensions.get('window').height / 3
//   },
//   container: {
//     flex: 1,
//     paddingTop: 22
//   },
//   item: {
//     padding: 10,
//     fontSize: 18,
//     height: 44,
//   },
// });


// export default PizzaTranslator;
import React, { Component, startTransition } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Button from "./components/Button";
import Row from "./components/Row";
import calculator, { initialState } from "./components/calculator";
import { getHistories, storeHistories } from "./services/histories_service";

// create class component of App
export default class Main extends Component {
  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      await this.setState((state) => {
        console.log(this.props)
        state = initialState;
        state.currentValue = (!this.props.route.params) ? "0" : this.props.route.params.value;
        return state;
      })
    });



  }
  async componentWillUnmount() {
    this._unsubscribe();
  }
  state = initialState;

  // handle tap method
  HandleTap = async (type, value) => {
    // if (type == "clear")
    //   if (this.props.route.params)
    //     this.props.route.params.value = "0";
    await this.setState((state) =>
      calculator(type, value, state)
    );
  };

  saveData = async () => {
    let c = await getHistories('@storage_Key');

    if (c.length > 10)
      c.pop();
    c.unshift(this.state.record);
    await storeHistories('@storage_Key', c);
    console.log(c);
  }
  // render method
  render() {
    return (

      <View style={styles.container}>
        {/* Status bae here */}

        <SafeAreaView className="panel-content">
          <Text style={styles.value}>
            {(this.state.previousValue) ? parseFloat(this.state.previousValue).toLocaleString() : ""}
          </Text>
          <Text style={styles.value}>
            {(this.state.operator) ? this.state.operator : ""}
          </Text>
          <Text style={styles.value}>
            {parseFloat(this.state.currentValue).toLocaleString()}
          </Text>
          {/* Do create componentRow */}
          <Row>
            <Button
              text="C"
              theme="secondary"
              onPress={() => this.HandleTap("clear")}
            />
            <Button
              text="+/-"
              theme="secondary"
              onPress={() => this.HandleTap("posneg")}
            />
            <Button
              text="%"
              theme="secondary"
              onPress={() => this.HandleTap("percentage")}
            />
            <Button
              text="/"
              theme="accent"
              onPress={() => this.HandleTap("operator", "/")}
            />
          </Row>
          {/* Number */}
          <Row>
            <Button text="7" onPress={() => this.HandleTap("number", 7)} />
            <Button text="8" onPress={() => this.HandleTap("number", 8)} />
            <Button text="9" onPress={() => this.HandleTap("number", 9)} />
            <Button
              text="X"
              theme="accent"
              onPress={() => this.HandleTap("operator", "*")}
            />
          </Row>
          <Row>
            <Button text="5" onPress={() => this.HandleTap("number", 5)} />
            <Button text="6" onPress={() => this.HandleTap("number", 6)} />
            <Button text="7" onPress={() => this.HandleTap("number", 7)} />
            <Button
              text="-"
              theme="accent"
              onPress={() => this.HandleTap("operator", "-")}
            />
          </Row>
          <Row>
            <Button text="1" onPress={() => this.HandleTap("number", 1)} />
            <Button text="2" onPress={() => this.HandleTap("number", 2)} />
            <Button text="3" onPress={() => this.HandleTap("number", 3)} />
            <Button
              text="+"
              theme="accent"
              onPress={() => this.HandleTap("operator", "+")}
            />
          </Row>
          <Row>
            <Button text="0" onPress={() => this.HandleTap("number", 0)} />
            <Button text="." onPress={() => this.HandleTap("number", ".")} />
            <Button
              text="="
              theme="primary"
              onPress={
                () => {
                  this.HandleTap("equal", "="),
                    this.saveData()


                }
              }
            />
          </Row>
        </SafeAreaView>

      </View>
    );
  }
}

// create styles of app
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#202020",
    justifyContent: "flex-end",
    flex: 1,
  },
  value: {
    color: "#fff",
    fontSize: 42,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10,
  },
  react_tab_list: {
    justifyContent: "flex-start",
  },
  react_tab_item: {

  },
});