import { Table, Button } from 'react-bootstrap';
import { InfoCircle } from 'react-bootstrap-icons';
import { User } from '@/types';
import '@/styles/components/UsersTable.scss';
import Loading from './Loading';

type Props = {
    users: User[];
    isLoading: boolean;
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}

export function UsersTable({ users, isLoading, onEdit, onDelete }: Props) {
    return (
        <div className="table-wrapper">
            <Table hover responsive>
                <thead>
                    <tr>
                        {['Id', 'Name', 'Username', 'Email', 'City', 'Edit', 'Delete'].map(header => {
                            return <th key={header}>{header}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {!isLoading && users.map(user => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user?.address?.city || '(empty)'}</td>
                                <td><Button variant="warning">Edit</Button></td>
                                <td><Button variant="danger">Delete</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

            {isLoading && <Loading />}
            {!isLoading && users.length === 0 && (
                <div className="no-data-message">
                    <InfoCircle />
                    <span>Nothing to display</span>
                </div>
            )}
        </div>

    );
}