import * as React from 'react';

import { createPortal } from 'react-dom';
import { CircularProgress, Backdrop } from '@mui/material';
import './index.scss';

interface IConfirmationLoader {
    openLoader: boolean;
}

const ConfirmationLoader = ({ openLoader }: IConfirmationLoader) => {
    return (
        <>
            <div className="confirmationLoader">
                <Backdrop
                    sx={{
                        color: '#fff',
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={openLoader}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </>
    );
};

export default ConfirmationLoader;
