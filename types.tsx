import { ResultDetails } from './components/ResultDetails'

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Calculator: undefined;
  Macros: { screen?: keyof MarcoTabParamList };
};

export type CalculatorParamList = {
  CalculatorScreen: undefined;
  DetailsScreen: ResultDetails;
};

export type MarcoTabParamList = {
  MacroScreen: { folderId: string };
  DetailsScreen: ResultDetails;
  AddMacroScreen: { folderId: string };
  EditMacroScreen: { macroId: string; folderId: string };
  MacroResultLogsScreen: { macroId: string; name: string };
  FoldersScreen: undefined;
  AddFolderScreen: undefined;
  EditFolderScreen: { folderId: string };
};

//Scope could become its own slice to allow for moving/copying of scope entries
export interface Scope {
  [key: string]: number;
}

//TODO integrate error into results and logs. But only for Macros?
interface ResultError {
  id: string;
  equation: string;
  error: string;
}

//TODO have dl-eval export this?
export interface Result {
  dice: number[];
  max: number;
  min: number;
  result: number;
  rolledEquation: string;
}

export interface SavedResult extends Result {
  id?: string;
  equation: string;
  scope?: Scope;

  //result : Result
  //error: string
}
