import { StackScreenProps } from '@react-navigation/stack'
import * as React from 'react'

import Macros from '../features/macros/Macros'
import { MarcoTabParamList } from '../types'

export default function MacroScreen(
  props: StackScreenProps<MarcoTabParamList, "MacroScreen">
) {
  const navigators = {
    showResult: (result: any) => {
      props.navigation.navigate("DetailsScreen", result);
    },
    openAddMacro: () => {
      props.navigation.navigate("AddMacroScreen", {
        folderId: props.route.params.folderId,
      });
    },
    openEditMacro: (macroId: string) => {
      props.navigation.navigate("EditMacroScreen", {
        macroId,
        folderId: props.route.params.folderId,
      });
    },
    openMacroLogs: (macroId: string, name: string) => {
      props.navigation.navigate("MacroResultLogsScreen", { macroId, name });
    },
    editFolder: (folderId: string) => {
      props.navigation.navigate("EditFolderScreen", { folderId });
    },
  };
  return <Macros {...navigators} folderId={props.route.params.folderId} />;
}
