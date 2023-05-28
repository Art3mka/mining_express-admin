import React, { useMemo, useState } from 'react'
import MaterialReactTable, {
    MaterialReactTableProps,
    MRT_ColumnDef as mrtColumnDef,
} from 'material-react-table'
import { Orders, tableProps } from './types'



const Table = (data: any) => {
    const sendEmail = (row: any) => {
        console.log('click', row)
    }

    const columns = useMemo<mrtColumnDef<Orders>[]>(
        () => [
            {
                accessorKey: 'orderId',
                header: 'Номер',
                size: 10,
                filterVariant: 'text', 
            },
            {
                accessorKey: 'busStopName',
                header: 'Остановка',
                filterVariant: 'text',
                size: 30,
            },
            {
                accessorKey: 'departureTime',
                header: 'Время отправления',
                size: 30,
                filterVariant: 'text',
            },
            {
                accessorKey: 'date',
                header: 'Дата',
                size: 100,
                filterVariant: 'text',
            },
            {
                accessorKey: 'phone',
                header: 'Телефон',
                size: 100,
                filterVariant: 'text',
            },
            {
                accessorKey: 'routeName',
                header: 'Маршрут',
                size: 100,
                filterVariant: 'text',
            },
            {
                accessorKey: 'seatsCount',
                header: 'Кол-во мест',
                size: 100,
                filterVariant: 'text',
            },
        ],
        []
    )

    const [tableData, setTableData] = useState<Orders[]>(() => data)

    const handleSaveRow: MaterialReactTableProps<Orders>['onEditingRowSave'] =
        async ({ exitEditingMode, row, values }) => {
            tableData[row.index] = values

            setTableData([...tableData])
            exitEditingMode()
        }
        
    return (
        <MaterialReactTable
            {...tableProps}
            columns={columns}
            data={data.data || []}
            initialState={{ showColumnFilters: true }}
            editingMode='row'
            displayColumnDefOptions={{
                'mrt-row-actions': {
                    size: 100,
                    muiTableHeadCellProps: {
                        align: 'center',
                    },
                    header: '',
                },
            }}
            onEditingRowSave={handleSaveRow}
        />
    )
}

export default Table
