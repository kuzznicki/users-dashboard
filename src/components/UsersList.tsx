import { Fragment, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { deleteUser, getUsers, getUsersStatus } from '@/redux/usersReducer';
import { useAppSelector, useAppDispatch } from '@/redux/reduxHooks';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import ErrorMessage from '@/components/ErrorMessage';
import UsersTable from '@/components/UsersTable';
import { User } from '@/types';
import '@/styles/components/UsersList.scss';

export default function UsersList() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const users = useAppSelector(getUsers);
    const [status, error] = useAppSelector(getUsersStatus);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    function handleDelete() {
        if (!userToDelete) return;
        dispatch(deleteUser(userToDelete.id));
        setUserToDelete(null);
    }
    
    return (
        <Fragment>
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
                message={`Are you sure you want to delete the following user:\n${userToDelete?.name}?`}
                onClose={() => setUserToDelete(null)} 
                onConfirm={handleDelete}
            />
        </Fragment>
    );
}