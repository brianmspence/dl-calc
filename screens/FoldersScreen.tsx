import { StackScreenProps } from '@react-navigation/stack'
import * as React from 'react'

import Folders from '../features/macroFolders/Folders'
import { MarcoTabParamList } from '../types'

export default function FoldersScreen(
  props: StackScreenProps<MarcoTabParamList, "FoldersScreen">
) {
  const navigators = {
    openFolder: (folderId: string, folderName: string) => {
      props.navigation.navigate("MacroScreen", { folderId, folderName });
    },
    openAddFolder: () => props.navigation.navigate("AddFolderScreen"),
    openEditFolder: (folderId: string) =>
      props.navigation.navigate("EditFolderScreen", { folderId }),
  };
  return <Folders {...navigators} />;
}
