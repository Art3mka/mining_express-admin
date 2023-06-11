import { ReactNode, useState } from 'react';
import { Button, ButtonToolbar, Modal } from 'rsuite';

type Appearance = 'default' | 'primary' | 'link' | 'subtle' | 'ghost';

interface Props {
    children: ReactNode;
    headerTitle: string;
    buttonName: string;
    openModal?: boolean;
    appearance?: Appearance;
    handleClose?: () => void;
    handleOpen?: () => void;
}

const ModalComponent = ({
    children,
    headerTitle,
    buttonName,
    appearance,
    openModal,
    handleClose,
    handleOpen,
}: Props) => {
    return (
        <>
            <ButtonToolbar>
                <Button onClick={handleOpen} appearance={appearance} active>
                    {' '}
                    {buttonName}
                </Button>
            </ButtonToolbar>
            <Modal open={openModal} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>{headerTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
            </Modal>
        </>
    );
};

export default ModalComponent;
