import React, { useMemo, useState } from 'react'
import MaterialReactTable, {
    MaterialReactTableProps,
    MRT_ColumnDef as mrtColumnDef,
} from 'material-react-table'
import { Drivers, tableProps } from './types'
import './index.scss'


const DriversTable = (data: any) => {
    const sendEmail = (row: any) => {
        console.log('click', row)
    }

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
    )

    const [tableData, setTableData] = useState<Drivers[]>(() => data)

    const handleSaveRow: MaterialReactTableProps<Drivers>['onEditingRowSave'] =
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

export default DriversTable
