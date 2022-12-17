import { Card, Button } from 'react-bootstrap';
import { getUsers, getUsersStatus } from '@/reducers/usersReducer';
import { useAppSelector } from '@/hooks/redux';
import UsersTable from '@/components/UsersTable';
import ErrorMessage from '@/components/ErrorMessage';
import { useNavigate } from 'react-router-dom';

import '@/styles/components/UsersList.scss';

export default function UsersList() {
    const users = useAppSelector(getUsers);
    const [status, error] = useAppSelector(getUsersStatus);
    const navigate = useNavigate();

    return (
        <Card className="users-list">
            <Card.Header className="header">
                <span className="header-title">Users List</span>
                <Button onClick={() => navigate('/user')}>Add new user</Button>
            </Card.Header>
            <Card.Body>
                {status === 'failed' ? (
                    <ErrorMessage message={error}/>
                ) : (<UsersTable
                    isLoading={status === 'idle' || status === 'loading'}
                    users={users}
                    onEdit={() => { }}
                    onDelete={() => { }}
                />)}
            </Card.Body>
        </Card>
    );
}