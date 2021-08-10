import { createAction, createEntityAdapter } from '@reduxjs/toolkit'

import { RootState } from '../../redux/rootReducer'
import { Scope } from '../../types'

export interface MacroFolder {
  id: string;
  name: string;
  scope: Scope;
  macroIds: string[];
}

const INITIAL_FOLDER_STATE: MacroFolder[] = [
  //   {
  //     id: "all-macros",
  //     name: "All Macros",
  //     scope: {},
  //     macroIds: ["1", "2", "3", "4", "5", "6"],
  //   },
  {
    id: "1",
    name: "Sample Macros",
    scope: {},
    macroIds: ["1", "2", "3", "4", "5", "6"],
  },
];
export const macroFoldersAdapter = createEntityAdapter<MacroFolder>();

export const localSelectors = macroFoldersAdapter.getSelectors();
export const globalSelectors = macroFoldersAdapter.getSelectors<RootState>(
  (state) => state.folders
);

export const initialState = macroFoldersAdapter.addMany(
  macroFoldersAdapter.getInitialState(),
  INITIAL_FOLDER_STATE
);

export const deleteFolder = createAction(
  "deleteFolder",
  (folder: MacroFolder) => ({
    payload: folder.id,
    meta: { macroIds: folder.macroIds },
  })
);
