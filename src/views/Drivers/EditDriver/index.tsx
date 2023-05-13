import React, { useRef } from 'react';
import ModalComponent from '../../../components/Modal';
import EditDriverForm from './EditDriverForm';

interface CreateOrderProps {
    open: boolean;
    close: () => void;
    editData?: any;
    closeEdit?: () => void
}

const EditDriver = ({ open, close, editData, closeEdit }: CreateOrderProps) => {
    const submitRef = useRef();
    return (
        <ModalComponent submitRef={submitRef} open={open} close={close}>
            <EditDriverForm
                submitRef={submitRef}
                close={close}
                editData={editData}
                closeEdit={closeEdit}
            />
        </ModalComponent>
    );
};

export default EditDriver;