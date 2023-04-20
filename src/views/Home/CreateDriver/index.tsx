/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useRef } from 'react'
import CreateDriverForm from './CreateDriverForm'
import ModalComponent from '../../../components/Modal'

interface CreateDriverProps {
    open: boolean
    close: () => void
}

const CreateDriver = ({ open, close }: CreateDriverProps) => {
    const submitRef = useRef()
    return (
        <ModalComponent submitRef={submitRef} open={open} close={close}>
            <CreateDriverForm submitRef={submitRef} />
        </ModalComponent>
    )
}

export default CreateDriver
