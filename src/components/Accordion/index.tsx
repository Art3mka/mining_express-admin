import React, { useContext, useState, useEffect } from 'react';
import { Panel } from 'rsuite';
import { List } from 'rsuite';
import { UserContext } from '../../services/context/contextProvider';
import './index.scss';
import DropDown from '../DropDown';
import { assignDriver, getDrivers } from '../../services/api/api';

interface AccordionProps {
    title: string;
    value: number;
}

interface Driver {
    login: string;
    password: string;
    userId: number;
    phone?: string;
}

const Accordion = ({ title, value }: AccordionProps) => {
    const { tripsData, user } = useContext(UserContext);
    const { token } = user;
    const [driverData, setDriverData] = useState<Driver[]>([]);

    const getDriversData = async () => {
        const data = await getDrivers(token?.accessToken);
        setDriverData(data);
    };

    useEffect(() => {
        getDriversData();
    }, []);

    const defenitlyTrip = tripsData.filter((trip) => value === trip.routeId);
    console.log('defenitlyTrip :>> ', defenitlyTrip);

    const drivers = driverData.map((driver) => ({
        label: driver.login,
        value: driver.userId,
    }));

    const handleAssignDriver = (id: number, tripId: number) => {
        const assignDriverData = {
            userId: id,
            tripId,
        };
        try {
            const data = assignDriver(assignDriverData, token?.accessToken);
            return data;
        } catch (error) {
            console.log('error');
        }
    };

    return (
        <Panel header={title} collapsible bordered>
            <List>
                {defenitlyTrip.map(
                    ({
                        arrivalTime,
                        departureTime,
                        dayOfWeekNumber,
                        tripId,
                        tripDate,
                    }) => (
                        <List.Item>
                            <div className="info-list">
                                <p className="title">{title}</p>
                                <p>Отправление: {departureTime}</p>
                                <p>Прибытие: {arrivalTime}</p>
                                <div className="info-driver">
                                    <p className="driver">Водитель: </p>
                                    <div>
                                        <DropDown
                                            data={drivers}
                                            onChange={(e: number) => {
                                                handleAssignDriver(e, tripId!);
                                            }}
                                        />
                                    </div>
                                </div>
                                <p>Дата: {tripDate}</p>
                            </div>
                        </List.Item>
                    )
                )}
            </List>
        </Panel>
    );
};

export default Accordion;
