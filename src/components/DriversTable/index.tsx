import React, { useMemo, useState } from 'react';
import MaterialReactTable, {
    MRT_ColumnDef as mrtColumnDef,
} from 'material-react-table';
import { Drivers, tableProps } from './types';
import './index.scss';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import ConfirmationLoader from '../ConfirmationLoader';
import { DraggableDialog } from '../ConfirmationPopupDriver';
import EditDriver from '../../views/Drivers/EditDriver';

const DriversTable = (data: any, close: () => void) => {
    const [openGroup, setOpenGroup] = useState(false);
    const [editData, setEditData] = useState<Drivers>();
    const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [deleteDriverId, setDeleteDriverId] = useState<number>(0);

    const columns = useMemo<mrtColumnDef<Drivers>[]>(
        () => [
            {
                accessorKey: 'userId',
                header: 'Номер',
                size: 50,
                filterVariant: 'text', 
            },
            {
                accessorKey: 'login',
                header: 'Login',
                filterVariant: 'text',
                size: 200,
            },
            {
                accessorKey: 'phone',
                header: 'Телефон',
                size: 300,
                filterVariant: 'text',
            },
            {
                accessorKey: 'password',
                header: 'Password',
                size: 200,
                filterVariant: 'text',
            },
        ],
        []
    );

    const handleDeleteRow = async (row: any) => {
        const { original } = row;
        setDeleteDriverId(original.userId);
        setIsOpenConfirm(true);
        console.log('original.orderId ', original.userId);
    };

    const handleOpenOrder = () => setOpenGroup(true);

    const handleCloseOrder = () => setOpenGroup(false);

    const handleCloseConfirm = () => setIsOpenConfirm(false);

    const handleStartLoading = () => setIsLoading(true);
    const handleFinishLoading = () => setIsLoading(false);

    return (
        <>
            <EditDriver
                open={openGroup}
                editData={editData}
                close={handleCloseOrder}
                closeEdit={close}
            />
            <MaterialReactTable
                {...tableProps}
                columns={columns}
                data={data.data || []}
                initialState={{ showColumnFilters: true }}
                editingMode="row"
                displayColumnDefOptions={{
                    'mrt-row-actions': {
                        size: 100,
                        muiTableHeadCellProps: {
                            align: 'center',
                        },
                        header: '',
                    },
                }}
                renderRowActions={({ row, table }) => (
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                        <Tooltip arrow placement="left" title="Edit">
                            <IconButton
                                onClick={() => {
                                    setEditData(row.original);
                                    handleOpenOrder();
                                }}
                            >
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow placement="right" title="Delete">
                            <IconButton
                                color="error"
                                onClick={() => {
                                    handleDeleteRow(row);
                                }}
                            >
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
            />
            <ConfirmationLoader openLoader={isLoading} />
            <DraggableDialog
                openConfirm={isOpenConfirm}
                closeConfirm={handleCloseConfirm}
                startLoader={handleStartLoading}
                finishLoader={handleFinishLoading}
                deleteDriverId={deleteDriverId}
            />
        </>
    );
};

export default DriversTable;
