import React from 'react'
import { Modal, Button } from 'rsuite'
import './index.scss'

interface Props {
    open: boolean
    close: () => void
    children: React.ReactNode
    submitRef?: React.MutableRefObject<undefined>
}

const ModalComponent = ({ open, close, children, submitRef }: Props) => {
    return (
        <>
            <Modal
                className='modal'
                keyboard={false}
                open={open}
                onClose={close}
            >
                <Modal.Header>
                    <Modal.Title>Modal Title</Modal.Title>
                </Modal.Header>

                <Modal.Body>{children}</Modal.Body>
                <Modal.Footer>
                    <Button
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        onClick={() => submitRef.current.click()}
                        type='submit'
                        appearance='primary'
                    >
                        Ok
                    </Button>
                    <Button onClick={close} appearance='subtle'>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalComponent
