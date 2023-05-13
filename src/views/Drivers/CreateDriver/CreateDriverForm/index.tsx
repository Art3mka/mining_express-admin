import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import './index.scss';
import Input from '../../../../components/Input';
import { UserContext } from '../../../../services/context/contextProvider';
import { createDriver } from '../../../../services/api/api';

interface IFormInput {
    userId: number;
    login?: string;
    password?: string;
    phone?: string;
}

interface CreateDriverFormProps {
    submitRef: any;
    close: () => void;
}

const inputData = [
    {
        key: 'login',
        label: 'Login',
    },
    {
        key: 'password',
        label: 'Пароль',
    },
    {
        key: 'phone',
        label: 'Телефон',
    },
];

const CreateDriverForm = ({ submitRef, close }: CreateDriverFormProps) => {
    const { control, handleSubmit } = useForm<IFormInput>();
    const { user } = useContext(UserContext);
    const { token } = user;
    console.log('create driver', token.accessToken);

    const onSubmit = async (data: IFormInput) => {
        try {
            await createDriver(data, token.accessToken);
            close();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="container">
                <div className="container-form">
                    {inputData.map(({ label, key }) => (
                        <Controller
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label={label}
                                    className="form-input"
                                />
                            )}
                            key={key}
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            name={key}
                            control={control}
                            defaultValue=""
                        />
                    ))}
                </div>
            </div>
            <button type="submit" ref={submitRef} />
        </form>
    );
};

export default CreateDriverForm;
