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

    return (

        <Table
            autoHeight={true}
            className='table__routes'
            width={700}
            data={data.data || []}
            onRowClick={rowData => {
                console.log(rowData);
            }}
            >

            <Column width={100} align="center" fixed>
                <HeaderCell>Id</HeaderCell>
                <Cell dataKey="value" />
            </Column>

            <Column width={500} align="center" fixed>
                <HeaderCell>Маршрут</HeaderCell>
                <Cell dataKey="label" />
            </Column>

           
        </Table>

    )
}

export default RoutesTable
