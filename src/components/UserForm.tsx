import { useEffect, useState } from 'react';
import { Card, Button, Form, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks';
import { addUser, getUser, updateUser } from '@/redux/usersReducer';
import FormInput from '@/components/FormInput';
import { generateUsername } from '@/utils';
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
    const [buttonsDisabled, setButtonsDisabled] = useState(true);
    const [waitingForResponse, setWaitingForResponse] = useState(false);
    
    useEffect(() => {
        if (!editMode || (editMode && editingUser)) setButtonsDisabled(false);

        setName(editingUser?.name ? editingUser.name : '');
        setEmail(editingUser?.email ? editingUser.email : '');
    }, [editingUser]);
    
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setButtonsDisabled(true);
        setWaitingForResponse(true);
        setError('');

        const action = editingUser
            ? updateUser({ ...editingUser, name: name.trim(), email: email.trim() })
            : addUser({ name: name.trim(), email: email.trim(), username: generateUsername(name) });

        dispatch(action)
            .unwrap()
            .then(() => navigate('/'))
            .catch(error => setError(error.message))
            .finally(() => {
                setButtonsDisabled(false);
                setWaitingForResponse(false);
            });
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
                            <FormInput type="text" field="name" value={name} onChange={setName} required disabled={editMode && !editingUser}/>
                        </Col>
                        <Col md={6}>
                            <FormInput type="email" field="email" value={email} onChange={setEmail} required disabled={editMode && !editingUser}/>
                        </Col>
                    </Row>
                    <div className='buttons'>
                        <Button className='cancel-button' variant="outline-danger" onClick={() => navigate('/')} disabled={buttonsDisabled}>
                            Cancel
                        </Button>

                        <Button className='submit-button' variant="primary" type="submit" disabled={buttonsDisabled}>
                            {waitingForResponse && <Spinner className="button-spinner" size="sm" role="status" aria-hidden="true"/>}
                            Submit
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}