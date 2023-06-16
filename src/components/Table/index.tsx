import React, { useMemo, useState, useContext } from 'react';
import { UserContext } from '../../services/context/contextProvider';
import { deleteOrder } from '../../services/api/api';
import { Table, Button } from 'rsuite';
import './index.scss';




import MaterialReactTable, { type MRT_ColumnDef } from 'material-react-table';
import { Delete, Edit } from '@mui/icons-material';
import { Orders, tableProps } from './types';
import { Box, IconButton, Tooltip } from '@mui/material';
import EditOrder from '../../views/Orders/EditOrder';
import { DraggableDialog } from '../ConfirmationPopupOrder';
import ConfirmationLoader from '../ConfirmationLoader';





const { Column, HeaderCell, Cell } = Table;




interface IActionCell {
    dataKey: string;
    onClick: (id: number) => void;
}


//@ts-ignore
const DeleteCell = ({ rowData, dataKey, onClick, ...props }: IActionCell) => {

    return (
        <Cell {...props} style={{ padding: '6px' }}>
            <Button
                appearance="link"
                onClick={() => {
                    onClick(rowData.orderId);
                }}
            >
                Удалить
            </Button>
        </Cell>
    );
};


const OrderTable = (data: any) => {
    const [openGroup, setOpenGroup] = useState(false);
    const [editData, setEditData] = useState<Orders>();
    const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [deleteOrderId, setDeleteOrderId] = useState<number>(0);

    const [tableData, setTableData] = useState(data.data)

    const { user } = useContext(UserContext);
    const { token } = user;

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

    //@ts-ignore
    const handleDeleteState = async (id) => {
        try {
            console.log(id)
            const nextData = Object.assign([], data.data);
            const activeItem = nextData.find((item: any) => item.orderId === id);
            setTableData(nextData);
            await deleteOrder(activeItem.orderId, token);
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <>
            <div className="mui-table">
                <EditOrder
                    open={openGroup}
                    editData={editData}
                    close={handleCloseOrder}
                />


                <Table
                    autoHeight={true}
                    className='table__orders'
                    width={1600}
                    data={data.data || tableData || []}
                >

                    <Column width={100} align="center" fixed>
                        <HeaderCell>Номер</HeaderCell>
                        <Cell dataKey="orderId" />
                    </Column>

                    <Column width={200} align="center" fixed>
                        <HeaderCell>Остановка</HeaderCell>
                        <Cell dataKey="busStopName" />
                    </Column>

                    <Column width={200} align="center" fixed>
                        <HeaderCell>Время отправления</HeaderCell>
                        <Cell dataKey="departureTime" />
                    </Column>

                    <Column width={200} align="center" fixed>
                        <HeaderCell>Дата</HeaderCell>
                        <Cell dataKey="date" />
                    </Column>

                    <Column width={200} align="center" fixed>
                        <HeaderCell>Телефон</HeaderCell>
                        <Cell dataKey="phone" />
                    </Column>

                    <Column width={200} align="center" fixed>
                        <HeaderCell>Маршрут</HeaderCell>
                        <Cell dataKey="routeName" />
                    </Column>
                    
                    <Column width={200} align="center" fixed>
                        <HeaderCell>Кол-во мест</HeaderCell>
                        <Cell dataKey="seatsCount" />
                    </Column>

                    <Column width={200} align="center" fixed>
                        <HeaderCell>...</HeaderCell>
                        <DeleteCell dataKey="orderId" onClick={handleDeleteState} />
                    </Column>

                </Table>



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

export default OrderTable;
