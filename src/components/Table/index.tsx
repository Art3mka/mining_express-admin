import React, { useCallback, useContext, useMemo, useState } from 'react';

import MaterialReactTable, {
    type MaterialReactTableProps,
    type MRT_Cell,
    type MRT_ColumnDef,
    type MRT_Row,
} from 'material-react-table';
import { Delete, Edit } from '@mui/icons-material';
import { Orders, tableProps } from './types';
import { Box, IconButton, Tooltip } from '@mui/material';
import { updateOrder } from '../../services/api/api';
import { UserContext } from '../../services/context/contextProvider';
import EditOrder from '../../views/Orders/EditOrder';

const Table = (data: any) => {
    const [openGroup, setOpenGroup] = useState(false);
    const [editData, setEditData] = useState<Orders>();
    const handleOpenOrder = () => setOpenGroup(true);
    const handleCloseOrder = () => setOpenGroup(false);
    const { user } = useContext(UserContext);
    const { token } = user;
    const [tableData, setTableData] = useState<Orders[]>(() => data);
    // console.log('token', token);
    
    const sendEmail = (row: any) => {
        console.log('click', row.original);
    };

    const handleDeleteRow = useCallback(
        (row: MRT_Row<Orders>) => {
            // api delete request here, then refetch or update local table data for re-render
            tableData.splice(row.index, 1);
            setTableData([...tableData]);
        },
        [tableData]
    );

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

    const handleSaveRow: MaterialReactTableProps<Orders>['onEditingRowSave'] =
        async ({ values }) => {
            console.log('values :>> ', values);
            await updateOrder(values, token.accessToken)
        };

        

    return (
        <div className="mui-table">
            <EditOrder open={openGroup} editData={editData} close={handleCloseOrder}/>
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
                                    setEditData(row.original)
                                    handleOpenOrder()
                                }}
                            >
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow placement="right" title="Delete">
                            <IconButton
                                color="error"
                                onClick={() => handleDeleteRow(row)}
                            >
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
            />
        </div>
    );
};

export default Table;
