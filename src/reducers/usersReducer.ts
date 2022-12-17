import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '@/types';
import api from '@/api/usersApi';
import { RootState } from '@/store';

type FetchStatus = 'idle' | 'loading' | 'complete' | 'failed';

type UsersState = {
    data: User[];
    sortBy: 'id' | 'name';
    status: FetchStatus;
    error?: string;
};

const initialState: UsersState = {
    data: [],
    status: 'idle',
    sortBy: 'id'
};

const slice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        userAdded: (state, action: PayloadAction<User>) => {
            state.data.push(action.payload);
        },
        userModified: (state, action: PayloadAction<User>) => {
            const userIndex = state.data.findIndex(user => user.id === action.payload.id);
            if (userIndex !== -1) state.data[userIndex] = action.payload;
        },
        userRemoved: (state, action: PayloadAction<number>) => {
            state.data = state.data.filter(user => user.id !== action.payload);
        },
        usersSet: (state, action: PayloadAction<User[]>) => {
            state.data = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'complete';
                state.data = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
        }
});

export default slice.reducer;

export const actions = slice.actions;
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    return await api.getUsers();
});

export const getUsers = (state: RootState) => state.users.data;
export const getUsersStatus = (state: RootState): [FetchStatus, string?] => [state.users.status, state.users.error];
