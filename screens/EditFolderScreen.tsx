import { StackScreenProps } from '@react-navigation/stack'
import * as React from 'react'

import AddEditFolder from '../features/macroFolders/AddEditFolder'
import { MarcoTabParamList } from '../types'

export default function EditFolderScreen(
  props: StackScreenProps<MarcoTabParamList, "EditFolderScreen">
) {
  return <AddEditFolder folderId={props.route.params.folderId} />;
}
