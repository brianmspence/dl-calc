import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'

import { ResultDetails } from '../components/ResultDetails'
import { CalculatorParamList } from '../types'

export default function DetailsScreen(
  props: StackScreenProps<CalculatorParamList, "DetailsScreen">
) {
  return <ResultDetails {...props.route.params} />;
}
