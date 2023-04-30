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
        await createOrder(data, token.accessToken);
    };

    const seatsData = ['1', '2', '3'].map((item) => ({
        label: item,
        value: item,
    }));

    useEffect(() => {
        getRoutesData();
    }, []);

    interface RoutesData {
        routeId: string;
        routeName: string;
    }

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

    const getTripsData = async (id: string, date: number) => {
        const result = await getTrips(id, date);
        console.log('trips', result);

        setTripsData(result.trips);
        setDepatureData(result.departureBusStops);
    };

    const setData = (value: any) => {
        console.log('test', value);
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
            getModifyStationData(depatureData);
        }
    }, [boardingDate, depatureData, routeIdValue]);

    useEffect(() => {
        if (boardingDate) {
            const data = getModifyStationData(depatureData);
            setModifiedStatinData(data);
        }
    }, [boardingDate]);

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
            console.log('getDifferentTime :>> ', getDifferentTime);
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
        // console.log('getModifyStationData data :>> ', data);

        return result;
    };

    const getStationInfo = (id: any) => {
        const result = modifiedStatinData.filter(
            (item: any) => item.value === id
        );
        console.log('result :>> ', result);

        const stationDataModify = result
            .map((item: any) => item.stopTimes)
            .flat()
            .map((item: any) => ({
                label: item.time,
                value: item.id,
            }));

        setStationInfo(stationDataModify as any);

        // const sortedDifferentTime = differentTimeAvailable.map((item: any) => ({
        //     departureTime: parseFloat(item.departureTime.replace(/:/, '.')),
        //     arrivalTime: parseFloat(item.arrivalTime.replace(/:/, '.')),
        // }));

        // console.log('sortedDifferentTime :>> ', sortedDifferentTime);

        // const sortedStationData = stationDataModify.map((item: any) => ({
        //     label: parseFloat(item.label.replace(/:/, '.')),
        //     value: item.value,
        // }));

        // console.log(
        //     'stationDataModify id :>> ',
        //     sortedStationData.map((item: any) => {
        //         console.log('sortedStationData item', item);
        //         sortedDifferentTime.filter(
        //             (elem: any) =>
        //                 item.label >= elem.departureTime &&
        //                 item.label <= elem.arrivalTime
        //                     ? return {
        //                           value: item.value,
        //                           label: item.label,
        //                       }
        //                     : null
        //         );
        //     })
        // );

        // var array = [1, 2, 3, 4];
        // var evens = _.remove(array, function(n) {
        //   return n % 2 == 0;
        // });
         
        // console.log(array);
        // // => [1, 3]
         
        // console.log(evens);
        // // => [2, 4]


        return result;
    };

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
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
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
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
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
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
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
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
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
                        render={({ field, fieldState }) => (
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
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
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
                                    getStationInfo(e);
                                    setArrivalTimeChoose(!!e);
                                    field.onChange(e);
                                }}
                                disabled={!isTripChoose}
                            />
                        )}
                        key="departureBusStopId"
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
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
                                    setData(e);
                                    field.onChange(e);
                                }}
                                disabled={!isArrivalTimeChoose}
                            />
                        )}
                        key="arrivalTimeId"
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
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
