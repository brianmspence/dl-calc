import { StackScreenProps } from '@react-navigation/stack'
import * as React from 'react'

import AddEditMacro from '../features/macros/AddEditMacro'
import { MarcoTabParamList } from '../types'

export default function EditMacroScreen(
  props: StackScreenProps<MarcoTabParamList, "EditMacroScreen">
) {
  return (
    <AddEditMacro
      macroId={props.route.params.macroId}
      folderId={props.route.params.folderId}
    />
  );
}
