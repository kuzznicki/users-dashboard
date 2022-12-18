import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import users from './usersReducer';

const logger = createLogger();

const store = configureStore({
    reducer: { users },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;