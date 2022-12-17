import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User, FetchStatus, isUser, assertUser } from '@/types';
import api from '@/api/usersApi';
import { RootState } from '@/store';

type UsersState = {
    data: User[];
    status: FetchStatus;
    error?: string;
};

const initialState: UsersState = {
    data: [],
    status: 'idle',
};

const slice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
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
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const userIndex = state.data.findIndex(user => user.id === action.payload.id);
                if (userIndex !== -1) state.data[userIndex] = action.payload;
            });
        }
});

export const actions = slice.actions;

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    return await api.getUsers();
});

export const addUser = createAsyncThunk('users/addUser', async (user: Omit<User, 'id'>) => {
    assertUser({ ...user, id: 0 });
    return await api.postUser(user);
});

export const updateUser = createAsyncThunk('users/editUser', async (user: User) => {
    assertUser(user);
    return await api.patchUser(user);
});

export const getUser = (state: RootState, userId: number) => state.users.data.find(user => user.id === userId);
export const getUsers = (state: RootState) => state.users.data;
export const getUsersStatus = (state: RootState): [FetchStatus, string?] => [state.users.status, state.users.error];

export default slice.reducer;