import { Ionicons } from '@expo/vector-icons'
import React, { useRef } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { FlatList, RectButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'

interface RenderProps<T> {
  renderItem: (item: T) => React.ReactElement | null;
  renderLeftActions?: (
    item: T,
    close: () => void
  ) => React.ReactNode | undefined;
  renderRightActions?: (
    item: T,
    close: () => void
  ) => React.ReactNode | undefined;
}

interface RowProps<T> extends RenderProps<T> {
  item: T;
}

interface SwipeableListProps<T> extends RenderProps<T> {
  data: T[];
  style?: StyleProp<ViewStyle>;
  ref?: React.Ref<FlatList<T>>;
}

function SwipeableList<T>(props: SwipeableListProps<T>) {
  const { data, style, ref, ...otherProps } = props;
  return (
    <FlatList
      style={style}
      data={data}
      ref={ref}
      renderItem={({ item }) => <Row item={item} {...otherProps} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListFooterComponent={() => <View style={styles.separator} />}
    />
  );
}

export default SwipeableList;

function Row<T>(props: RowProps<T>) {
  const swipeable = useRef<Swipeable>(null);
  const close = () => {
    swipeable?.current?.close();
  };
  const renderLeftActions =
    props.renderLeftActions &&
    (() => props.renderLeftActions!(props.item, close));
  const renderRightActions =
    props.renderRightActions &&
    (() => props.renderRightActions!(props.item, close));
  return (
    <Swipeable
      ref={swipeable}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
    >
      {props.renderItem(props.item)}
    </Swipeable>
  );
}

export interface IconAction<T> {
  color: string;
  iconName: string;
  iconColor?: string;
  iconSize?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: (item: T, close: () => void) => void;
  filter?: (item: T) => boolean;
}
export interface IconActionRenderConfig {
  closeOnActionPress?: boolean;
}
const defaultConfig = {
  closeOnActionPress: true,
};
export function iconActionRender<T>(
  actions: IconAction<T>[],
  config: IconActionRenderConfig = defaultConfig
) {
  return (item: T, close: () => void) => {
    const wrapOnPress = (press: IconAction<T>["onPress"]) => () => {
      press && press(item, close);
      config.closeOnActionPress && close();
    };
    const filteredActions = actions.filter((a) => !a.filter || a.filter(item));
    return (
      <View style={{ flexDirection: "row" }}>
        {filteredActions.map((action, index) => (
          <RectButton
            key={index}
            style={[
              styles.action,
              { backgroundColor: action.color },
              action.style,
            ]}
            onPress={action.onPress && wrapOnPress(action.onPress)}
          >
            <Ionicons
              color={action.iconColor || "white"}
              size={action.iconSize || 50}
              name={action.iconName}
            />
          </RectButton>
        ))}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: "rgb(200, 199, 204)",
    height: StyleSheet.hairlineWidth,
  },
  action: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
});
