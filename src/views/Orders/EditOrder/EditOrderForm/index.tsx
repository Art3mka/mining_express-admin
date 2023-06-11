import React, { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import './index.scss';
import Input from '../../../../components/Input';
import { UserContext } from '../../../../services/context/contextProvider';
import { getTrips, updateOrder } from '../../../../services/api/api';
import DropDown from '../../../../components/DropDown';
import DatePicker from '../../../../components/DatePicker';
import { Orders } from '../../../../components/Table/types';
import { getDefaultRoutesID, getModifyStationData, seatsData } from './utils';
import ModalLoader from '../../../../components/ModalLoader';
import { NotificationTypeEnum } from '../../../../type';

interface IFormInput {
    orderId: number;
    tripId: number;
    routeId: number;
    arrivalTimeId: number;
    departureBusStopId: number;
    seatsCount: number;
    phone: string;
}

interface CreateOrderFormProps {
    submitRef: any;
    editData?: Orders;
    close: () => void;
}

const EditOrderForm = ({
    submitRef,
    editData,
    close,
}: CreateOrderFormProps) => {
    const { user, routesData, setNotification } = useContext(UserContext);
    const { token } = user;
    const [tripsData, setTripsData] = useState([]);
    const [depatureData, setDepatureData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modifiedTripsData, setModifiedTripsData] = useState([]);
    const [stationInfo, setStationInfo] = useState([{ value: '' }]);
    const [routeIdValue, setRouteIdValue] = useState('');
    const [stationId, setStationId] = useState('');
    const [defaultBusStopId, setDefaultBusStopId] = useState(0);
    const [boardingDate, setBoardingDate] = useState<number | undefined>();
    console.log('editData :>> ', editData);

    const [defaultRoutesValue, setDefaultRoutesValue] = useState<number>();

    const { control, handleSubmit } = useForm<IFormInput>({
        defaultValues: {
            orderId: editData?.orderId,
            phone: editData?.phone,
            seatsCount: +editData?.seatsCount!,
        },
    });

    const editValue = true;

    const onSubmit = async (data: IFormInput) => {
        try {
            const modifyData = {
                ...data,
                departureBusStopId: defaultBusStopId,
                routeId: defaultRoutesValue,
                orderId: editData?.orderId,
                //@ts-ignore
                tripId: modifiedTripsData[0].value,
                //@ts-ignore
                arrivalTimeId: stationInfo[0].value,
            };

            await updateOrder(modifyData, token);
            setNotification({ type: NotificationTypeEnum.SUCCESS });
            close();
        } catch (error) {
            setNotification({
                type: NotificationTypeEnum.ERROR,
                title: 'Ошибка',
            });
            console.error('Error');
        }
    };

    const getDefaultRoutesData = (value: any) => {
        // @ts-ignore
        const result = routesData?.find((el) => el.label === value)?.value;
        setDefaultRoutesValue(Number(result));
        // console.log('result :>> ', result);
        return Number(result);
    };

    //информация о рейсах
    const getTripsData = async (id: string, date: any) => {
        try {
            setIsLoading(true);
            const result = await getTrips(id, date);
            setTripsData(result.trips);
            setModifiedTripsData(result.trips);
            const res = getModifyTripsData(result.trips);
            console.log('res 107:>> ', res);
            setDepatureData(result.departureBusStops);
            const data = getDefaultRoutesID(
                result.departureBusStops,
                editData?.busStopName!
            );
            //@ts-ignore
            setDefaultBusStopId(data?.id);
            //@ts-ignore
            getStationInfo(data?.id!, result.trips, result.departureBusStops);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
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
    }, [defaultRoutesValue, editData?.date]);
    useEffect(() => {
        if (routeIdValue) {
            //важная штука
            const dayOfWeek = new Date(editData?.date!).getDay();
            getTripsData(routeIdValue, dayOfWeek!);
        }
        //здесь загружается информация о рейсах
        if (routeIdValue && boardingDate) {
            getTripsData(routeIdValue, boardingDate!);
        }
    }, [boardingDate, editData?.date, routeIdValue]);

    useEffect(() => {
        if (tripsData) {
            console.log('tripsData :>> ', tripsData);
            const data = getModifyTripsData(tripsData);
            setModifiedTripsData(data);
        }
    }, [tripsData]);

    const getModifyTripsData = (data: any, editValue?: any) => {
        if (editValue) {
            const result = data
                .map((item: any) => ({
                    label: `Рейс: ${item.tripDate} - ${item.departureTime} - ${item.arrivalTime}`,
                    value: item.tripId,
                    departureTime: item.departureTime,
                    arrivalTime: item.arrivalTime,
                }))
                .filter((el: any) =>
                    el.label.includes(editData?.date)
                )[0]?.value;
            return result;
        }
        const result = data.map((item: any) => ({
            label: `Рейс: ${item.tripDate} - ${item.departureTime} - ${item.arrivalTime}`,
            value: item.tripId,
            departureTime: item.departureTime,
            arrivalTime: item.arrivalTime,
        }));
        return result;
    };

    const getStationInfo = (id: any, tripsArray?: [], busStopData?: []) => {
        const result = busStopData?.filter((item: any) => item.id === id);

        const stationDataModify = result
            ?.map((item: any) => item.stopTimes)
            .flat()
            .map((item: any) => ({
                label: item.time,
                value: item.id,
            }));

        const sortedDifferentTime = tripsArray?.map((item: any) => ({
            departureTime: parseFloat(
                item.departureTime.replace(/:/, '.')
            ).toFixed(2),
            arrivalTime: parseFloat(item.arrivalTime.replace(/:/, '.')).toFixed(
                2
            ),
        }));

        const sortedStationData = stationDataModify?.map((item: any) => ({
            label: parseFloat(item.label.replace(/:/, '.')).toFixed(2),
            value: item.value,
        }));

        const avalableStation = sortedStationData?.filter((el) =>
            sortedDifferentTime?.find(
                (item) =>
                    item.departureTime <= el.label &&
                    item.arrivalTime >= el.label
            )
        );

        const data = avalableStation?.map((elem) => ({
            value: elem.value,
            label: `Время: ${String(elem.label).replace(/[.]/g, ':')}`,
        }));

        setStationInfo(data as any);

        return data;
    };

    useEffect(() => {
        if (stationId) {
            //@ts-ignore
            getStationInfo(stationId, modifiedTripsData, depatureData as any);
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
                                        label="ID заказа"
                                        className="form-input"
                                        // defaultValue={editData?.orderId}
                                        value={editData?.orderId}
                                        disabled
                                    />
                                )}
                                key="orderId"
                                name="orderId"
                                control={control}
                            />
                            <Controller
                                render={() => (
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
                                            field.onChange(e);
                                        }}
                                        defaultValue={getModifyTripsData(
                                            tripsData,
                                            editValue
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
                                            field.onChange(e);
                                        }}
                                        defaultValue={defaultBusStopId}
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
                                        //@ts-ignore
                                        // defaultValue={stationInfo[0].value ?? ''}
                                        defaultValue={stationInfo[0].value}
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
            )}
        </>
    );
};

export default EditOrderForm;
