import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import { SavedResult } from '../../types'

type CalculatorState = {
  results: SavedResult[];
};

let initialState: CalculatorState = {
  results: [],
};

const calculatorSlice = createSlice({
  name: "Calculator",
  initialState,
  reducers: {
    addResult(state, action: PayloadAction<SavedResult>) {
      //Use the prepareAction thing to generate id?
      state.results.push({ ...action.payload, id: uuidv4() });
      if (state.results.length > 20) {
        state.results.shift();
      }
    },
  },
});

export const { addResult } = calculatorSlice.actions;

export default calculatorSlice.reducer;
