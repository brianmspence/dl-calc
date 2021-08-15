import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import { persistStore, persistReducer,FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootReducer from './rootReducer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['calculator']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
  //Uncomment the below to log the redux state changes
  // .concat(logger)
});
export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;

export default { store, persistor }
