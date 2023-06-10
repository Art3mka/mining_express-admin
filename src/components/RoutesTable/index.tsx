import React from 'react';
import { Table } from 'rsuite';
import './index.scss';


const RoutesTable = (data: any) => {
    const { Column, HeaderCell, Cell } = Table;

    return (
        <Table
            autoHeight={true}
            className="table__routes"
            width={700}
            data={data.data || []}
            onRowClick={(rowData) => {
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
    );
};

export default RoutesTable;
