import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import './index.scss'
import Input from '../../../../components/Input'

interface IFormInput {
    description: string
    lastName: string
    age: string
    grow: string
    throw: string
}

const inputData = [
    {
        key: 'description',
        label: 'Описание',
    },
    {
        key: 'group',
        label: 'Группа',
    },
    {
        key: 'country',
        label: 'Страна',
    },
    {
        key: 'brand',
        label: 'Бренд',
    },
    {
        key: 'article',
        label: 'Артикул',
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
