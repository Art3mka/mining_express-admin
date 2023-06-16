import React, { useMemo, useState, useContext } from 'react';
// import MaterialReactTable, {
//     MRT_ColumnDef as mrtColumnDef,
// } from 'material-react-table';
// import { Drivers, tableProps } from './types';
import './index.scss';
// import { Box, IconButton, Tooltip } from '@mui/material';
// import { Delete, Edit } from '@mui/icons-material';
// import ConfirmationLoader from '../ConfirmationLoader';
// import { DraggableDialog } from '../ConfirmationPopupDriver';
// import EditDriver from '../../views/Drivers/EditDriver';


import { UserContext } from '../../services/context/contextProvider';
import { updateDriver, deleteDriver } from '../../services/api/api';
import { Table, Button } from 'rsuite';






const { Column, HeaderCell, Cell } = Table;


interface IEditableCell {
    dataKey: string;
    onChange: (id: any, key: any, value: any) => void;
}

interface IActionCell {
    dataKey: string;
    onClick: (id: any) => void;
}

//@ts-ignore
const EditableCell = ({ rowData, dataKey, onChange, ...props }: IEditableCell) => {
    const editing = rowData.status === 'EDIT';
    return (
        <Cell {...props} className={editing ? 'table-content-editing' : ''}>
            {editing ? (
                <input
                    className="rs-input"
                    defaultValue={rowData[dataKey]}
                    onChange={event => {
                        onChange && onChange(rowData.userId, dataKey, event.target.value);
                    }}
                />
            ) : (
                <span className="table-content-edit-span">{rowData[dataKey]}</span>
            )}
        </Cell>
    );
}

//@ts-ignore
const ActionCell = ({ rowData, dataKey, onClick, ...props }: IActionCell) => {

    return (
        <Cell {...props} style={{ padding: '6px' }}>
            <Button
                appearance="link"
                onClick={() => {
                    onClick(rowData.userId);
                    console.log(rowData.status)
                }}
            >
                {rowData.status === 'EDIT' ? 'Сохранить' : 'Изменить'}
            </Button>
        </Cell>
    );
};

//@ts-ignore
const DeleteCell = ({ rowData, dataKey, onClick, ...props }: IActionCell) => {

    return (
        <Cell {...props} style={{ padding: '6px' }}>
            <Button
                appearance="link"
                onClick={() => {
                    onClick(rowData.userId);
                }}
            >
                Удалить
            </Button>
        </Cell>
    );
};



const DriversTable = (data: any, close: () => void) => {
    // const [openGroup, setOpenGroup] = useState(false);
    // const [editData, setEditData] = useState<Drivers>();
    // const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
    // const [isLoading, setIsLoading] = useState<boolean>(false);
    // const [deleteDriverId, setDeleteDriverId] = useState<number>(0);

    const [tableData, setTableData] = useState(data.data)

    const { user } = useContext(UserContext);
    const { token } = user;

    // const columns = useMemo<mrtColumnDef<Drivers>[]>(
    //     () => [
    //         {
    //             accessorKey: 'userId',
    //             header: 'Номер',
    //             size: 50,
    //             filterVariant: 'text',
    //         },
    //         {
    //             accessorKey: 'login',
    //             header: 'Login',
    //             filterVariant: 'text',
    //             size: 200,
    //         },
    //         {
    //             accessorKey: 'phone',
    //             header: 'Телефон',
    //             size: 300,
    //             filterVariant: 'text',
    //         },
    //         {
    //             accessorKey: 'password',
    //             header: 'Password',
    //             size: 200,
    //             filterVariant: 'text',
    //         },
    //     ],
    //     []
    // );

    // const handleDeleteRow = async (row: any) => {
    //     const { original } = row;
    //     setDeleteDriverId(original.userId);
    //     setIsOpenConfirm(true);
    //     console.log('original.orderId ', original.userId);
    // };

    // const handleOpenOrder = () => setOpenGroup(true);

    // const handleCloseOrder = () => setOpenGroup(false);

    // const handleCloseConfirm = () => setIsOpenConfirm(false);

    // const handleStartLoading = () => setIsLoading(true);
    // const handleFinishLoading = () => setIsLoading(false);







    //@ts-ignore
    const handleChange = (id, key, value) => {
        const nextData = Object.assign([], data.data);
        nextData.find((item: any) => item.userId === id)[key] = value;
        setTableData(nextData);
    };

    //@ts-ignore
    const handleEditState = async (id) => {
        try {
            const nextData = Object.assign([], data.data);
            const activeItem = nextData.find((item: any) => item.userId === id);
            activeItem.status = activeItem.status ? null : 'EDIT';
            const updateData = JSON.parse(JSON.stringify(activeItem))
            setTableData(nextData);
            delete updateData.status;
            await updateDriver(updateData, token);
        } catch (error) {
            console.log(error)
        }

    };

    //@ts-ignore
    const handleDeleteState = async (id) => {
        try {
            const nextData = Object.assign([], data.data);
            const activeItem = nextData.find((item: any) => item.userId === id);
            setTableData(nextData);
            await deleteDriver(activeItem.userId, token);
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <>
            {/* <EditDriver
                open={openGroup}
                editData={editData}
                close={handleCloseOrder}
                closeEdit={close}
            /> */}


            <Table
                autoHeight={true}
                className='table__drivers'
                width={1600}
                data={data.data || tableData || []}
            >

                <Column width={100} align="center" fixed>
                    <HeaderCell>Id</HeaderCell>
                    <EditableCell dataKey="userId" onChange={handleChange} />
                </Column>

                <Column width={200} align="center" fixed>
                    <HeaderCell>Логин</HeaderCell>
                    <EditableCell dataKey="login" onChange={handleChange} />
                </Column>

                <Column width={200} align="center" fixed>
                    <HeaderCell>Телефон</HeaderCell>
                    <EditableCell dataKey="phone" onChange={handleChange} />
                </Column>

                <Column width={200} align="center" fixed>
                    <HeaderCell>Пароль</HeaderCell>
                    <EditableCell dataKey="password" onChange={handleChange} />
                </Column>

                <Column width={200} align="center" fixed>
                    <HeaderCell>...</HeaderCell>
                    <ActionCell dataKey="userId" onClick={handleEditState} />
                </Column>

                <Column width={200} align="center" fixed>
                    <HeaderCell>...</HeaderCell>
                    <DeleteCell dataKey="userId" onClick={handleDeleteState} />
                </Column>

            </Table>







{/* 
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
            /> */}
        </>
    );
};

export default DriversTable;
