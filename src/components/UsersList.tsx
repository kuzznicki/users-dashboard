import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { deleteUser, getUsers, getUsersStatus } from '@/reducers/usersReducer';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import UsersTable from '@/components/UsersTable';
import ErrorMessage from '@/components/ErrorMessage';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import { User } from '@/types';
import '@/styles/components/UsersList.scss';

export default function UsersList() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const users = useAppSelector(getUsers);
    const [status, error] = useAppSelector(getUsersStatus);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    return (
        <>
            <Card className="users-list">
                <Card.Header className="header">
                    <span className="header-title">Users List</span>
                    <Button onClick={() => navigate('/user')}>Add new user</Button>
                </Card.Header>
                <Card.Body>
                    {status === 'failed' ? (
                        <ErrorMessage message={error} />
                    ) : (
                        <UsersTable
                            isLoading={status === 'idle' || status === 'loading'}
                            users={users}
                            onEdit={user => navigate('/user/' + user.id)}
                            onDelete={user => setUserToDelete(user)}
                        />
                    )}
                </Card.Body>
            </Card>
            <DeleteConfirmation 
                show={!!userToDelete}
                title="Delete User"
                message={`Are you sure you want to delete following user - ${userToDelete?.name}?`}
                onClose={() => setUserToDelete(null)} 
                onConfirm={() => {
                    if (!userToDelete) return;
                    dispatch(deleteUser(userToDelete.id));
                    setUserToDelete(null);
                }}
            />
        </>
    );
}