import React, { useMemo, useState } from 'react';

import MaterialReactTable, { type MRT_ColumnDef } from 'material-react-table';
import { Delete, Edit } from '@mui/icons-material';
import { Orders, tableProps } from './types';
import { Box, IconButton, Tooltip } from '@mui/material';
import EditOrder from '../../views/Orders/EditOrder';
import { DraggableDialog } from '../ConfirmationPopupOrder';
import ConfirmationLoader from '../ConfirmationLoader';

const Table = (data: any) => {
    const [openGroup, setOpenGroup] = useState(false);
    const [editData, setEditData] = useState<Orders>();
    const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [deleteOrderId, setDeleteOrderId] = useState<number>(0);

    const handleDeleteRow = async (row: any) => {
        const { original } = row;
        setDeleteOrderId(original.orderId)
        setIsOpenConfirm(true);
        console.log('original.orderId ', original.orderId);
    };

    const handleOpenOrder = () => setOpenGroup(true);

    const handleCloseOrder = () => setOpenGroup(false);

    const handleCloseConfirm = () => setIsOpenConfirm(false);

    const handleStartLoading = () => setIsLoading(true);
    const handleFinishLoading = () => setIsLoading(false);

    const columns = useMemo<MRT_ColumnDef<Orders>[]>(
        () => [
            {
                accessorKey: 'orderId',
                header: 'Номер',
                size: 10,
                flex: 1,
                // default
                filterVariant: 'text',
            },
            {
                accessorKey: 'busStopName',
                header: 'Остановка',
                filterVariant: 'text',
                flex: 1,
                size: 30,
            },
            {
                accessorKey: 'departureTime',
                header: 'Время отправления',
                size: 10,
                filterVariant: 'text',
                flex: 1,
            },
            {
                accessorKey: 'date',
                header: 'Дата',
                size: 100,
                filterVariant: 'text',
                flex: 1,
            },
            {
                accessorKey: 'phone',
                header: 'Телефон',
                size: 100,
                filterVariant: 'text',
                flex: 1,
            },
            {
                accessorKey: 'routeName',
                header: 'Маршрут',
                size: 100,
                filterVariant: 'text',
                flex: 1,
            },
            {
                accessorKey: 'seatsCount',
                header: 'Кол-во мест',
                size: 100,
                filterVariant: 'text',
                flex: 1,
            },
        ],
        []
    );

    return (
        <>
            <div className="mui-table">
                <EditOrder
                    open={openGroup}
                    editData={editData}
                    close={handleCloseOrder}
                />
                <MaterialReactTable
                    {...tableProps}
                    columns={columns}
                    data={data.data || []}
                    initialState={{ showColumnFilters: true }}
                    editingMode="modal"
                    displayColumnDefOptions={{
                        'mrt-row-actions': {
                            size: 50,
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
            </div>
            <ConfirmationLoader openLoader={isLoading} />
            <DraggableDialog
                openConfirm={isOpenConfirm}
                closeConfirm={handleCloseConfirm}
                startLoader={handleStartLoading}
                finishLoader={handleFinishLoading}
                deleteOrderId={deleteOrderId}
            />
        </>
    );
};

export default Table;
