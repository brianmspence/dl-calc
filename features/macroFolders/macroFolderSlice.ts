import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import { addMacro, deleteMacro } from '../macros/macroSlice'
import { deleteFolder, initialState, localSelectors, MacroFolder, macroFoldersAdapter } from './folderSetup'

const macroFolderSlice = createSlice({
  name: "MacroFolders",
  initialState,
  reducers: {
    addFolder: {
      reducer: macroFoldersAdapter.addOne,
      prepare: (folder: MacroFolder) => ({
        payload: { ...folder, id: uuidv4() },
      }),
    },
    editFolder: macroFoldersAdapter.updateOne,
    // deleteFolder: {
    //   reducer: macroFoldersAdapter.removeOne,
    //   prepare: (folder: MacroFolder) => ({
    //     payload: folder.id,
    //     meta: { macroIds: folder.macroIds },
    //   }),
    // },
    addMacroToFolder: (
      state,
      action: PayloadAction<{ id: string; macroId: string }>
    ) => {
      const folder = localSelectors.selectById(state, action.payload.id);
      folder?.macroIds.push(action.payload.macroId);
    },
    removeMacroFromFolder: (
      state,
      action: PayloadAction<{ id: string; macroId: string }>
    ) => {
      const folder = localSelectors.selectById(state, action.payload.id);
      const index = folder?.macroIds.indexOf(action.payload.macroId);
      //Remove id at index from array
      folder && index && folder.macroIds.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteFolder, macroFoldersAdapter.removeOne)
      .addCase(addMacro, (state, action) => {
        const folder = localSelectors.selectById(state, action.meta.folderId);
        folder?.macroIds.push(action.payload.id);
      })
      .addCase(deleteMacro, (state, action) => {
        const folder = localSelectors.selectById(state, action.meta.folderId);
        const index = folder?.macroIds.indexOf(action.payload);
        //Remove id at index from array
        folder && index && folder.macroIds.splice(index, 1);
      });
  },
});

export const {
  addFolder,
  editFolder,
  addMacroToFolder,
  removeMacroFromFolder,
} = macroFolderSlice.actions;

export default macroFolderSlice.reducer;
