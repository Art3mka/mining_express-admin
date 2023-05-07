/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import './index.scss';
import Input from '../../../../components/Input';
import { UserContext } from '../../../../services/context/contextProvider';
import {
    createOrder,
    getRoutes,
    getTrips,
    updateOrder,
} from '../../../../services/api/api';
import DropDown from '../../../../components/DropDown';
import DatePicker from '../../../../components/DatePicker';
import { Orders } from '../../../../components/Table/types';
import { seatsData } from './utils';
import { Loader, Placeholder } from 'rsuite';
import ModalLoader from '../../../../components/ModalLoader';

interface IFormInput {
    arrivalTimeId: number;
    tripId: number;
    routeId: number;
    departureBusStopId: string;
    phone: string;
    orderId: number;
    seatsCount: number;
}

interface CreateOrderFormProps {
    submitRef: any;
    editData?: Orders;
}

interface RoutesData {
    routeId: string;
    routeName: string;
}

const EditOrderForm = ({ submitRef, editData }: CreateOrderFormProps) => {
    const [routesData, setRotesData] = useState([{ label: '', value: '' }]);
    const [tripsData, setTripsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [editOrderData, setEditOrderData] = useState<Orders>();
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

    const [defaultRoutesValue, setDefaultRoutesValue] = useState<number>();

    const { control, handleSubmit } = useForm<IFormInput>();
    const { user } = useContext(UserContext);
    const { token } = user;

    const onSubmit = async (data: IFormInput) => {
        try {
            await updateOrder(data, token.accessToken);
        } catch (error) {
            console.error('Error');
        }
    };

    const getRoutesData = async () => {
        try {
            setIsLoading(true);
            const result = await getRoutes();
            const data = result.map(({ routeId, routeName }: RoutesData) => ({
                label: routeName,
                value: routeId,
            }));

            console.log('1 render routes data :>> ', data);

            setRotesData(data);
            setIsLoading(false);
            return data;
        } catch (error) {
            console.error('error');
        }
    };

    useEffect(() => {
        getRoutesData();
    }, []);

    const getDefaultRoutesData = (value: any) => {
        const result = routesData.find((el) => el.label === value)?.value;
        setDefaultRoutesValue(Number(result));
        return Number(result);
    };

    const getTripsData = async (id: string, date: any) => {
        const result = await getTrips(id, date);
        console.log('result getTripsData:>> ', result);
        setTripsData(result.trips);
        setDepatureData(result.departureBusStops);
    };

    const getOrderDate = (value?: Date) => {
        const orderDate = value?.getDay();
        setBoardingDate(orderDate);
    };

    useEffect(() => {
        if (defaultRoutesValue) {
            const dayOfWeek = new Date(editData?.date!).getDay();
            getTripsData(String(defaultRoutesValue), dayOfWeek);
        }
    }, [defaultRoutesValue]);

    useEffect(() => {
        if (routeIdValue) {
            const dayOfWeek = new Date(editData?.date!).getDay();
            getTripsData(routeIdValue, dayOfWeek!);
        }

        if (routeIdValue && boardingDate) {
            getTripsData(routeIdValue, boardingDate!);
        }
    }, [routeIdValue]);

    useEffect(() => {
        getModifyTripsData(tripsData);
    }, [tripsData]);

    useEffect(() => {
        console.log('boardingDate :>> ', boardingDate);
        // if (routeIdValue && boardingDate) {
            const data = getModifyStationData(depatureData);
            console.log('data :>> ', data);
            setModifiedStatinData(data);
        // }
    }, [boardingDate, depatureData, routeIdValue]);

    useEffect(() => {
        if (tripsData) {
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
        console.log('getModifyTripsData :>> ', result);
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

        console.log('stationDataModify :>> ', stationDataModify);

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
        <>
            {isLoading ? (
                <ModalLoader />
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                    <div className="container">
                        <div className="container-form">
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        label="ID"
                                        className="form-input"
                                        value={editData?.orderId}
                                        disabled
                                    />
                                )}
                                key="orderId"
                                name="orderId"
                                control={control}
                            />
                            <Controller
                                render={({ field }) => (
                                    <DropDown
                                        data={seatsData}
                                        placeholder="Кол-во мест"
                                        className="select"
                                        defaultValue={`${editData?.seatsCount}`}
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
                                        label="Номер телефона"
                                        className="form-input"
                                        defaultValue={editData?.phone}
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
                                        defaultValue={getDefaultRoutesData(
                                            editData?.routeName
                                        )}
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
                                defaultValue={new Date(editData?.date!)}
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
                                        // disabled={isDisabled}
                                        defaultValue={getModifyTripsData(
                                            tripsData
                                        )}
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
                                        data={getModifyStationData(
                                            depatureData
                                        )} //api trips
                                        placeholder="Остановка"
                                        className="select"
                                        onChange={(e: any) => {
                                            setStationId(e);
                                            setArrivalTimeChoose(!!e);
                                            field.onChange(e);
                                        }}
                                        // disabled={!isTripChoose}
                                        defaultValue={editData?.busStopName}
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
                                        defaultValue={editData?.departureTime}
                                    />
                                )}
                                key="arrivalTimeId"
                                name="arrivalTimeId"
                                control={control}
                                defaultValue={+editData?.departureTime!}
                            />
                        </div>
                    </div>
                    <button type="submit" ref={submitRef} />
                </form>
            )}
        </>
    );
};

export default EditOrderForm;
