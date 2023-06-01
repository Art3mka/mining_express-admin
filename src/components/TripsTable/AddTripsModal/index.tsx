import { useState } from 'react';
import { Button, ButtonToolbar, Modal, Placeholder } from 'rsuite';
import AddTripsForm from './AddTripsForm';

interface AddTripsModalProps {}

const AddTripsModal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <ButtonToolbar>
                <Button onClick={handleOpen} appearance="primary" active>
                    {' '}
                    Добавить рейс
                </Button>
            </ButtonToolbar>

            <Modal open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Добавить рейс</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <AddTripsForm close={handleClose}/>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddTripsModal;
