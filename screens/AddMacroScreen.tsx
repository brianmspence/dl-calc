import { StackScreenProps } from '@react-navigation/stack'
import * as React from 'react'

import AddEditMacro from '../features/macros/AddEditMacro'
import { MarcoTabParamList } from '../types'

export default function AddMacroScreen(
  props: StackScreenProps<MarcoTabParamList, "AddMacroScreen">
) {
  return <AddEditMacro folderId={props.route.params.folderId} />;
}
