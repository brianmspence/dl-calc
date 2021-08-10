import React from 'react'
import { StyleSheet } from 'react-native'

import { Text, View } from './Themed'

interface RangeGraphProps {
  result: number;
  min: number;
  max: number;
}

const RangeGraph = (props: RangeGraphProps) => {
  const arrowPos =
    ((props.result - props.min) / (props.max - props.min)) * 100 + "%";
  return (
    <View style={styles.container}>
      <Text>min</Text>
      <View style={styles.range}>
        <View
          style={[
            styles.arrow,
            { backgroundColor: "white", width: 1, left: "25%" },
          ]}
        />
        <View
          style={[
            styles.arrow,
            { backgroundColor: "white", width: 1, left: "50%" },
          ]}
        />
        <View
          style={[
            styles.arrow,
            { backgroundColor: "white", width: 1, left: "75%" },
          ]}
        />
        <View style={[styles.arrow, { left: arrowPos }]} />
      </View>
      <Text>max</Text>
    </View>
  );
};

export default RangeGraph;

const styles = StyleSheet.create({
  arrow: {
    height: "100%",
    width: 5,
    backgroundColor: "green",
    position: "absolute",
  },
  container: {
    flexDirection: "row",
    width: "100%",
  },

  range: {
    flex: 1,
    backgroundColor: "gray",
    paddingRight: 5,
  },
});
