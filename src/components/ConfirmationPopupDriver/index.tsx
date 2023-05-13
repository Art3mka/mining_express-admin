import * as React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper,
    PaperProps,
} from '@mui/material';
import { deleteDriver, deleteOrder as deleteOneOrder } from '../../services/api/api';

import Draggable from 'react-draggable';
import { UserContext } from '../../services/context/contextProvider';
import { useContext } from 'react';

const PaperComponent = (props: PaperProps) => {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
};

interface IDraggable {
    openConfirm: boolean;
    closeConfirm: () => void;
    deleteDriverId: number;
    startLoader: () => void;
    finishLoader: () => void;
}

export const DraggableDialog = ({
    openConfirm,
    closeConfirm,
    deleteDriverId,
    finishLoader,
    startLoader,
}: IDraggable) => {
    const handleClose = () => {
        closeConfirm();
    };

    const { user } = useContext(UserContext);
    const { token } = user;

    const handleDeleteOrder = async () => {
        try {
            startLoader();
            await deleteDriver(deleteDriverId, token.accessToken);
            finishLoader();
        } catch (error) {
            finishLoader();
            console.error(error);
        }
    };

    return (
        <div>
            <Dialog
                open={openConfirm}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle
                    style={{ cursor: 'move' }}
                    id="draggable-dialog-title"
                >
                    Удалить
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Вы точно хотите удалить этот заказ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Отменить
                    </Button>
                    <Button
                        onClick={() => {
                            handleDeleteOrder()
                            closeConfirm()
                        }}
                    >
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
