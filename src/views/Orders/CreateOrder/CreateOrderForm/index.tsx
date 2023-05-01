/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import './index.scss';
import Input from '../../../../components/Input';
import { UserContext } from '../../../../services/context/contextProvider';
import { createOrder, getRoutes, getTrips } from '../../../../services/api/api';
import DropDown from '../../../../components/DropDown';
import DatePicker from '../../../../components/DatePicker';

interface IFormInput {
    arrivalTimeId: number;
    tripId: number;
    routeId: number;
    departureBusStopId: string;
    phone: string;
    comment: number;
    seatsCount: number;
}

interface CreateOrderFormProps {
    submitRef: any;
}

const CreateOrderForm = ({ submitRef }: CreateOrderFormProps) => {
    const [routesData, setRotesData] = useState([]);
    const [tripsData, setTripsData] = useState([]);
    const [depatureData, setDepatureData] = useState([]);
    const [modifiedStatinData, setModifiedStatinData] = useState([]);
    const [modifiedTripsData, setModifiedTripsData] = useState([]);
    const [stationInfo, setStationInfo] = useState([]);
    const [routeIdValue, setRouteIdValue] = useState('');
    const [stationId, setStationId] = useState('');
    const [isRouteChoose, setRouteChoose] = useState(false);
    const [isTripChoose, setTripChoose] = useState(false);
    const [isArrivalTimeChoose, setArrivalTimeChoose] = useState(false);
    const [isBoardingDate, setIsBoardingDate] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [boardingDate, setBoardingDate] = useState<number | undefined>();
    const [differentTimeAvailable, setDifferentTimeAvailable] = useState([]);

    const { control, handleSubmit } = useForm<IFormInput>();
    const { user } = useContext(UserContext);
    const { token } = user;

    const onSubmit = async (data: IFormInput) => {
        console.log('data data', data);
        try {
            await createOrder(data, token.accessToken);
        } catch (error) {
            console.error('Error')
        }
    };

    const seatsData = ['1', '2', '3'].map((item) => ({
        label: item,
        value: item,
    }));

    const getRoutesData = async () => {
        const result = await getRoutes();
        const data = result.map(({ routeId, routeName }: RoutesData) => ({
            label: routeName,
            value: routeId,
        }));
        console.log(data);

        setRotesData(data);
        return data;
    };

    useEffect(() => {
        getRoutesData();
    }, []);

    interface RoutesData {
        routeId: string;
        routeName: string;
    }

    const getTripsData = async (id: string, date: number) => {
        const result = await getTrips(id, date);

        setTripsData(result.trips);
        setDepatureData(result.departureBusStops);
    };

    const getOrderDate = (value?: Date) => {
        const orderDate = value?.getDay();
        setBoardingDate(orderDate);
    };

    useEffect(() => {
        if (routeIdValue && boardingDate) {
            getTripsData(routeIdValue, boardingDate!);
        }
    }, [boardingDate, routeIdValue]);

    useEffect(() => {
        if (routeIdValue && boardingDate) {
            getModifyTripsData(tripsData);
        }
    }, [boardingDate, routeIdValue, tripsData]);

    useEffect(() => {
        if (routeIdValue && boardingDate) {
            const data = getModifyStationData(depatureData);
            setModifiedStatinData(data);
        }
    }, [boardingDate, depatureData, routeIdValue]);

    useEffect(() => {
        if (boardingDate) {
            const data = getModifyTripsData(tripsData);
            setModifiedTripsData(data);
        }
    }, [boardingDate, tripsData]);

    useEffect(() => {
        if (modifiedTripsData) {
            const getDifferentTime = modifiedTripsData.map(
                (item: any) => item.attr
            );
            setDifferentTimeAvailable(getDifferentTime as any);
        }
    }, [modifiedTripsData]);

    const setDisabledDropdown = (isTrip: boolean, isDay: boolean) => {
        if (isTrip) {
            if (isDay) {
                return setIsDisabled(false);
            }
            return setIsDisabled(true);
        }
        return setIsDisabled(true);
    };
    useEffect(() => {
        setDisabledDropdown(isBoardingDate, isRouteChoose);
    }, [isBoardingDate, isRouteChoose]);

    const getModifyTripsData = (data: any) => {
        const result = data.map((item: any) => ({
            label: `Рейс: ${item.tripDate} - ${item.departureTime} - ${item.arrivalTime}`,
            value: item.tripId,
            attr: {
                departureTime: item.departureTime,
                arrivalTime: item.arrivalTime,
            },
        }));

        return result;
    };

    const getModifyStationData = (data: any) => {
        const result = data.map((item: any) => ({
            label: item.name,
            value: item.id,
            stopTimes: item.stopTimes,
        }));

        return result;
    };

    const getStationInfo = (id: any) => {
        const result = modifiedStatinData.filter(
            (item: any) => item.value === id
        );

        const stationDataModify = result
            .map((item: any) => item.stopTimes)
            .flat()
            .map((item: any) => ({
                label: item.time,
                value: item.id,
            }));

        const sortedDifferentTime = differentTimeAvailable.map((item: any) => ({
            departureTime: parseFloat(
                item.departureTime.replace(/:/, '.')
            ).toFixed(2),
            arrivalTime: parseFloat(item.arrivalTime.replace(/:/, '.')).toFixed(
                2
            ),
        }));

        const sortedStationData = stationDataModify.map((item: any) => ({
            label: parseFloat(item.label.replace(/:/, '.')).toFixed(2),
            value: item.value,
        }));

        const avalableStation = sortedStationData.filter((el) =>
            sortedDifferentTime.find(
                (item) =>
                    item.departureTime <= el.label &&
                    item.arrivalTime >= el.label
            )
        );

        const data = avalableStation.map((elem) => ({
            value: elem.value,
            label: `Время: ${String(elem.label).replace(/[.]/g, ':')}`,
        }));

        return data;
    };

    useEffect(() => {
        if (stationId) {
            const data = getStationInfo(stationId);
            setStationInfo(data as any);
        }
    }, [stationId]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="container">
                <div className="container-form">
                    <Controller
                        render={({ field }) => (
                            <DropDown
                                {...field}
                                data={seatsData}
                                placeholder="Кол-во мест"
                                className="select"
                            />
                        )}
                        key="seatsCount"
                        name="seatsCount"
                        control={control}
                    />
                    <Controller
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="Комментарий"
                                className="form-input"
                            />
                        )}
                        key="comment"
                        name="comment"
                        control={control}
                    />
                    <Controller
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="Номер телефона"
                                className="form-input"
                            />
                        )}
                        key="phone"
                        name="phone"
                        control={control}
                    />
                    <Controller
                        render={({ field }) => (
                            <DropDown
                                {...field}
                                data={routesData}
                                placeholder="Маршрут"
                                className="select"
                                onChange={(e: any) => {
                                    setRouteIdValue(e);
                                    setRouteChoose(!!e);
                                    field.onChange(e);
                                }}
                            />
                        )}
                        key="routeId"
                        name="routeId"
                        control={control}
                    />
                    <DatePicker
                        className="select"
                        placeholder="Выберите день"
                        onChange={(e: any) => {
                            getOrderDate(e);
                            setIsBoardingDate(!!e);
                        }}
                        disabled={!isRouteChoose}
                    />
                    <Controller
                        render={({ field }) => (
                            <DropDown
                                {...field}
                                data={getModifyTripsData(tripsData)}
                                placeholder="Рейс"
                                className="select"
                                onChange={(e: any) => {
                                    setTripChoose(!!e);
                                    field.onChange(e);
                                }}
                                disabled={isDisabled}
                            />
                        )}
                        key="tripId"
                        name="tripId"
                        control={control}
                    />
                    <Controller
                        render={({ field }) => (
                            <DropDown
                                {...field}
                                data={getModifyStationData(depatureData)} //api trips
                                placeholder="Остановка"
                                className="select"
                                onChange={(e: any) => {
                                    setStationId(e);
                                    setArrivalTimeChoose(!!e);
                                    field.onChange(e);
                                }}
                                disabled={!isTripChoose}
                            />
                        )}
                        key="departureBusStopId"
                        name="departureBusStopId"
                        control={control}
                    />
                    <Controller
                        render={({ field }) => (
                            <DropDown
                                {...field}
                                data={stationInfo}
                                placeholder="Время посадки"
                                className="select"
                                onChange={(e: any) => {
                                    field.onChange(e);
                                }}
                                disabled={!isArrivalTimeChoose}
                            />
                        )}
                        key="arrivalTimeId"
                        name="arrivalTimeId"
                        control={control}
                    />
                </div>
            </div>
            <button type="submit" ref={submitRef} />
        </form>
    );
};

export default CreateOrderForm;
