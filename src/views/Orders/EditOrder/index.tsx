import React, { useRef } from 'react'
import ModalComponent from '../../../components/Modal'
import EditOrderForm from './EditOrderForm'


interface CreateOrderProps {
    open: boolean
    close: () => void
    editData?: any
}

const EditOrder = ({ open, close, editData }: CreateOrderProps) => {
    const submitRef = useRef()
    return (
        <ModalComponent submitRef={submitRef} open={open} close={close}>
           <EditOrderForm submitRef={submitRef} editData={editData}/>
        </ModalComponent>
    )
}

export default EditOrder
