import { useEffect, useState } from 'react';
import { Card, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { capitalize, generateUsername } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { addUser, getUser, updateUser } from '@/reducers/usersReducer';
import '@/styles/components/UserForm.scss';

export default function UserForm() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { userId: uidParam } = useParams();
    const editMode = !!uidParam;
    const userId = editMode && !isNaN(Number(uidParam)) ? +uidParam : -1;

    const editingUser = useAppSelector(state => getUser(state, userId));
    const [name, setName] = useState(editingUser?.name || '');
    const [email, setEmail] = useState(editingUser?.email || '');
    const [error, setError] = useState('');

    useEffect(() => {
        setName(editingUser?.name ? editingUser.name : '');
        setEmail(editingUser?.email ? editingUser.email : '');
    }, [editingUser]);
    
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError('');

        const action = editingUser 
            ? updateUser({ ...editingUser, name, email })
            : addUser({ name, email, username: generateUsername(name) })

        dispatch(action)
            .unwrap()
            .then(() => navigate('/'))
            .catch(error => setError(error.message));
    }

    return (
        <Card className="user-form">
            <Card.Header className="header">
                <span className="header-title">
                    {editMode ? 'Edit User' : 'Add New User'}
                </span>
            </Card.Header>

            <Card.Body className='card-body'>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <FormGroup type="text" field="name" value={name} onChange={setName} required disabled={editMode && !editingUser} />
                        </Col>
                        <Col md={6}>
                            <FormGroup type="email" field="email" value={email} onChange={setEmail} required disabled={editMode && !editingUser} />
                        </Col>
                    </Row>
                    <div className='buttons'>
                        <Button className='cancel-button' variant="outline-danger" onClick={() => navigate('/')}>Cancel</Button>
                        <Button className='submit-button' variant="primary" type="submit">Submit</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}

type FormGroupProps = {
    field: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    disabled?: boolean;
};

function FormGroup({ field, type, value, required, disabled, onChange }: FormGroupProps) {
    const fieldLabel = capitalize(field);
    return (
        <Form.Group className="mb-4" controlId={field}>
            <Form.Label>
                {fieldLabel}{required && '*'}
            </Form.Label>
            <Form.Control 
                type={type}
                value={value} 
                placeholder={`Enter ${fieldLabel}`} 
                required={required}
                disabled={disabled}
                onChange={(event) => onChange(event.target.value)}
            />
        </Form.Group>
    );
}