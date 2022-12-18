import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { InfoCircle, CaretDown, CaretDownFill, CaretUpFill } from 'react-bootstrap-icons';
import { User, userRequiredProps, UserRequiredProp } from '@/types';
import Loading from '@/components/Loading';
import { capitalize } from '@/utils';
import '@/styles/components/UsersTable.scss';

type Props = {
    users: User[];
    isLoading: boolean;
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
};

export default function UsersTable({ users, isLoading, onEdit, onDelete }: Props) {
    const [sortBy, setSortBy] = useState<UserRequiredProp>('id');
    const [ascending, setAscending] = useState(true);
    const [sortedUsers, setSortedUsers] = useState<User[]>([]);
    const propsWithSort = userRequiredProps.map(e => e as string);

    useEffect(() => {
        const orderMultiplier = ascending ? 1 : -1;
        const cmp = sortBy === 'id'
            ? (a: User, b: User) => orderMultiplier * (a.id - b.id)
            : (a: User, b: User) => orderMultiplier * a[sortBy].localeCompare(b[sortBy]);
        setSortedUsers([...users].sort(cmp));
    }, [sortBy, ascending, users]);

    function handleSortChange(header: string) {
        if (!propsWithSort.includes(header)) return;
        setAscending(header === sortBy ? !ascending : true);
        setSortBy(header as UserRequiredProp);
    };

    function getTh(header: string) {
        let sortIcon = <CaretDown />;
        if (header === sortBy) sortIcon = ascending ? <CaretUpFill /> : <CaretDownFill />;

        const isSortable = propsWithSort.includes(header);

        return (
            <th key={header}>
                <button className="header-wrapper" disabled={!isSortable} onClick={() => handleSortChange(header)}>
                    <span>{capitalize(header)}</span>
                    {isSortable && sortIcon}
                </button>
            </th>
        );
    }

    return (
        <div className="table-wrapper">
            <Table hover responsive>
                <thead>
                    <tr>
                        {['id', 'name', 'username', 'email', 'city', 'edit', 'delete'].map(header => getTh(header))}
                    </tr>
                </thead>
                <tbody>
                    {!isLoading && sortedUsers.map(user => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user?.address?.city || '(empty)'}</td>
                                <td>
                                    <Button variant="warning" onClick={() => onEdit(user)}>Edit</Button>
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => onDelete(user)}>Delete</Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            {isLoading ? (
                <Loading message="Loading users..." />
            ) : (
                sortedUsers.length === 0 && (
                    <div className="no-data-message">
                        <InfoCircle />
                        <span>Nothing to display</span>
                    </div>
                )
            )}
        </div>
    );
}