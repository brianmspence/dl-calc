import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import * as React from 'react'
import { useDispatch } from 'react-redux'

import Calculator from '../features/calculator/Calculator'
import { BottomTabParamList, CalculatorParamList } from '../types'

type CalcRouteProp = RouteProp<CalculatorParamList, "CalculatorScreen">;
type CalcNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<CalculatorParamList, "CalculatorScreen">,
  BottomTabNavigationProp<BottomTabParamList>
>;

type CalculatorScreenProps = {
  route: CalcRouteProp;
  navigation: CalcNavigationProp;
};

export default function CalculatorScreen(props: CalculatorScreenProps) {
  const dispatch = useDispatch();
  const showResult = (result: any) => {
    props.navigation.navigate("DetailsScreen", result);
  };
  const saveMacro = (equation: string) => {
    //TODO need to determine which folder to add
    //Todo sort of werid to dispatch here
    //Better to navigate to AddMacro and set up some params and props for initial equation
    //dispatch(addMacro({ name: equation, equation, results: [] }));
    // props.navigation.navigate("Macros", { screen: "MacroScreen" });
  };
  return <Calculator showResult={showResult} onSave={saveMacro} />;
}
