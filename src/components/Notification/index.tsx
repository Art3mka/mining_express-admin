import { useState } from "react";
import {
    Notification,
    useToaster,
    Placeholder,
    Uploader,
    ButtonToolbar,
    SelectPicker,
    Button,
} from "rsuite";
import { MessageType } from "rsuite/esm/Notification/Notification";
import { PlacementType } from "rsuite/esm/toaster/ToastContainer";

interface NotificationProps {
    type?: MessageType;
    placement?: PlacementType;
}

const NotificationComponent = ({ type, placement }: NotificationProps) => {
    const toaster = useToaster();

    return (
        <div>
            <Notification type={type} header={type} closable>
                <Placeholder.Paragraph style={{ width: 320 }} rows={3} />
                <hr />
                <Uploader action='#' />
            </Notification>
            {/* <ButtonToolbar>
                <Button onClick={() => toaster.push(message, { placement })}>
                    Push
                </Button>
            </ButtonToolbar> */}
        </div>
    );
};

export default NotificationComponent;
