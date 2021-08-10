import React from 'react'
import { useSelector } from 'react-redux'

import ResultLog from '../../components/ResultLog'
import { Text } from '../../components/Themed'
import { RootState } from '../../redux/rootReducer'
import { SavedResult } from '../../types'
import { macroSelectors } from './macroSlice'

interface MacroResultsProps {
  macroId: string;
  showDetails: (result: SavedResult) => void;
}

const MacroResults = (props: MacroResultsProps) => {
  const macro = useSelector((state: RootState) =>
    macroSelectors.selectById(state, props.macroId)
  );

  if (macro === undefined) {
    return <Text>Macro not found!</Text>;
  }

  return (
    <ResultLog
      resultHistory={macro.results}
      onDetails={props.showDetails}
      lockSwipe={true}
    />
  );
};

export default MacroResults;
