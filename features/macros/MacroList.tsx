import React, { useRef } from 'react'
import { Animated, StyleSheet, useColorScheme } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import { ResultDetails } from '../../components/ResultDetails'
import SwipeableList, { IconAction, iconActionRender } from '../../components/SwipeableList'
import { Text, View } from '../../components/Themed'
import { Macro } from './macroSlice'

interface MacroListProps {
  data: Macro[];
  onDelete: (id: string) => void;
  onShowResult: (result: ResultDetails) => void;
  onDuplicate: (id: string) => void;
  onEdit: (id: string) => void;
  onLogs: (id: string) => void;
  onRoll: (id: string) => boolean;
}

const MacroList = (props: MacroListProps) => {
  const rightActions: IconAction<Macro>[] = [
    {
      iconName: "ios-list-box",
      color: "#2980B9",
      onPress: (item: Macro) => item.id && props.onLogs(item.id),
    },
    {
      iconName: "ios-copy",
      color: "#27AE60",
      onPress: (item: Macro) => item.id && props.onDuplicate(item.id),
    },
    {
      iconName: "ios-hammer",
      color: "#F1C40F",
      onPress: (item: Macro) => item.id && props.onEdit(item.id),
    },
    {
      iconName: "ios-trash",
      color: "#E74C3C",
      onPress: (item: Macro) => item.id && props.onDelete(item.id),
    },
  ];
  const renderItem = (item: Macro) => (
    <MacroListItem
      macro={item}
      onShowResult={props.onShowResult}
      onRoll={props.onRoll}
    />
  );
  return (
    <SwipeableList
      style={{ width: "100%" }}
      data={props.data}
      renderItem={renderItem}
      renderRightActions={iconActionRender(rightActions)}
    />
  );
};

interface MacroListItemProps {
  macro: Macro;
  onShowResult: (result: ResultDetails) => void;
  onRoll: (id: string) => boolean;
}

const MacroListItem = (props: MacroListItemProps) => {
  const theme = useColorScheme();
  const flashAnim = useRef(new Animated.Value(1)).current;
  const lastRoll = props.macro.results[props.macro.results.length - 1];

  const rollColorStyle =
    lastRoll?.result === lastRoll?.min
      ? { color: "red" }
      : lastRoll?.result === lastRoll?.max
      ? { color: "green" }
      : {};

  const onShowResult = () => {
    lastRoll &&
      props.onShowResult({
        ...lastRoll,
        name: props.macro.name,
        equation: props.macro.equation,
      });
  };

  const onRoll = () => {
    const success = props.onRoll(props.macro.id!);
    if (success) {
      flashAnim.setValue(0);
      Animated.timing(flashAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: 50,
      }}
    >
      <RectButton
        style={{ flex: 1, justifyContent: "center", height: "100%" }}
        onPress={onRoll}
        underlayColor={theme === "dark" ? "white" : undefined}
      >
        <Text style={{ fontSize: 30, marginLeft: 5 }}>{props.macro.name}</Text>
      </RectButton>
      <View style={styles.separatorV} />
      <RectButton
        style={{ minWidth: 80, height: "100%", justifyContent: "center" }}
        onPress={onShowResult}
        underlayColor={theme === "dark" ? "white" : undefined}
      >
        <Animated.View
          style={[
            {
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            },
            { opacity: flashAnim },
          ]}
        >
          <Text style={[{ fontSize: 30 }, rollColorStyle]}>
            {lastRoll?.result}
          </Text>
        </Animated.View>
      </RectButton>
    </View>
  );
};

export default MacroList;

const styles = StyleSheet.create({
  separatorV: {
    backgroundColor: "rgb(200, 199, 204)",
    height: "100%",
    width: StyleSheet.hairlineWidth,
  },
});
