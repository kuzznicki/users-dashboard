import { Modal, Button } from "react-bootstrap";

type Props = {
    title: string;
    message: string;
    show: boolean;
    onConfirm: () => void;
    onClose: () => void;
};

export default function DeleteConfirmation({ title, message, show, onConfirm, onClose }: Props) {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>{message}</Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="danger" onClick={onConfirm}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
}