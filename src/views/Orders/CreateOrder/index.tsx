import React, { useRef } from 'react'
import ModalComponent from '../../../components/Modal'
import CreateOrderForm from './CreateOrderForm'


interface CreateOrderProps {
    open: boolean
    close: () => void
}

const CreateOrder = ({ open, close }: CreateOrderProps) => {
    const submitRef = useRef()
    return (
        <ModalComponent submitRef={submitRef} open={open} close={close}>
           <CreateOrderForm submitRef={submitRef} close={close}/>
        </ModalComponent>
    )
}

export default CreateOrder
