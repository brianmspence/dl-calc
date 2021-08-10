import React from 'react'

import { Scope } from '../types'
import RangeGraph from './RangeGraph'
import { Text, View } from './Themed'

export interface ResultDetails {
  equation: string;
  result: number;
  dice: number[];
  min: number;
  max: number;
  name?: string;
  scope?: Scope;
  rolledEquation: string;
}

export function ResultDetails(props: ResultDetails) {
  const equation = props.equation;
  const result = props.result;
  const dice = props.dice;

  const map = props.dice.reduce(
    (acc: { [key: number]: number }, cur: number) => {
      if (acc.hasOwnProperty(cur)) {
        const old = acc[cur];
        acc[cur] = old + 1;
      } else {
        acc[cur] = 1;
      }
      return acc;
    },
    {}
  );

  const sums = Object.keys(map)
    .map((s) => Number(s))
    .sort((f, s) => f - s)
    .reduce((acc, cur) => {
      const out = (acc.length == 0 ? acc : acc + " ") + map[cur] + ":" + cur;
      return out;
    }, "");

  const nameText = props.name ? (
    <Text style={{ fontSize: 30, fontWeight: "bold" }}>{props.name}</Text>
  ) : null;

  return (
    <View style={{ flex: 1 }}>
      {nameText}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <View>
          <Text style={{ fontSize: 25 }}>{props.rolledEquation}</Text>
          <Text selectable={true} style={{ fontSize: 25 }}>
            {equation}
          </Text>
        </View>
        <Text style={{ fontSize: 25 }}>=</Text>
        <View>
          <Text style={{ fontSize: 25 }}>{result}</Text>
        </View>
      </View>
      <RangeGraph result={result} min={props.min} max={props.max} />
    </View>
  );
}
