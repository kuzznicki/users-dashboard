import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchUsers, getUsersStatus } from './reducers/usersReducer';
import { UsersList } from './components/UsersList';

function App() {
    const dispatch = useAppDispatch();
    const [status] = useAppSelector(getUsersStatus);

    useEffect(() => {
        if (status === 'idle') dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <div className="App">
            <h1 style={{ marginBottom: '3rem' }}>Dashboard</h1>
            <UsersList/>
        </div>
    );
}

export default App
