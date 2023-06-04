import { Table, Pagination } from 'rsuite';
import './index.scss';
import { useContext, useState } from 'react';
import EditTripsMoad from './EditTripsModal';
import AddTripsModal from './AddTripsModal';
import { UserContext } from '../../services/context/contextProvider';
import { ITrip } from '../../services/types';
import Input from '../Input';

const { Column, HeaderCell, Cell } = Table;

interface ITripsData {
    data: ITrip[];
}

const TripsTable = ({ data }: ITripsData) => {
    const { routesData } = useContext(UserContext);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();
    const [loading, setLoading] = useState(false);

    const handleChangeLimit = (dataKey: any) => {
        setPage(1);
        setLimit(dataKey);
    };

    const trips = data.map((trip) =>
        Object.assign(
            trip,
            routesData
                ?.map((route) => ({
                    routeId: route.value,
                    label: route.label,
                }))
                ?.find((route) => route.routeId === trip.routeId)
        )
    );

    const tripsData = trips.filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
    });

    const getData = () => {
        if (sortColumn && sortType) {
          return tripsData.sort((a, b) => {
            let x = a[sortColumn];
            let y = b[sortColumn];
            if (typeof x === 'string') {
                //@ts-ignore
              x = x.charCodeAt();
            }
            if (typeof y === 'string') {
                //@ts-ignore
              y = y.charCodeAt();
            }
            if (sortType === 'asc') {
              return x - y;
            } else {
              return y - x;
            }
          });
        }
        return data;
      };
    
      const handleSortColumn = (sortColumn: any, sortType: any) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setSortColumn(sortColumn);
          setSortType(sortType);
        }, 500);
      };

    return (
        <>
        <div className='tripstable-input'>
            <Input  label='Поиск' placeholder='Поиск' onChange={() => {console.log('event')}}/>
        </div>
            <div>
                <Table
                    height={540}
                    width={1200}
                    // data={tripsData}
                    className="tripsTable"
                    data={getData()}
                    sortColumn={sortColumn}
                    sortType={sortType}
                    onSortColumn={handleSortColumn}
                    loading={loading}
                >
                    <Column width={50} align="center" fixed sortable>
                        <HeaderCell>Id</HeaderCell>
                        <Cell dataKey="tripId" />
                    </Column>

                    <Column width={250} sortable>
                        <HeaderCell>Дата</HeaderCell >
                        <Cell dataKey="tripDate" />
                    </Column>

                    <Column width={250} sortable>
                        <HeaderCell>Маршрут</HeaderCell>
                        <Cell dataKey="label" />
                    </Column>

                    <Column width={250} sortable>
                        <HeaderCell>Отправление</HeaderCell>
                        <Cell dataKey="departureTime" />
                    </Column>

                    <Column width={300} sortable>
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
                        limitOptions={[30]}
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
