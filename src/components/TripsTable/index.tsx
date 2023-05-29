import { Table, Pagination } from 'rsuite';
import './index.scss';
import { useState } from 'react';
import EditTripsMoad from './EditTripsModal';
import AddTripsModal from './AddTripsModal';

const { Column, HeaderCell, Cell } = Table;

interface ITripsData {
    data: any;
}

const TripsTable = ({ data }: ITripsData) => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const handleChangeLimit = (dataKey: any) => {
        setPage(1);
        setLimit(dataKey);
    };

    const tripsData = data.filter((v: any, i: number) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
    });

    return (
        <>
            <div>
                <Table
                    height={540}
                    width={1000}
                    data={tripsData}
                    className="tripsTable"
                >
                    <Column width={100} align="center" fixed>
                        <HeaderCell>Id</HeaderCell>
                        <Cell dataKey="tripId" />
                    </Column>

                    <Column width={250}>
                        <HeaderCell>Дата</HeaderCell>
                        <Cell dataKey="tripDate" />
                    </Column>

                    <Column width={250}>
                        <HeaderCell>Отправление</HeaderCell>
                        <Cell dataKey="departureTime" />
                    </Column>

                    <Column width={300}>
                        <HeaderCell>Прибытие</HeaderCell>
                        <Cell dataKey="arrivalTime" />
                    </Column>

                    <Column width={100} fixed="right">
                        <HeaderCell>...</HeaderCell>

                        <Cell style={{ padding: '6px' }}>
                            {(rowData) => <EditTripsMoad data={rowData} />}
                        </Cell>
                    </Column>
                </Table>
                <div style={{ padding: 20 }}>
                    <Pagination
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        maxButtons={5}
                        size="xs"
                        layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                        total={data.length}
                        limitOptions={[10, 30, 50]}
                        limit={limit}
                        activePage={page}
                        onChangePage={setPage}
                        onChangeLimit={handleChangeLimit}
                    />
                </div>
            </div>
            <div className="modal">
                <AddTripsModal />
            </div>
        </>
    );
};

export default TripsTable;
