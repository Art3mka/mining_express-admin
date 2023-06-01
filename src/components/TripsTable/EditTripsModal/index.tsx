import { useState } from 'react';
import { Button, ButtonToolbar, Modal, Placeholder } from 'rsuite';
import EditTripsForm from './EditTripsForm';

interface EditTripsMoadProps {
    data: any;
}

const EditTripsMoad = ({ data }: EditTripsMoadProps) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <ButtonToolbar>
                <Button onClick={handleOpen} appearance="link" active>
                    {' '}
                    Изменить
                </Button>
            </ButtonToolbar>

            <Modal open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Изменить рейс</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditTripsForm editData={data} close={handleClose}/>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default EditTripsMoad;
