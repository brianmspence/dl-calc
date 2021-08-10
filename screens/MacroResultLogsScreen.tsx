import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'

import MacroResults from '../features/macros/MacroResults'
import { MarcoTabParamList, SavedResult } from '../types'

export default function MacroResultLogsScreen(
  props: StackScreenProps<MarcoTabParamList, "MacroResultLogsScreen">
) {
  const navigators = {
    showDetails: (result: SavedResult) => {
      props.navigation.navigate("DetailsScreen", result);
    },
  };
  return <MacroResults {...navigators} macroId={props.route.params.macroId} />;
}
