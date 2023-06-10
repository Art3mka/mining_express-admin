import { useState } from 'react';
import { Button, ButtonToolbar, Modal, Placeholder } from 'rsuite';
import DeleteTripsForm from './DeleteTripsForm';

interface DeleteTripsMoadProps {
    data: any;
}

const DeleteTripsModal = ({ data }: DeleteTripsMoadProps) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <ButtonToolbar>
                <Button onClick={handleOpen} appearance="link" active>
                    {' '}
                    Удалить
                </Button>
            </ButtonToolbar>

            <Modal open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Удалить рейс</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DeleteTripsForm deleteData={data} close={handleClose}/>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default DeleteTripsModal;
