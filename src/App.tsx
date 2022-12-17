import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchUsers, getUsersStatus } from '@/reducers/usersReducer';
import UsersList from '@/components/UsersList';
import UserForm from '@/components/UserForm';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
    const dispatch = useAppDispatch();
    const [status] = useAppSelector(getUsersStatus);

    useEffect(() => {
        if (status === 'idle') dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <div className="App">
            <Link to="/">
                <h1 style={{ marginBottom: '3rem' }}>Dashboard</h1>
            </Link>

            <Routes>
                <Route path="/" element={<UsersList />} />
                <Route path="user" element={<UserForm />} />
                <Route path="user/:userId" element={<UserForm />} />
            </Routes>
        </div>
    );
}

export default App
