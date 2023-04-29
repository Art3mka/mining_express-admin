import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import './index.scss'
import Input from '../../../../components/Input'

interface IFormInput {
    busStopName: string
    date: string
    departureTime: string
    phone: string
    routeName: string
    seatsCount: string
}

const inputData = [
    {
        key: 'busStopName',
        label: 'Название остановки',
    },
    {
        key: 'date',
        label: 'Дата',
    },
    {
        key: 'departureTime',
        label: 'Время отправления',
    },
    {
        key: 'phone',
        label: 'Номер телефона',
    },
    {
        key: 'routeName',
        label: 'Маршрут',
    },
    {
        key: 'seatsCount',
        label: 'Кол-во мест',
    },
]

interface CreateOrderFormProps {
    submitRef: any
}

const CreateOrderForm = ({ submitRef }: CreateOrderFormProps) => {
    const { control, handleSubmit } = useForm<IFormInput>()

    const onSubmit = (data: IFormInput) => {
        alert(JSON.stringify(data))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form'>
            <div className='container'>
                <div className='container-form'>
                    {inputData.map(({ label, key }) => (
                        <Controller
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label={label}
                                    className='form-input'
                                />
                            )}
                            key={key}
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            name={key}
                            control={control}
                            defaultValue=''
                        />
                    ))}
                </div>
            </div>
            <button type='submit' ref={submitRef} />
        </form>
    )
}

export default CreateOrderForm
