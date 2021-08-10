import { StackScreenProps } from '@react-navigation/stack'
import * as React from 'react'

import AddEditFolder from '../features/macroFolders/AddEditFolder'
import { MarcoTabParamList } from '../types'

export default function AddFolderScreen(
  props: StackScreenProps<MarcoTabParamList, "AddFolderScreen">
) {
  return <AddEditFolder />;
}
