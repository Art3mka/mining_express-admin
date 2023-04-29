import React from 'react'
import { TextField, TextFieldProps } from '@mui/material'
import './index.scss'

const Input = (props: TextFieldProps) => {
    return (
        <TextField
            {...props}
            id='outlined-basic'
            variant='outlined'
            className='input'
            size='small'
        />
    )
}

export default Input
