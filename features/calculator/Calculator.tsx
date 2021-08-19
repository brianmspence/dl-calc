import { DiceEvaluator } from 'dl-eval'
import React, { useState } from 'react'
import { Image, StyleSheet, useWindowDimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import ResultLog from '../../components/ResultLog'
import { Button, Text, TextInput, useThemeColor, View } from '../../components/Themed'
import { RootState } from '../../redux/rootReducer'
import { Result } from '../../types'
import { addResult } from './calculatorSlice'

const D20 = require("../../assets/images/1d20.png");
const D6 = require("../../assets/images/1d6.png");

const diceCalculator = new DiceEvaluator();

interface CalcProps {
  showResult: (result: any) => void;
  onSave: (equation: string) => void;
}

const Calculator = (props: CalcProps) => {
  const [eqError, setEqError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dimensions = useWindowDimensions();
  const dispatch = useDispatch();
  const resultHistory = useSelector(
    (state: RootState) => state.calculator.results
  );
  const [equation, setEquation] = useState("");

  const isLandscape = dimensions.width > dimensions.height;

  const onChangeText = (text: string) => {
    setEquation(text);
    setEqError(false);
  };
  const clearText = () => {
    setEquation("");
    setEqError(false);
  };
  const addText = (text: string) => {
    setEquation(equation + text);
    setEqError(false);
  };
  const roll = () => {
    evaulate(equation);
  };
  const onReroll = (eq: string) => {
    evaulate(eq);
  };
  const evaulate = (eq: string) => {
    if (eq.trim() === "") {
      return;
    }
    let r: Result;
    try {
      if(eq.match(/[5-9]\d\d+d\d+|[1-9]\d\d\d+d\d+/g)) {
        setEqError(true)
        setErrorMessage("Rolling 500 or more dice not supported")
        return
      }
      r = diceCalculator.eval(eq);
    } catch (error) {
      setEqError(true);
      setErrorMessage(error.message);
      return;
    }

    const newResult = {
      equation: eq,
      ...r,
    };

    setEquation("");
    dispatch(addResult(newResult));
  };

  return (
    <View
      style={[
        styles.container,
        { flexDirection: isLandscape ? "row" : "column" },
      ]}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <ResultLog
          onDetails={props.showResult}
          onReroll={onReroll}
          onSave={props.onSave}
          resultHistory={resultHistory}
        />
      </View>
      {isLandscape && <View style={[styles.separatorV]} />}
      <View
        style={{
          justifyContent: "flex-end",
          width: isLandscape ? "50%" : "100%",
          flex: isLandscape ? 1 : 2,
          height: "100%",
        }}
      >
        <View style={{ width: "100%", padding: 5 }}>
          <TextInput
            autoCorrect={false}
            style={[styles.textEquation, eqError ? { borderColor: "red" } : {}]}
            value={equation}
            onChangeText={onChangeText}
            onSubmitEditing={roll}
          />
          {eqError && <Text style={{ color: "red" }}>{errorMessage}</Text>}
        </View>
        <ButtonPad clearText={clearText} addText={addText} roll={roll} />
      </View>
    </View>
  );
};

export default Calculator;

interface ButtonPadProps {
  clearText: () => void;
  addText: (text: string) => void;
  roll: () => void;
}

const ButtonPad = (props: ButtonPadProps) => {
  const addText = (str: string) => () => props.addText(str);
  return (
    <View style={[styles.buttonPad]}>
      <View style={styles.buttonRow}>
        <CalcButton onPress={props.clearText} title="Clear" />
        <CalcButton onPress={addText("1d20")} img={D20} />
        <CalcButton onPress={addText("1d6")} img={D6} />
        <CalcButton onPress={addText("/")} title="/" />
      </View>

      <View style={styles.buttonRow}>
        <CalcButton onPress={addText("7")} title="7" />
        <CalcButton onPress={addText("8")} title="8" />
        <CalcButton onPress={addText("9")} title="9" />
        <CalcButton onPress={addText("*")} title="*" />
      </View>

      <View style={styles.buttonRow}>
        <CalcButton onPress={addText("4")} title="4" />
        <CalcButton onPress={addText("5")} title="5" />
        <CalcButton onPress={addText("6")} title="6" />
        <CalcButton onPress={addText("-")} title="-" />
      </View>

      <View style={styles.buttonRow}>
        <CalcButton onPress={addText("1")} title="1" />
        <CalcButton onPress={addText("2")} title="2" />
        <CalcButton onPress={addText("3")} title="3" />
        <CalcButton onPress={addText("+")} title="+" />
      </View>
      <View style={styles.buttonRow}>
        <CalcButton onPress={addText("0")} title="0" />
        <CalcButton onPress={addText("d")} title="d" />
        <CalcButton onPress={addText(".")} title="." />
        <CalcButton onPress={props.roll} title="Roll" />
      </View>
    </View>
  );
};

interface CalcButtonProps {
  title?: string;
  img?: any;
  onPress?: () => void;
}

const CalcButton = (props: CalcButtonProps) => {
  const dimensions = useWindowDimensions();
  const height = dimensions.height / 12;
  const tintColor = useThemeColor({ light: "black" }, "tint");
  return (
    <View style={[styles.buttonContainer]}>
      <Button style={styles.button} onPress={props.onPress}>
        {props.title && <Text style={styles.buttonText}>{props.title}</Text>}
        {props.img && <Image style={{ tintColor }} source={props.img} />}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  buttonPad: {
    flex: 1,
    justifyContent: "center",
    display: "flex",
    width: "100%",
    height: "100%",
    marginBottom: 10,
  },
  buttonRow: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  buttonContainer: {
    // flexBasis: "25%",
    flex: 1,
    height: "100%",
    padding: 5,
    backgroundColor: "transparent",
  },
  button: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#616A6B",
  },
  buttonText: {
    fontSize: 25,
  },
  textEquation: {
    fontSize: 30,
    borderStyle: "solid",
    borderColor: "gray",
    borderWidth: 3,
    width: "100%",
    minHeight: 50,
    padding: 5,
  },
  separatorV: {
    backgroundColor: "rgb(200, 199, 204)",
    height: "100%",
    width: StyleSheet.hairlineWidth,
  },
});
