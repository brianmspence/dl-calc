import { combineReducers } from '@reduxjs/toolkit'

import calculatorReducer from '../features/calculator/calculatorSlice'
import foldersReducer from '../features/macroFolders/macroFolderSlice'
import macrosReducer from '../features/macros/macroSlice'

const rootReducer = combineReducers({
  calculator: calculatorReducer,
  macros: macrosReducer,
  folders: foldersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
