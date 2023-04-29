import React, { useContext } from 'react'
import { useForm, Controller } from 'react-hook-form'
import './index.scss'
import Input from '../../../../components/Input'
import { UserContext } from '../../../../services/context/contextProvider'
import { createOrder } from '../../../../services/api/api'

interface IFormInput {
    arrivalTimeId: number
    tripId: number
    routeId: number
    departureBusStopId: string
    phone: string
    comment: number
    seatsCount: number
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
    {
        key: 'routeId',
        label: 'RouteId',
    },
]

interface CreateOrderFormProps {
    submitRef: any
}

const CreateOrderForm = ({ submitRef }: CreateOrderFormProps) => {
    const { control, handleSubmit } = useForm<IFormInput>()
    const { user } = useContext(UserContext)
    const {token} = user
    
    const onSubmit = async (data: IFormInput) => {
        console.log('data data', data);
        await createOrder(data, token.accessToken)
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
