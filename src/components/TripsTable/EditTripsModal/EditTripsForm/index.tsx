import { Controller, useForm } from 'react-hook-form';
import { UserContext } from '../../../../services/context/contextProvider';
import { useContext, useState } from 'react';
import { updateTrip } from '../../../../services/api/api';
import { Button, DatePicker } from 'rsuite';
import './index.scss';
import Input from '../../../Input';
import { NotificationTypeEnum } from '../../../../type';

interface EditTripsFormProps {
    close: () => void;
    editData: IFormInput;
}

interface IFormInput {
    tripId: number;
    arrivalTime?: string;
    departureTime?: string;
}

const EditTripsForm = ({ editData, close }: EditTripsFormProps) => {
    const { control, handleSubmit } = useForm<IFormInput>({
        defaultValues: {
            tripId: editData.tripId,
            arrivalTime: editData.arrivalTime,
            departureTime: editData.departureTime,
        },
    });
    const { user, setNotification } = useContext(UserContext);
    const { token } = user;

    const onSubmit = async (data: IFormInput) => {
        try {
            await updateTrip(data, token);
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
                            <Input
                                {...field}
                                label="ID"
                                className="form-input"
                                value={editData.tripId}
                                disabled
                            />
                        )}
                        key="tripId"
                        name="tripId"
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
                                    console.log('e :>> ', e);
                                }}
                            />
                        )}
                        key="arrivalTime"
                        name="arrivalTime"
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

export default EditTripsForm;
