import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import { RootState } from '../../redux/rootReducer'
import { SavedResult } from '../../types'
import { deleteFolder } from '../macroFolders/folderSetup'

export interface Macro {
  id?: string;
  name: string;
  equation: string;
  results: SavedResult[];
}

const SAMPLE_DATA: Macro[] = [
  {
    id: "1",
    name: "Strength",
    equation: "1d20 + 1",
    results: [],
  },
  {
    id: "2",
    name: "Dexterity",
    equation: "1d20 + 2",
    results: [],
  },
  {
    id: "3",
    name: "Constitution",
    equation: "1d20 + 3",
    results: [],
  },
  {
    id: "4",
    name: "Wisdom",
    equation: "1d20 + 4",
    results: [],
  },
  {
    id: "5",
    name: "Intelligence",
    equation: "1d20 + 5",
    results: [],
  },
  {
    id: "6",
    name: "Charisma",
    equation: "1d20 + 6",
    results: [],
  },
];

export const macrosAdapter = createEntityAdapter<Macro>();

const localSelectors = macrosAdapter.getSelectors();

export const macroSelectors = macrosAdapter.getSelectors<RootState>(
  (state) => state.macros
);

//Add SampleData to initialState
const initialState = macrosAdapter.addMany(
  macrosAdapter.getInitialState(),
  SAMPLE_DATA
);

const macroSlice = createSlice({
  name: "Macro",
  initialState,
  reducers: {
    addMacro: {
      reducer: macrosAdapter.addOne,
      prepare: (macro: Macro, folderId: string) => ({
        payload: { ...macro, id: uuidv4() },
        meta: { folderId },
      }),
    },
    editMacro: macrosAdapter.updateOne,
    deleteMacro: {
      reducer: macrosAdapter.removeOne,
      prepare: (macroId: string, folderId: string) => ({
        payload: macroId,
        meta: {
          folderId,
        },
      }),
    },
    addMacroResult(
      state,
      action: PayloadAction<{ id: string; result: SavedResult }>
    ) {
      const { id, result } = action.payload;
      const macro = localSelectors.selectById(state, id);
      if (macro) {
        macro.results.push({ ...result, id: uuidv4() });
        if (macro.results.length > 10) {
          macro.results.shift();
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteFolder, (state, action) => {
      macrosAdapter.removeMany(state, action.meta.macroIds);
    });
  },
});

export const {
  addMacro,
  editMacro,
  deleteMacro,
  addMacroResult,
} = macroSlice.actions;

export default macroSlice.reducer;
