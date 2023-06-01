import React, { useMemo, useState, useEffect } from 'react'
import MaterialReactTable, {
    MaterialReactTableProps,
    MRT_ColumnDef as mrtColumnDef,
} from 'material-react-table'
import { Routes, tableProps } from './types'
import './index.scss'




import { Table, Button } from 'rsuite'

const { Column, HeaderCell, Cell } = Table;


const RoutesTable = (data: any) => {

    // const [tableInfo, setTableInfo] = useState(data.data)

    // debugger
    // const sendEmail = (row: any) => {
    //     console.log('click', row)
    // }

    // const columns = useMemo<mrtColumnDef<Routes>[]>(
    //     () => [
    //         {
    //             accessorKey: 'routeId',
    //             header: 'Номер',
    //             size: 200,
    //             filterVariant: 'text',
    //         },
    //         {
    //             accessorKey: 'routeName',
    //             header: 'Маршрут',
    //             filterVariant: 'text',
    //             size: 400,
    //         },
    //     ],
    //     []
    // )

    // const [tableData, setTableData] = useState<Routes[]>(() => data)

    // const handleSaveRow: MaterialReactTableProps<Routes>['onEditingRowSave'] =
    //     async ({ exitEditingMode, row, values }) => {
    //         tableData[row.index] = values

    //         setTableData([...tableData])
    //         exitEditingMode()
    //     }


    const [tableInfo, setTableInfo] = useState(data.data)

    

    return (

        <Table
            autoHeight={true}
            className='table__routes'
            width={1000}
            data={data.data || []}
            onRowClick={rowData => {
                console.log(rowData);
            }}
            >

            <Column width={100} align="center" fixed>
                <HeaderCell>Id</HeaderCell>
                <Cell dataKey="routeId" />
            </Column>

            <Column width={500} align="center" fixed>
                <HeaderCell>Маршрут</HeaderCell>
                <Cell dataKey="routeName" />
            </Column>

           
        </Table>

    )
}

export default RoutesTable
