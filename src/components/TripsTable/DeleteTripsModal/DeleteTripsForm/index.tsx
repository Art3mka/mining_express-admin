import { Controller, useForm } from 'react-hook-form';
import { UserContext } from '../../../../services/context/contextProvider';
import { useContext } from 'react';
import { deleteTrip } from '../../../../services/api/api';
import { Button } from 'rsuite';
import Input from '../../../Input';

interface DeleteTripsFormProps {
    close: () => void;
    deleteData: IFormInput
}

interface IFormInput {
    tripId: number;
    label: string;
    tripDate: string;
}

const DeleteTripsForm = ({ deleteData, close }: DeleteTripsFormProps) => {
    const { control, handleSubmit } = useForm<IFormInput>({
        defaultValues: {
            tripId: deleteData.tripId,
            label: deleteData.label,
            tripDate: deleteData.tripDate,
        },
    });
    const { user } = useContext(UserContext);
    const { token } = user;

    console.log('deleteData :>> ', deleteData);

    const onSubmit = async (data: IFormInput) => {
        console.log('tripData :>> ', data);
        try {
            await deleteTrip(data.tripId, token);
            close();
            console.log('success')
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="container">
                <div className="container-form">
                    <Controller
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="ID"
                                className="form-input"
                                value={deleteData.tripId}
                                disabled
                            />
                        )}
                        key="tripId"
                        name="tripId"
                        control={control}
                    />
                    <Controller
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="Маршрут"
                                className="form-input"
                                value={deleteData.label}
                                disabled
                            />
                        )}
                        key="label"
                        name="label"
                        control={control}
                    />
                    <Controller
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="Дата"
                                className="form-input"
                                value={deleteData.tripDate}
                                disabled
                            />
                        )}
                        key="tripDate"
                        name="tripDate"
                        control={control}
                    />
                </div>
            </div>
            <div className="form-footer">
                <Button appearance="primary" type="submit">
                    Удалить
                </Button>
                <Button type="button" onClick={close}>Отменить</Button>
            </div>
        </form>
    );
};

export default DeleteTripsForm;
