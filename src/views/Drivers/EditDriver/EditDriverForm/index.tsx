import React, { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import './index.scss';
import Input from '../../../../components/Input';
import { UserContext } from '../../../../services/context/contextProvider';
import ModalLoader from '../../../../components/ModalLoader';
import { Drivers } from '../../../../components/DriversTable/types';
import { updateDriver } from '../../../../services/api/api';

interface IFormInput {
    login?: string;
    password?: string;
    phone?: string;
    userId: number;
}

interface CreateOrderFormProps {
    submitRef: any;
    editData: Drivers;
    close: () => void;
    closeEdit?: () => void;
}

const EditDriverForm = ({
    submitRef,
    editData,
    close,
}: CreateOrderFormProps) => {
    const { user } = useContext(UserContext);
    const { token } = user;
    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit } = useForm<IFormInput>({
        defaultValues: {
            login: editData?.login,
            password: editData?.password,
            phone: editData?.phone,
            userId: editData.userId,
        },
    });

    const onSubmit = async (data: IFormInput) => {
        try {
            console.log('submit data :>> ', 
                data
            );
            setIsLoading(true)
            await updateDriver(data, token.accessToken);
            setIsLoading(false)
            close();
        } catch (error) {
            console.error('Error');
        }
    };

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
                                        value={editData.userId}
                                        disabled
                                    />
                                )}
                                key="userId"
                                name="userId"
                                control={control}
                            />
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        label="Логин"
                                        className="form-input"
                                    />
                                )}
                                key="login"
                                name="login"
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
                                    <Input
                                        {...field}
                                        label="Пароль"
                                        className="form-input"
                                    />
                                )}
                                key="password"
                                name="password"
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

export default EditDriverForm;
