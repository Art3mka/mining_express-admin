import { Controller, useForm } from 'react-hook-form';
import { UserContext } from '../../../../services/context/contextProvider';
import { useContext } from 'react';
import { createTrip } from '../../../../services/api/api';
import DropDown from '../../../DropDown';
import DatePickerCustom from '../../../DatePicker';
import { Button, DatePicker } from 'rsuite';
import './index.scss';
import { NotificationTypeEnum } from '../../../../type';

interface AddTripsFormProps {
    close: () => void;
}

interface IFormInput {
    routeId: number;
    departureTime?: string;
    arrivalTime?: string;
    dayOfWeekNumber?: number;
}

const AddTripsForm = ({ close }: AddTripsFormProps) => {
    const { control, handleSubmit } = useForm<IFormInput>();
    const { user, routesData, setNotification } = useContext(UserContext);
    const { token } = user;

    const onSubmit = async (data: IFormInput) => {
        try {
            await createTrip(data, token);
            setNotification({ type: NotificationTypeEnum.SUCCESS });
            close();
        } catch (error) {
            setNotification({
                type: NotificationTypeEnum.ERROR,
                title: 'Ошибка',
            });
            console.error(error);
        }
    };

    const getOrderDate = (value?: Date) => {
        return value?.getDay();
    };

    const getHoursAndMinute = (value: Date) => {
        const d = new Date(value);

        const hoursAndMinutes = `${d.getHours()}:${d.getMinutes()}`;
        return hoursAndMinutes;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="modal-container">
                <div className="container-form">
                    <Controller
                        render={({ field }) => (
                            <DropDown
                                {...field}
                                data={routesData}
                                placeholder="Маршрут"
                                className="select"
                                onChange={(e: any) => {
                                    field.onChange(e);
                                    console.log('object :>> ', e);
                                }}
                            />
                        )}
                        key="routeId"
                        name="routeId"
                        control={control}
                    />
                    <Controller
                        render={({ field }) => (
                            <DatePicker
                                format="HH:mm"
                                className="select"
                                placeholder="Время отправления"
                                ranges={[]}
                                style={{ width: 260 }}
                                onChange={(e: any) => {
                                    field.onChange(getHoursAndMinute(e));
                                }}
                            />
                        )}
                        key="departureTime"
                        name="departureTime"
                        control={control}
                    />
                    <Controller
                        render={({ field }) => (
                            <DatePicker
                                format="HH:mm"
                                className="select"
                                placeholder="Время прибытия"
                                ranges={[]}
                                style={{ width: 260 }}
                                onChange={(e: any) => {
                                    field.onChange(getHoursAndMinute(e));
                                }}
                            />
                        )}
                        key="arrivalTime"
                        name="arrivalTime"
                        control={control}
                    />
                    <Controller
                        render={({ field }) => (
                            <DatePickerCustom
                                className="select"
                                placeholder="Выберите день"
                                onChange={(e: any) => {
                                    field.onChange(getOrderDate(e));
                                }}
                            />
                        )}
                        key="dayOfWeekNumber"
                        name="dayOfWeekNumber"
                        control={control}
                    />
                </div>
            </div>
            <div className="form-footer">
                <Button appearance="primary" type="submit">
                    Добавить
                </Button>
                <Button type="button" onClick={close}>
                    Отменить
                </Button>
            </div>
        </form>
    );
};

export default AddTripsForm;
