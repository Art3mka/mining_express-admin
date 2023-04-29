import React, { useMemo, useState } from 'react'
import MaterialReactTable, {
    MaterialReactTableProps,
    MRT_ColumnDef as mrtColumnDef,
} from 'material-react-table'
import { Routes, tableProps } from './types'
import './index.scss'


const RoutesTable = (data: any) => {
    const sendEmail = (row: any) => {
        console.log('click', row)
    }

    const columns = useMemo<mrtColumnDef<Routes>[]>(
        () => [
            {
                accessorKey: 'routeId',
                header: 'Номер',
                size: 200,
                // default
                filterVariant: 'text', 
            },
            {
                accessorKey: 'routeName',
                header: 'Маршрут',
                filterVariant: 'text',
                size: 400,
            },
        ],
        []
    )

    const [tableData, setTableData] = useState<Routes[]>(() => data)

    const handleSaveRow: MaterialReactTableProps<Routes>['onEditingRowSave'] =
        async ({ exitEditingMode, row, values }) => {
            // if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
            tableData[row.index] = values

            // send/receive api updates here
            setTableData([...tableData])
            exitEditingMode() // required to exit editing mode
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

export default RoutesTable
