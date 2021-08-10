import { Ionicons } from '@expo/vector-icons'
import React, { useRef, useState } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import { FlatList, RectButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import { SavedResult } from '../types'
import { Text, useThemeColor, View } from './Themed'

interface ResultLogProps {
  resultHistory: any[];
  onDetails: (result: SavedResult) => void;
  onReroll?: (equation: string) => void;
  onSave?: (equation: string) => void;
  lockSwipe?: boolean;
}

//TODO refactor to use SwipeableList?
const Row = (props: any) => {
  const swipeable = useRef<Swipeable>(null);

  const onLeftPress = () => {
    props.onLeftPress && props.onLeftPress(props.equation);
    swipeable && swipeable.current && swipeable.current.close();
  };

  const onRightPress = () => {
    props.onSave && props.onSave(props.equation);
    swipeable && swipeable.current && swipeable.current.close();
  };

  const LeftActions = () => (
    <View style={styles.leftAction}>
      <Ionicons color="white" size={50} name="ios-repeat" />
    </View>
  );

  const RightActions = () => (
    <RectButton style={styles.rightAction} onPress={onRightPress}>
      <Ionicons color="white" size={50} name="ios-add-circle-outline" />
    </RectButton>
  );

  return (
    <Swipeable
      ref={swipeable}
      onSwipeableLeftOpen={onLeftPress}
      renderLeftActions={LeftActions}
      // renderRightActions={RightActions}
      enabled={!props.lockSwipe}
    >
      <ResultLogEntry {...props} />
    </Swipeable>
  );
};

const hashData = (data: { id: string }[]) => {
  return data.map((i) => i.id).reduce((prev, current) => prev + current, "");
};

const ResultLog = (props: ResultLogProps) => {
  const [dataHash, setDataHash] = useState<string>();
  const flatList = useRef<FlatList<any>>(null);

  const scroll = () => {
    flatList.current && flatList.current.scrollToEnd({ animated: true });
  };

  //TODO this seems a bit wacky. Is there a better way to control scroll and animate?
  const newHash = hashData(props.resultHistory);
  if (newHash != dataHash) {
    setDataHash(newHash);
    setTimeout(() => scroll(), 100); //TODO this makes the scroll wait until the list renders. Kinda bad
  }

  const renderItem = (info: any) => (
    <Row
      {...info.item}
      onPress={props.onDetails}
      onLeftPress={props.onReroll}
      onSave={props.onSave}
      lockSwipe={props.lockSwipe}
    />
  );

  return (
    <FlatList
      style={styles.resultLogs}
      ref={flatList}
      data={props.resultHistory}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListFooterComponent={() => <View style={styles.separator} />}
    />
  );
};

interface ResultLogEntryProps extends SavedResult {
  onPress: (result: SavedResult) => void;
}

const ResultLogEntry = (props: ResultLogEntryProps) => {
  const backgroundColor = useThemeColor({}, "background");
  const theme = useColorScheme();

  const onPress = () => {
    props.onPress({
      dice: props.dice,
      equation: props.equation,
      result: props.result,
      min: props.min,
      max: props.max,
      rolledEquation: props.rolledEquation,
    });
  };

  const resultColor =
    props.max !== props.min && props.result === props.min
      ? { color: "red" }
      : props.max !== props.min && props.result === props.max
      ? { color: "green" }
      : {};

  return (
    <RectButton
      style={{
        backgroundColor,
      }}
      onPress={onPress}
      underlayColor={theme === "dark" ? "white" : undefined}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          minHeight: 50,
          marginLeft: 5,
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        <View style={{ backgroundColor: "transparent", flex: 1 }}>
          <Text style={[styles.text, { flex: 1 }]}>{props.rolledEquation}</Text>
          <Text
            selectable={true}
            style={[styles.text, { flex: 1, opacity: 0.5, fontSize: 15 }]}
          >
            {props.equation}
          </Text>
        </View>

        <View style={styles.separatorV} />
        <View
          style={{
            minWidth: 80,
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <Text style={[styles.text, resultColor]}>{props.result}</Text>
        </View>
      </View>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  entry: {
    margin: 5,
  },
  text: {
    fontSize: 30,
  },
  resultLogs: {
    width: "100%",
  },
  separator: {
    backgroundColor: "rgb(200, 199, 204)",
    height: StyleSheet.hairlineWidth,
  },
  leftAction: {
    backgroundColor: "#497AFC",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  rightAction: {
    backgroundColor: "#33D6FF",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  separatorV: {
    backgroundColor: "rgb(200, 199, 204)",
    height: "100%",
    width: StyleSheet.hairlineWidth,
  },
});

export default ResultLog;
