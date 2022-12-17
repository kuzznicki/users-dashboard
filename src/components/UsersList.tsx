import { Card, Button } from 'react-bootstrap';
import { getUsers, getUsersStatus } from '@/reducers/usersReducer';
import { UsersTable } from '@/components/UsersTable';
import { useAppSelector } from '@/hooks/redux';
import '@/styles/components/UsersList.scss';
import ErrorMessage from './ErrorMessage';

export function UsersList() {
    const users = useAppSelector(getUsers);
    const [status, error] = useAppSelector(getUsersStatus);

    return (
        <Card className="users-list">
            <Card.Header className="header">
                <span className="header-title">Users List</span>
                <Button onClick={() => { }}>Add new user</Button>
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