import { useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks';
import { fetchUsers, getUsersStatus } from '@/redux/usersReducer';
import UsersList from '@/components/UsersList';
import UserForm from '@/components/UserForm';
import '@/styles/components/App.scss';

function App() {
    const dispatch = useAppDispatch();
    const [status] = useAppSelector(getUsersStatus);

    useEffect(() => {
        if (status === 'idle') dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <div className="App">
            <Link to="/">
                <h1>Dashboard</h1>
            </Link>

            <Routes>
                <Route path="/" element={<UsersList />} />
                <Route path="user" element={<UserForm />} />
                <Route path="user/:userId" element={<UserForm />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App
