import { configureStore } from '@reduxjs/toolkit';
import users from './reducers/usersReducer';
import { createLogger } from 'redux-logger';

const logger = createLogger();

const store = configureStore({
    reducer: { users },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;